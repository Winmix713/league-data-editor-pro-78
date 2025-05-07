
// Mock data for pattern analysis
export const patternData = [
  { name: '1-0', frequency: 34 },
  { name: '2-0', frequency: 22 },
  { name: '2-1', frequency: 28 },
  { name: '1-1', frequency: 42 },
  { name: '0-0', frequency: 18 },
  { name: '3-2', frequency: 12 },
  { name: '3-0', frequency: 8 },
];

// Mock data for prediction accuracy
export const predictionData = [
  { name: 'Week 1', actual: 68, predicted: 72 },
  { name: 'Week 2', actual: 72, predicted: 70 },
  { name: 'Week 3', actual: 60, predicted: 64 },
  { name: 'Week 4', actual: 78, predicted: 75 },
  { name: 'Week 5', actual: 82, predicted: 80 },
  { name: 'Week 6', actual: 74, predicted: 72 },
];

// Mock match schedule data
export const scheduleData = [
  { id: '1', date: '2023-11-05', homeTeam: 'Manchester United', awayTeam: 'Arsenal', predictedScore: '2-1' },
  { id: '2', date: '2023-11-06', homeTeam: 'Liverpool', awayTeam: 'Chelsea', predictedScore: '1-1' },
  { id: '3', date: '2023-11-12', homeTeam: 'Manchester City', awayTeam: 'Tottenham', predictedScore: '3-1' },
  { id: '4', date: '2023-11-13', homeTeam: 'Newcastle', awayTeam: 'Everton', predictedScore: '2-0' },
];

// Mock data for pattern visualization
export const extendedPatternData = Array.from({ length: 20 }, (_, i) => ({
  name: `Week ${i + 1}`,
  homeGoals: Math.floor(Math.random() * 3) + 1,
  awayGoals: Math.floor(Math.random() * 2),
  draws: Math.random() > 0.7 ? 1 : 0,
}));

// Mock data for correlations
export const correlationData = Array.from({ length: 20 }, (_, i) => ({
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  z: Math.random() * 500 + 100,
  name: `Metric ${i + 1}`,
}));

// Mock pattern metrics
export const patternMetrics = [
  { name: 'Home Win After Loss', value: '68%', trend: 'up' },
  { name: 'Away Win Following Draw', value: '42%', trend: 'down' },
  { name: 'Goals After 75th Min', value: '1.4/game', trend: 'up' },
  { name: 'Comeback From 0-1', value: '23%', trend: 'same' },
  { name: 'Clean Sheets At Home', value: '31%', trend: 'up' },
  { name: 'Both Teams Score', value: '58%', trend: 'up' },
];
