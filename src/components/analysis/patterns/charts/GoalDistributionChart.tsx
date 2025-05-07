
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GoalDistributionChartProps {
  data: Array<{
    name: string;
    homeGoals: number;
    awayGoals: number;
    draws: number;
  }>;
}

export function GoalDistributionChart({ data }: GoalDistributionChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
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
          <Bar dataKey="homeGoals" name="Home Goals" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="awayGoals" name="Away Goals" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="draws" name="Draws" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
