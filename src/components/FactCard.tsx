
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
    <Card className="overflow-hidden border-2 border-kid-blue/30 shadow-md bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-kid-blue/30 to-kid-green/20 pb-2">
        <CardTitle className="text-kid-blue text-lg flex items-center gap-2">
          <span className="text-xl">🌍</span> 
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-transparent to-kid-blue/5 p-2 rounded-lg border border-kid-blue/10">
              <div className="bg-gradient-to-br from-kid-yellow/30 to-kid-green/20 w-8 h-8 rounded-full flex items-center justify-center text-xl shadow-sm">
                {fact.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{fact.label}</p>
                <p className="font-medium">{fact.value || "-"}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Nature decorative elements */}
        <div className="flex justify-end mt-2">
          <span className="text-sm opacity-70">🌱 🌿 🍃</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FactCard;
