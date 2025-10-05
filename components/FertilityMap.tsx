import React, { useState, useEffect } from 'react';
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

const getFertilityBadgeColor = (fertility: 'High' | 'Moderate' | 'Low') => {
    switch (fertility) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
    }
  };

const FertilityMap: React.FC<FertilityMapProps> = ({ mapData, distributionData }) => {
  const [hoveredZone, setHoveredZone] = useState<FertilityZone | null>(null);
  const [selectedZone, setSelectedZone] = useState<FertilityZone | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        setSelectedZone(null);
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-200 rounded-lg p-4 relative aspect-video overflow-hidden shadow-lg border border-gray-300">
          <div className="grid grid-cols-10 grid-rows-10 w-full h-full gap-1">
            {mapData.map(zone => (
              <div
                key={zone.id}
                className={`rounded-sm transition-all duration-200 hover:scale-125 hover:z-10 ${getFertilityColor(zone.fertility)} cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:z-20`}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => setSelectedZone(zone)}
                role="button"
                aria-label={`View details for zone ${zone.id}`}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedZone(zone); }}
              />
            ))}
          </div>
          {hoveredZone && !selectedZone && (
            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-md text-sm pointer-events-none z-30">
              <p className="font-bold">Zone: {hoveredZone.id}</p>
              <p>Fertility: <span className="font-semibold">{hoveredZone.fertility}</span></p>
              <p className="text-xs text-gray-500 mt-1">Click for details</p>
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

      {selectedZone && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity"
            onClick={() => setSelectedZone(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="zone-details-title"
        >
          <div 
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={() => setSelectedZone(null)} 
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-500"
                aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex-shrink-0 ${getFertilityColor(selectedZone.fertility)}`}></div>
                <div>
                    <h3 id="zone-details-title" className="text-xl font-bold text-gray-800">Zone Details</h3>
                    <p className="text-sm text-gray-500">{selectedZone.id}</p>
                </div>
            </div>
            
            <div className="mt-6 space-y-3 text-gray-700">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Coordinates:</span>
                    <span className="font-mono text-right">{selectedZone.lat.toFixed(4)}, {selectedZone.lng.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Predicted Fertility:</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getFertilityBadgeColor(selectedZone.fertility)}`}>
                        {selectedZone.fertility}
                    </span>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FertilityMap;
