import React from "react";
import { Button } from "../../../components/ui/button";

interface FiltersSectionProps {
  dateRange: string;
  department: string;
  onDateRangeChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onApplyFilters: () => void;
  onExportCSV: () => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  dateRange,
  department,
  onDateRangeChange,
  onDepartmentChange,
  onApplyFilters,
  onExportCSV,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-end mb-8">
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
        {/* Date Range Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        {/* Department Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="loan-applications">Loan Applications</option>
            <option value="account-services">Account Services</option>
            <option value="teller-services">Teller Services</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="flex items-end pt-2 lg:pt-0">
          <Button
            title="Apply Filters"
            onClick={onApplyFilters}
            variant="primary"
            size="sm"
          />
        </div>
      </div>

      {/* Export CSV Button */}
      <Button
        title="Export CSV"
        onClick={onExportCSV}
        variant="outline"
        size="sm"
      />
    </div>
  );
};
