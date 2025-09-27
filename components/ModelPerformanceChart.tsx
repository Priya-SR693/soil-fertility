
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ModelPerformanceData } from '../types';

interface ModelPerformanceChartProps {
  data: ModelPerformanceData[];
}

const ModelPerformanceChart: React.FC<ModelPerformanceChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Bar dataKey="R2" fill="#16a34a" name="R²" />
          <Bar dataKey="RMSE" fill="#f97316" />
          <Bar dataKey="MAE" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelPerformanceChart;
