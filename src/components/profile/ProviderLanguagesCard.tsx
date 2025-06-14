
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

interface ProviderLanguagesCardProps {
  languages?: string[];
}

const ProviderLanguagesCard = ({ languages }: ProviderLanguagesCardProps) => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-base md:text-lg">
          <Globe className="w-4 h-4 text-primary flex-shrink-0" />
          <span>اللغات</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {languages?.map((language, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs md:text-sm">
              {language}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderLanguagesCard;
