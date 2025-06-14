
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface ProviderAboutSectionProps {
  experienceDescription?: string;
}

const ProviderAboutSection = ({ experienceDescription }: ProviderAboutSectionProps) => {
  if (!experienceDescription) return null;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-base md:text-lg">
          <Award className="w-4 h-4 text-primary flex-shrink-0" />
          <span>نبذة عن المعلم</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {experienceDescription}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProviderAboutSection;
