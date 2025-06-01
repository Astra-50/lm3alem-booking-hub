
import { supabase } from '@/integrations/supabase/client';

// Sample data for Morocco
export const sampleCities = [
  { name: 'الدار البيضاء', name_en: 'Casablanca' },
  { name: 'الرباط', name_en: 'Rabat' },
  { name: 'سلا', name_en: 'Sale' },
  { name: 'فاس', name_en: 'Fes' },
  { name: 'مراكش', name_en: 'Marrakech' },
  { name: 'أكادير', name_en: 'Agadir' },
  { name: 'طنجة', name_en: 'Tangier' },
  { name: 'مكناس', name_en: 'Meknes' }
];

export const sampleServices = [
  { name: 'تنظيف منزلي', name_en: 'House Cleaning', description: 'خدمات تنظيف شاملة للمنازل والشقق' },
  { name: 'سباكة', name_en: 'Plumbing', description: 'إصلاح وصيانة أنظمة السباكة والمياه' },
  { name: 'كهرباء', name_en: 'Electrical', description: 'تركيب وإصلاح الأنظمة الكهربائية' },
  { name: 'دهان', name_en: 'Painting', description: 'دهان وتشطيب الجدران والأسقف' },
  { name: 'نجارة', name_en: 'Carpentry', description: 'صنع وإصلاح الأثاث الخشبي' },
  { name: 'تكييف', name_en: 'Air Conditioning', description: 'تركيب وصيانة أجهزة التكييف' },
  { name: 'حدادة', name_en: 'Blacksmithing', description: 'أعمال الحديد والمعادن' },
  { name: 'زليج', name_en: 'Tile Work', description: 'تركيب وإصلاح البلاط والزليج' }
];

export const sampleNeighborhoods = [
  // Casablanca neighborhoods
  { name: 'المعاريف', city_name: 'الدار البيضاء' },
  { name: 'عين الذئاب', city_name: 'الدار البيضاء' },
  { name: 'الحي الحسني', city_name: 'الدار البيضاء' },
  { name: 'سيدي البرنوصي', city_name: 'الدار البيضاء' },
  // Rabat neighborhoods
  { name: 'أكدال', city_name: 'الرباط' },
  { name: 'الرياض', city_name: 'الرباط' },
  { name: 'حسان', city_name: 'الرباط' },
  { name: 'المحيط', city_name: 'الرباط' },
  // Sale neighborhoods
  { name: 'تابريكت', city_name: 'سلا' },
  { name: 'حي السلام', city_name: 'سلا' },
  { name: 'لعيايدة', city_name: 'سلا' },
  { name: 'باب بوحاجة', city_name: 'سلا' }
];

export const sampleProviders = [
  {
    name: 'أحمد بن علي',
    phone: '+212661234567',
    whatsapp: '+212661234567',
    experience_description: 'معلم سباكة محترف مع 15 سنة خبرة في إصلاح وتركيب جميع أنواع الأنابيب والأجهزة الصحية',
    languages: ['العربية', 'الفرنسية'],
    service_type: 'سباكة',
    city: 'الدار البيضاء',
    neighborhood: 'المعاريف',
    is_verified: true
  },
  {
    name: 'فاطمة الزهراء',
    phone: '+212662345678',
    whatsapp: '+212662345678',
    experience_description: 'متخصصة في التنظيف المنزلي الشامل مع اهتمام خاص بالنظافة والتطهير',
    languages: ['العربية'],
    service_type: 'تنظيف منزلي',
    city: 'الرباط',
    neighborhood: 'أكدال',
    is_verified: true
  },
  {
    name: 'محمد الإدريسي',
    phone: '+212663456789',
    whatsapp: '+212663456789',
    experience_description: 'كهربائي معتمد مع خبرة 10 سنوات في التركيبات الكهربائية والصيانة',
    languages: ['العربية', 'الفرنسية', 'الإنجليزية'],
    service_type: 'كهرباء',
    city: 'سلا',
    neighborhood: 'تابريكت',
    is_verified: true
  },
  {
    name: 'يوسف الحسني',
    phone: '+212664567890',
    whatsapp: '+212664567890',
    experience_description: 'معلم دهان مع 12 سنة خبرة في دهان الواجهات والديكور الداخلي',
    languages: ['العربية'],
    service_type: 'دهان',
    city: 'الدار البيضاء',
    neighborhood: 'عين الذئاب',
    is_verified: false
  },
  {
    name: 'عبد الرحمن القاسمي',
    phone: '+212665678901',
    whatsapp: '+212665678901',
    experience_description: 'نجار ماهر متخصص في صنع وإصلاح الأثاث التقليدي والعصري',
    languages: ['العربية', 'الأمازيغية'],
    service_type: 'نجارة',
    city: 'الرباط',
    neighborhood: 'الرياض',
    is_verified: true
  },
  {
    name: 'خديجة المرابطي',
    phone: '+212666789012',
    whatsapp: '+212666789012',
    experience_description: 'متخصصة في تنظيف المنازل والمكاتب مع خدمات إضافية للتنظيف العميق',
    languages: ['العربية'],
    service_type: 'تنظيف منزلي',
    city: 'سلا',
    neighborhood: 'حي السلام',
    is_verified: true
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // First, check if data already exists
    const { data: existingCities } = await supabase.from('cities').select('*').limit(1);
    if (existingCities && existingCities.length > 0) {
      console.log('Database already has data, skipping seed...');
      return;
    }

    // Seed cities
    console.log('Seeding cities...');
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .insert(sampleCities)
      .select();
    
    if (citiesError) throw citiesError;
    console.log('Cities seeded successfully:', cities?.length);

    // Seed service types
    console.log('Seeding service types...');
    const { data: services, error: servicesError } = await supabase
      .from('service_types')
      .insert(sampleServices)
      .select();
    
    if (servicesError) throw servicesError;
    console.log('Service types seeded successfully:', services?.length);

    // Seed neighborhoods
    console.log('Seeding neighborhoods...');
    const neighborhoodsWithCityIds = sampleNeighborhoods.map(neighborhood => {
      const city = cities?.find(c => c.name === neighborhood.city_name);
      return {
        name: neighborhood.name,
        city_id: city?.id
      };
    }).filter(n => n.city_id);

    const { data: neighborhoods, error: neighborhoodsError } = await supabase
      .from('neighborhoods')
      .insert(neighborhoodsWithCityIds)
      .select();
    
    if (neighborhoodsError) throw neighborhoodsError;
    console.log('Neighborhoods seeded successfully:', neighborhoods?.length);

    // Seed service providers
    console.log('Seeding service providers...');
    const providersWithIds = sampleProviders.map(provider => {
      const city = cities?.find(c => c.name === provider.city);
      const service = services?.find(s => s.name === provider.service_type);
      const neighborhood = neighborhoods?.find(n => n.name === provider.neighborhood);
      
      return {
        name: provider.name,
        phone: provider.phone,
        whatsapp: provider.whatsapp,
        experience_description: provider.experience_description,
        languages: provider.languages,
        city_id: city?.id,
        service_type_id: service?.id,
        neighborhood_id: neighborhood?.id,
        is_verified: provider.is_verified,
        is_active: true
      };
    }).filter(p => p.city_id && p.service_type_id);

    const { data: providers, error: providersError } = await supabase
      .from('service_providers')
      .insert(providersWithIds)
      .select();
    
    if (providersError) throw providersError;
    console.log('Service providers seeded successfully:', providers?.length);

    console.log('Database seeding completed successfully!');
    return { cities, services, neighborhoods, providers };
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
