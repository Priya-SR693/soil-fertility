import React, { useState } from 'react';
import { FertilityZone } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FertilityMapProps {
  mapData: FertilityZone[];
  distributionData: { name: string, value: number, color: string }[];
}

const getFertilityColor = (fertility: 'High' | 'Moderate' | 'Low') => {
  switch (fertility) {
    case 'High': return 'bg-green-600';
    case 'Moderate': return 'bg-yellow-400';
    case 'Low': return 'bg-red-500';
  }
};

const FertilityMap: React.FC<FertilityMapProps> = ({ mapData, distributionData }) => {
  const [hoveredZone, setHoveredZone] = useState<FertilityZone | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-gray-200 rounded-lg p-4 relative aspect-video overflow-hidden shadow-lg border border-gray-300">
        <div className="grid grid-cols-10 grid-rows-10 w-full h-full gap-1">
          {mapData.map(zone => (
            <div
              key={zone.id}
              className={`rounded-sm transition-transform duration-200 hover:scale-125 hover:z-10 ${getFertilityColor(zone.fertility)}`}
              onMouseEnter={() => setHoveredZone(zone)}
              onMouseLeave={() => setHoveredZone(null)}
            />
          ))}
        </div>
        {hoveredZone && (
          <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-md text-sm pointer-events-none">
            <p className="font-bold">Zone: {hoveredZone.id}</p>
            <p>Fertility: <span className="font-semibold">{hoveredZone.fertility}</span></p>
          </div>
        )}
      </div>
      <div className="w-full h-80">
        <h3 className="text-lg font-semibold text-center mb-2">Fertility Distribution</h3>
        <ResponsiveContainer>
           <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              // FIX: Add 'any' type to the label renderer props to resolve TypeScript errors with arithmetic operations.
              // The types for props like 'cx', 'cy', 'midAngle', and 'percent' were not being inferred correctly as numbers.
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FertilityMap;