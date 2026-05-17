import React from "react";
import SummaryCard from "../../../components/ui/summary-cards";

export interface DepartmentMetric {
  title: string;
  value: string | number;
  subtitle?: string;
}

interface DepartmentMetricsProps {
  metrics: DepartmentMetric[];
}

export const DepartmentMetrics: React.FC<DepartmentMetricsProps> = ({
  metrics,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <SummaryCard
          key={index}
          title={metric.title}
          value={metric.value}
          rate={metric.subtitle}
        />
      ))}
    </div>
  );
};
