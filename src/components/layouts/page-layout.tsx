import React, { type ReactNode } from "react";
import { PageHeader } from "../ui/page-header";

export interface PageLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

/**
 * Standardized page layout component for consistent page structure
 * Provides consistent spacing, header, and content area
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
}) => {
  return (
    <div
      className={`py-5 md:px-20 lg:px-20 px-4  flex flex-col gap-5 ${className}`}
    >
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={actions}
        className={headerClassName}
      />
      <div
        className={`flex-1 ${contentClassName} overflow-y-auto max-h-[80vh] `}
      >
        {children}
      </div>
    </div>
  );
};
