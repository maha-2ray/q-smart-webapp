import React from "react";
import SummaryCard from "../../../components/ui/summary-cards";

export interface MetricCard {
  title: string;
  value: string | number;
  rate: string;
  trend?: "up" | "down" | "neutral";
}

interface MetricsCardsProps {
  data: MetricCard[];
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((metric, index) => (
        <SummaryCard
          key={index}
          title={metric.title}
          value={metric.value}
          rate={metric.rate}
          trend={metric.trend}
        />
      ))}
    </div>
  );
};
