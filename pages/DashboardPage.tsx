
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as api from '../services/api';
import * as gemini from '../services/geminiService';
import { AnalysisResult } from '../types';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import ModelPerformanceChart from '../components/ModelPerformanceChart';
import FeatureImportanceChart from '../components/FeatureImportanceChart';
import FertilityMap from '../components/FertilityMap';

const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setAnalysisResult(null); // Reset previous results
    setAiInsights(null);
  };

  const handleAnalyze = async () => {
    if (!file || !token) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.analyzeSoilData(file, token);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetInsights = async () => {
    if (!analysisResult) return;
    setIsInsightLoading(true);
    try {
        const insights = await gemini.getInsights(analysisResult);
        setAiInsights(insights);
    } catch (err) {
        setAiInsights("Failed to generate AI insights.");
    } finally {
        setIsInsightLoading(false);
    }
  }

  const renderCard = (title: string, children: React.ReactNode) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-xl font-bold text-brand-green-800 mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-gray-800">Analysis Dashboard</h1>
        <p className="mt-2 text-gray-600">Upload your dataset to begin mapping and forecasting soil fertility.</p>
      </div>

      {!analysisResult && (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-6">
          <FileUpload onFileSelect={handleFileSelect} />
          {file && (
            <div className="text-center">
              <p className="text-gray-700">Selected file: <span className="font-medium">{file.name}</span></p>
              <Button onClick={handleAnalyze} isLoading={isLoading} className="mt-4 max-w-xs mx-auto">
                {isLoading ? 'Analyzing...' : 'Analyze Now'}
              </Button>
            </div>
          )}
          {error && <p className="text-center text-red-600">{error}</p>}
        </div>
      )}

      {isLoading && <Spinner message="Performing analysis, this may take a moment..." />}

      {analysisResult && (
        <div className="space-y-8">
            <button 
                onClick={() => { setAnalysisResult(null); setFile(null); }}
                className="text-brand-green-600 hover:text-brand-green-800 font-medium"
            >
                &larr; Analyze another file
            </button>
          
          {renderCard("Fertility Map & Distribution", <FertilityMap mapData={analysisResult.fertilityMapData} distributionData={analysisResult.fertilityDistribution}/>)}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {renderCard("ML Model Performance", <ModelPerformanceChart data={analysisResult.modelPerformance} />)}
            {renderCard("Key Feature Importance", <FeatureImportanceChart data={analysisResult.featureImportance} />)}
          </div>

          {renderCard("Gemini AI Insights", (
              <div>
                  {!aiInsights && (
                      <Button onClick={handleGetInsights} isLoading={isInsightLoading} className="max-w-xs">
                          Generate AI Recommendations
                      </Button>
                  )}
                  {isInsightLoading && <Spinner message="Generating insights..."/>}
                  {aiInsights && (
                      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: aiInsights.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  )}
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
