import React from "react";

import { cn } from "../../libs/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="text-sm md:text-2xl lg:text-2xl font-bold text-primary">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-xs text-secondary">{subtitle}</p>}
      </div>

      {actions && (
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">{actions}</div>
      )}
    </div>
  );
};
