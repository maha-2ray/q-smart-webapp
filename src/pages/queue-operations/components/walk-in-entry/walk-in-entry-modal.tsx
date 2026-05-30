import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { DepartmentSelect } from "./department-select";
import { NotificationPreference } from "./notification-preference";
import { QueueSummary } from "./queue-summary";
import { WalkInEntryInfo } from "./walk-in-entry-info";
import { SMSPreview } from "./sms-preview";
import type { DepartmentOption } from "./department-select";

interface WalkInEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: DepartmentOption[];
  onCreateTicket?: (data: {
    customerName: string;
    mobileNumber: string;
    unitId: string;
    notification: "browser" | "sms" | "both";
  }) => void;
  isCreating?: boolean;
}

export const WalkInEntryModal: React.FC<WalkInEntryModalProps> = ({
  isOpen,
  onClose,
  departments,
  onCreateTicket,
  isCreating = false,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState(
    departments[1]?.id || "",
  );
  const [notification, setNotification] = useState<"browser" | "sms" | "both">(
    "sms",
  );

  const selectedDept = departments.find((d) => d.id === selectedDeptId);
  const ticketNumber = selectedDept ? `${selectedDept.prefix}048` : "---";

  const handleCreateTicket = () => {
    if (!selectedDept || !customerName) return;

    onCreateTicket?.({
      customerName,
      mobileNumber,
      unitId: selectedDept.id,
      notification,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bg-black/50 inset-0 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-50 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              New Walk-in Ticket
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Collect the customer details, choose a department, and confirm
              notification preferences.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-6">
            {/* Left Sidebar */}
            <div>
              <WalkInEntryInfo waitingNow={12} averageWait="14m" />
            </div>

            {/* Main Form */}
            <div className="space-y-6">
              {/* Customer Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Customer Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Michael Chang"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+1 (555) 987-6543"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Department Selection */}
              <DepartmentSelect
                departments={departments}
                selectedId={selectedDeptId}
                onSelect={setSelectedDeptId}
              />

              {/* Notification Preference */}
              <NotificationPreference
                selected={notification}
                onSelect={setNotification}
              />

              {/* SMS Preview */}
              {selectedDept && (
                <SMSPreview
                  ticketNumber={ticketNumber}
                  departmentName={selectedDept.name}
                  estimatedWait={selectedDept.targetTime}
                />
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  title={isCreating ? "Creating..." : "Create Walk-in Ticket"}
                  onClick={handleCreateTicket}
                  variant="primary"
                  size="md"
                  className="flex-1"
                  disabled={isCreating || !customerName || !selectedDeptId}
                />
                <Button
                  title={isCreating ? "Creating..." : "Create and Print Slip"}
                  onClick={handleCreateTicket}
                  variant="outline"
                  size="md"
                  className="flex-1"
                  disabled={isCreating || !customerName || !selectedDeptId}
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div>
              {selectedDept && (
                <QueueSummary
                  data={{
                    department: selectedDept.name,
                    peopleAhead: selectedDept.peopleWaiting,
                    estimatedWait: selectedDept.targetTime,
                    notification: notification.toUpperCase(),
                    ticketNumber,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
