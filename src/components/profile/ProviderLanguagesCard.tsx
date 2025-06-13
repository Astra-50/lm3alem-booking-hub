
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
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg md:text-xl">
          <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span>اللغات</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {languages?.map((language, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-sm">
              {language}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderLanguagesCard;
