import React from "react";

interface SMSPreviewProps {
  ticketNumber: string;
  departmentName: string;
  estimatedWait: string;
}

export const SMSPreview: React.FC<SMSPreviewProps> = ({
  ticketNumber,
  departmentName,
  estimatedWait,
}) => {
  const smsMessage = `You are checked in for ${departmentName}. Ticket ${ticketNumber}. Current wait is about ${estimatedWait} minutes. We will text you when your turn is approaching.`;

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
        SMS confirmation preview
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">{smsMessage}</p>
    </div>
  );
};
