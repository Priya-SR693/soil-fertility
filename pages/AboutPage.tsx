
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl font-bold text-brand-green-900 mb-4">About the Project</h1>
      <p className="text-lg text-gray-600 mb-6">
        This project demonstrates a machine learning-based framework for mapping and predicting soil fertility by estimating Soil Organic Matter (SOM), a critical factor in agricultural productivity and food security.
      </p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-brand-green-800 border-b-2 border-brand-green-200 pb-2 mb-3">The Challenge</h2>
          <p>
            Traditional soil fertility assessments are often labor-intensive, costly, and provide limited spatial coverage. This makes it difficult for farmers to make precise, site-specific management decisions. Our goal is to overcome these limitations using modern data science techniques.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-brand-green-800 border-b-2 border-brand-green-200 pb-2 mb-3">Our Approach</h2>
          <p>
            We developed a robust workflow that integrates multi-source datasets, including:
          </p>
          <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
            <li><strong>Remote Sensing Indices:</strong> NDVI, SAVI, and NIR reflectance from satellite imagery.</li>
            <li><strong>Soil Physicochemical Properties:</strong> Lab-analyzed data like organic carbon, pH, and nitrogen.</li>
            <li><strong>Climatic Variables:</strong> Data such as rainfall, temperature, and humidity.</li>
          </ul>
          <p className="mt-3">
            This combined dataset is then fed into state-of-the-art machine learning models—specifically Random Forest (RF), Extreme Gradient Boosting (XGBoost), and Deep Neural Networks (DNN)—to learn the complex, non-linear relationships between these variables and soil fertility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-brand-green-800 border-b-2 border-brand-green-200 pb-2 mb-3">Key Findings</h2>
          <p>
            Our analysis showed that the Random Forest model performed best, achieving a high predictive accuracy (R² = 0.89). Feature importance analysis revealed that soil organic carbon, vegetation indices, and rainfall were the most influential predictors of soil fertility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-brand-green-800 border-b-2 border-brand-green-200 pb-2 mb-3">Impact and Application</h2>
          <p>
            The final output of this framework is a high-resolution fertility map that classifies agricultural land into high, medium, and low fertility zones. These maps serve as a powerful decision-support tool for:
          </p>
          <ul className="list-disc list-inside mt-2 pl-4 space-y-1">
            <li><strong>Precision Agriculture:</strong> Applying fertilizers and resources exactly where they are needed.</li>
            <li><strong>Sustainable Practices:</strong> Avoiding over-fertilization and reducing environmental impact.</li>
            <li><strong>Enhanced Yield:</strong> Optimizing land use to improve crop yields and ensure food security.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
