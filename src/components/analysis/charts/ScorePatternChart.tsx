
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, TooltipProps } from 'recharts'
import { useState } from 'react'

interface ScorePatternChartProps {
  data: Array<{
    name: string;
    frequency: number;
    color?: string;
  }>;
  title?: string;
  description?: string;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-black/90 p-3 rounded border border-white/10 shadow-lg text-white">
        <p className="text-sm font-medium">{`Score: ${label}`}</p>
        <p className="text-xs text-blue-400">{`Frequency: ${payload[0].value}`}</p>
        <p className="text-xs text-gray-400 mt-1">
          {payload[0].value > 5 ? 'Common result' : 'Less frequent result'}
        </p>
      </div>
    );
  }

  return null;
};

export function ScorePatternChart({ data, title, description }: ScorePatternChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (_, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const getBarColor = (entry: any, index: number) => {
    if (entry.color) return entry.color;
    
    if (activeIndex === index) {
      return '#3b82f6'; // Bright blue when hovered
    }
    
    // Different opacity based on frequency
    const opacity = 0.3 + (entry.frequency / Math.max(...data.map(d => d.frequency)) * 0.7);
    return `rgba(59, 130, 246, ${opacity})`;
  };

  return (
    <div className="h-full flex flex-col">
      {(title || description) && (
        <div className="mb-4">
          {title && <h4 className="text-base font-medium text-white">{title}</h4>}
          {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </div>
      )}
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="name" 
              stroke="#888" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#444' }}
            />
            <YAxis 
              stroke="#888" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#444' }}
              axisLine={{ stroke: '#444' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="frequency" 
              radius={[4, 4, 0, 0]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry, index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
