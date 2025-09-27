
import { User, AnalysisResult } from '../types';

// --- MOCK DATABASE ---
const mockUsers: User[] = [
  { id: '1', name: 'Demo User', email: 'user@example.com' },
];

// --- API SIMULATION ---

const simulateNetworkDelay = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay));

export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  await simulateNetworkDelay();
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password') { // Simple password check for demo
    const token = `mock_token_for_${user.id}`;
    return { user, token };
  }
  throw new Error('Invalid email or password');
};

export const register = async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
  await simulateNetworkDelay();
  if (mockUsers.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }
  const newUser: User = { id: String(mockUsers.length + 1), name, email };
  mockUsers.push(newUser);
  const token = `mock_token_for_${newUser.id}`;
  return { user: newUser, token };
};

export const getMe = async (token: string): Promise<User> => {
  await simulateNetworkDelay(500);
  const userId = token.replace('mock_token_for_', '');
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    return user;
  }
  throw new Error('Invalid token');
};

export const analyzeSoilData = async (file: File, token: string): Promise<AnalysisResult> => {
  await simulateNetworkDelay(3000);
  if (!token) {
    throw new Error('Authentication required');
  }
  console.log(`Analyzing file: ${file.name} for token: ${token}`);

  // Mock data based on the provided research paper
  return {
    modelPerformance: [
      { name: 'Random Forest', R2: 0.89, RMSE: 0.14, MAE: 0.10 },
      { name: 'XGBoost', R2: 0.86, RMSE: 0.17, MAE: 0.12 },
      { name: 'DNN', R2: 0.84, RMSE: 0.19, MAE: 0.14 },
    ],
    featureImportance: [
      { name: 'Organic Carbon', importance: 0.30 },
      { name: 'NDVI', importance: 0.20 },
      { name: 'Rainfall', importance: 0.18 },
      { name: 'SAVI', importance: 0.12 },
      { name: 'Soil pH', importance: 0.08 },
      { name: 'Nitrogen', importance: 0.07 },
      { name: 'Temperature', importance: 0.05 },
    ].sort((a,b) => b.importance - a.importance),
    fertilityMapData: Array.from({ length: 100 }).map((_, i) => {
        const fertilityChance = Math.random();
        let fertility: 'High' | 'Moderate' | 'Low';
        if(fertilityChance > 0.6) fertility = 'High';
        else if (fertilityChance > 0.25) fertility = 'Moderate';
        else fertility = 'Low';

        return {
            id: `zone-${i}`,
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.0060 + (Math.random() - 0.5) * 0.1,
            fertility,
        }
    }),
    fertilityDistribution: [
        { name: 'High Fertility', value: 45, color: '#16a34a' },
        { name: 'Moderate Fertility', value: 35, color: '#facc15' },
        { name: 'Low Fertility', value: 20, color: '#ef4444' },
    ]
  };
};
