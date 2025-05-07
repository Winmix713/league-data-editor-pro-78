
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title?: string
  value: string
  description: string
  color?: "blue" | "emerald" | "amber" | "red" | "purple"
  icon?: React.ReactNode
}

export function StatsCard({ title, value, description, color = "blue", icon }: StatsCardProps) {
  const colorClasses = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-red-400",
    purple: "text-purple-400"
  }

  const bgColorClasses = {
    blue: "bg-blue-500/10",
    emerald: "bg-emerald-500/10",
    amber: "bg-amber-500/10",
    red: "bg-red-500/10",
    purple: "bg-purple-500/10"
  }

  const borderColorClasses = {
    blue: "border-blue-500/20",
    emerald: "border-emerald-500/20",
    amber: "border-amber-500/20",
    red: "border-red-500/20",
    purple: "border-purple-500/20"
  }

  return (
    <div className={cn(
      "text-center py-6 px-4 rounded-lg border",
      bgColorClasses[color],
      borderColorClasses[color]
    )}>
      {title && <p className="text-sm text-gray-400 mb-2">{title}</p>}
      <div className="flex items-center justify-center">
        {icon && <div className="mr-3">{icon}</div>}
        <p className={cn("text-5xl font-bold", colorClasses[color])}>{value}</p>
      </div>
      <p className="text-sm text-gray-400 mt-3">{description}</p>
    </div>
  )
}
