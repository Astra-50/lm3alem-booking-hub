
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
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
          <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span>نبذة عن المعلم</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          {experienceDescription}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProviderAboutSection;
