
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { FeatureImportanceData } from '../types';

interface FeatureImportanceChartProps {
  data: FeatureImportanceData[];
}

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 50, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip 
             contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
            }}
           />
          <Bar dataKey="importance" fill="#15803d" name="Importance">
            <LabelList dataKey="importance" position="right" formatter={(value: number) => value.toFixed(2)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
