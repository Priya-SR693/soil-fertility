
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      </div>
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-green-900 tracking-tight leading-tight">
        Mapping and Forecasting Soil Fertility
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Leverage state-of-the-art Machine Learning to transform multi-source geospatial data into actionable insights for sustainable and precision agriculture.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/dashboard"
          className="bg-brand-green-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </Link>
        <Link
          to="/about"
          className="bg-white text-brand-green-700 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 border border-gray-300"
        >
          Learn More
        </Link>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-semibold text-xl text-brand-green-800">Data-Driven Decisions</h3>
          <p className="mt-2 text-gray-600">
            Integrate remote sensing data, soil properties, and climate variables to build a comprehensive fertility profile.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-semibold text-xl text-brand-green-800">Powerful ML Models</h3>
          <p className="mt-2 text-gray-600">
            Utilize algorithms like Random Forest and XGBoost for highly accurate soil organic matter prediction.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-semibold text-xl text-brand-green-800">Interactive Visualizations</h3>
          <p className="mt-2 text-gray-600">
            View high-resolution fertility maps and clear charts to easily interpret results and plan interventions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
