
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScoringTrendsChartProps {
  data: Array<{
    name: string;
    homeGoals: number;
    awayGoals: number;
  }>;
}

export function ScoringTrendsChart({ data }: ScoringTrendsChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="homeGoals" 
            name="Home Goals" 
            stroke="#3b82f6" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="awayGoals" 
            name="Away Goals" 
            stroke="#ef4444" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
