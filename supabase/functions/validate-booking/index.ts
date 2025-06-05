
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
    
    // Simple rate limiting (5 requests per minute per IP)
    const rateLimitKey = `booking_${clientIP}`
    const { data: rateLimitData } = await supabaseClient
      .from('admin_audit_logs')
      .select('created_at')
      .eq('admin_user_id', rateLimitKey)
      .gte('created_at', new Date(Date.now() - 60000).toISOString())
    
    if (rateLimitData && rateLimitData.length >= 5) {
      return new Response(
        JSON.stringify({ error: 'معدل الطلبات مرتفع جداً. حاول مرة أخرى لاحقاً' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { full_name, phone, whatsapp, requested_date, requested_time, description, service_provider_id } = await req.json()

    // Input validation and sanitization
    const errors: string[] = []

    // Validate and sanitize full_name
    if (!full_name || full_name.length < 2 || full_name.length > 100) {
      errors.push('الاسم يجب أن يكون بين 2 و 100 حرف')
    }
    
    const sanitizedName = full_name.replace(/<[^>]*>/g, '').trim()
    if (!/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']+$/.test(sanitizedName)) {
      errors.push('الاسم يجب أن يحتوي على أحرف عربية فقط')
    }

    // Validate phone number
    const sanitizedPhone = phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
    if (!/^(\+212|0)[5-7]\d{8}$/.test(sanitizedPhone)) {
      errors.push('رقم الهاتف المغربي غير صحيح')
    }

    // Validate whatsapp if provided
    if (whatsapp) {
      const sanitizedWhatsapp = whatsapp.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
      if (!/^(\+212|0)[5-7]\d{8}$/.test(sanitizedWhatsapp)) {
        errors.push('رقم الواتساب غير صحيح')
      }
    }

    // Validate date
    const selectedDate = new Date(requested_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      errors.push('لا يمكن حجز موعد في الماضي')
    }

    // Validate time format
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(requested_time)) {
      errors.push('صيغة الوقت غير صحيحة')
    }

    // Validate description length
    if (description && description.length > 500) {
      errors.push('الوصف طويل جداً')
    }

    // Validate service provider exists
    const { data: provider } = await supabaseClient
      .from('service_providers')
      .select('id')
      .eq('id', service_provider_id)
      .eq('is_active', true)
      .single()

    if (!provider) {
      errors.push('مقدم الخدمة غير موجود أو غير متاح')
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ errors }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Log the validation attempt for rate limiting
    await supabaseClient
      .from('admin_audit_logs')
      .insert({
        action: 'BOOKING_VALIDATION',
        table_name: 'booking_requests',
        admin_user_id: rateLimitKey,
        new_values: { client_ip: clientIP }
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        sanitized_data: {
          full_name: sanitizedName,
          phone: sanitizedPhone,
          whatsapp: whatsapp ? whatsapp.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '') : null,
          requested_date,
          requested_time,
          description: description ? description.replace(/<[^>]*>/g, '').trim().substring(0, 500) : null,
          service_provider_id
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Validation error:', error)
    return new Response(
      JSON.stringify({ error: 'خطأ في التحقق من البيانات' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
