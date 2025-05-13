
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Fact {
  icon: string;
  label: string;
  value: string | number;
}

interface FactCardProps {
  title: string;
  facts: Fact[];
}

const FactCard: React.FC<FactCardProps> = ({ title, facts }) => {
  return (
    <Card className="overflow-hidden border-2 border-kid-blue/30">
      <CardHeader className="bg-gradient-to-r from-kid-blue/20 to-kid-green/20 pb-2">
        <CardTitle className="text-kid-blue text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="bg-kid-yellow/20 w-8 h-8 rounded-full flex items-center justify-center text-xl">
                {fact.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{fact.label}</p>
                <p className="font-medium">{fact.value || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FactCard;
