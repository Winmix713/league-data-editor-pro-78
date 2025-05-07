
interface StatsCardProps {
  title: string
  value: string
  description: string
  color?: "blue" | "emerald" | "amber" | "red"
}

export function StatsCard({ title, value, description, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-red-400"
  }

  return (
    <div className="text-center py-6">
      <p className={`text-5xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-sm text-gray-400 mt-3">{description}</p>
    </div>
  )
}
