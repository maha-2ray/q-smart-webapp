import { PageLayout } from "../../components/layouts/page-layout";
import React, { useState } from "react";
import QueueControl from "./components/queue-control";
import CurrentlyServing from "./components/currently-serving";
import {
  QUEUE_TABLE_COLUMNS,
  QUEUE_TABLE_DATA,
} from "./components/queue-table";
// import type { QueueEntry } from './components/queue-table'
import Table from "../../components/ui/table";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { WalkInEntryModal } from "./components/walk-in-entry";
import type { DepartmentOption } from "./components/walk-in-entry";

const mockDepartments: DepartmentOption[] = [
  {
    id: "1",
    prefix: "A",
    name: "Account Services",
    targetTime: "15 min",
    peopleWaiting: 8,
  },
  {
    id: "2",
    prefix: "B",
    name: "Loan Applications",
    targetTime: "22 min",
    peopleWaiting: 12,
  },
  {
    id: "3",
    prefix: "C",
    name: "Teller Services",
    targetTime: "9 min",
    peopleWaiting: 5,
  },
];

const QueueOperations: React.FC = () => {
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  return (
    <>
      <PageLayout
        title="Queue Operations"
        subtitle="Manage and monitor all queue operations"
      >
        <div className="grid grid-cols-[1fr_3fr] gap-6">
          <div className="grid grid-rows-[2fr_3fr] gap-6">
            <QueueControl
              departmentName="B"
              numberWaiting={23}
              avgWaitTime={12}
            />
            <CurrentlyServing
              ticketNumber="T-123"
              ticketHolder="John Doe"
              holderPhoneNumber="+1234567890"
            />
          </div>
          <div className="bg-white border-gray-200 border-2 rounded-lg p-2">
            <div className="p-4">
              <span className="flex items-center justify-between">
                <p>Upcoming Queue</p>
                <Button
                  variant="outline"
                  size="md"
                  iconLeft={<LuPlus />}
                  title="Walk-in Entry"
                  onClick={() => setIsWalkInModalOpen(true)}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <Table columns={QUEUE_TABLE_COLUMNS} data={QUEUE_TABLE_DATA} />
          </div>
        </div>
      </PageLayout>

      {/* Walk-in Entry Modal */}
      <WalkInEntryModal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
        departments={mockDepartments}
      />
    </>
  );
};

export default QueueOperations;
