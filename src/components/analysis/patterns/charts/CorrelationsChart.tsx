
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CorrelationsChartProps {
  data: Array<{
    x: number;
    y: number;
    z: number;
    name: string;
  }>;
}

export function CorrelationsChart({ data }: CorrelationsChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" dataKey="x" name="Factor 1" stroke="#888" />
          <YAxis type="number" dataKey="y" name="Factor 2" stroke="#888" />
          <ZAxis type="number" dataKey="z" range={[100, 600]} name="Correlation" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name, props) => [value, name]}
          />
          <Scatter name="Statistical Correlations" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
