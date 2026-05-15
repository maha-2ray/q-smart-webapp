import React from "react";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { cn } from "../../libs/utils";

type SummaryCardProps = {
  title: string;
  value?: string | number;
  rate?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  rate,
  trend = "neutral",
  icon,
  className,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const getTrendIcon = () => {
    if (!rate) return null;
    if (trend === "up") return <LuTrendingUp className="w-4 h-4" />;
    if (trend === "down") return <LuTrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-xl p-6",
        "bg-white",
        "border border-slate-200",
        "hover:shadow-md hover:border-slate-300",
        "transition-all duration-200",
        "group cursor-default",
        className,
      )}
    >
      {/* Background Gradient Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-100 to-transparent rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

      {/* Header: Title and Icon */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
          {title}
        </p>
        {icon && <div className="text-blue-500">{icon}</div>}
      </div>

      {/* Value Section */}
      <div className="space-y-2 relative z-10">
        <div className="text-3xl lg:text-4xl font-bold text-slate-900">
          {value}
        </div>

        {/* Rate/Trend Section */}
        {rate && (
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-semibold",
              getTrendColor(),
            )}
          >
            {getTrendIcon()}
            <span>{rate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
