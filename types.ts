
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ModelPerformanceData {
  name: string;
  R2: number;
  RMSE: number;
  MAE: number;
}

export interface FeatureImportanceData {
  name: string;
  importance: number;
}

export interface FertilityZone {
  id: string;
  lat: number;
  lng: number;
  fertility: 'High' | 'Moderate' | 'Low';
}

export interface AnalysisResult {
  modelPerformance: ModelPerformanceData[];
  featureImportance: FeatureImportanceData[];
  fertilityMapData: FertilityZone[];
  fertilityDistribution: { name: string; value: number; color: string }[];
}
