import React from "react";

interface RuleCheckProps {
  title: string;
  description: string;
}

interface RuleChecksProps {
  onRunValidation?: () => void;
}

export const RuleChecks: React.FC<RuleChecksProps> = ({ onRunValidation }) => {
  const checks: RuleCheckProps[] = [
    {
      title: "Prefix Uniqueness",
      description: "All current department prefixes are unique.",
    },
    {
      title: "Archive Warning",
      description:
        "Loan Applications currently has live tickets and cannot be archived without review.",
    },
    {
      title: "Coverage Check",
      description:
        "Every active department has at least one staff assignment today.",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Rule Checks</h3>
          <p className="text-sm text-gray-600 mt-1">
            Review queue impacts before making structural changes.
          </p>
        </div>
        <button
          onClick={onRunValidation}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Run Validation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {checks.map((check, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-2">{check.title}</h4>
            <p className="text-sm text-gray-600">{check.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
