type QueueEntry = {
  ticket: string;
  customerName: string;
  waitTime: number;
  joinedAt: string;
  status: "Waiting" | "Called" | "No Show";
};

const QUEUE_TABLE_COLUMNS = [
  {
    name: "TICKET",
    selector: (row: QueueEntry) => row.ticket,
    cell: (row: QueueEntry) => (
      <span className="font-mono text-sm font-bold text-blue-700">
        {row.ticket}
      </span>
    ),
  },
  {
    name: "CUSTOMER NAME",
    selector: (row: QueueEntry) => row.customerName,
    cell: (row: QueueEntry) => (
      <span className="text-sm font-semibold text-slate-900">
        {row.customerName}
      </span>
    ),
  },
  {
    name: "WAIT TIME",
    selector: (row: QueueEntry) => row.waitTime,
    cell: (row: QueueEntry) => (
      <span className="text-sm text-slate-600">{row.waitTime} mins</span>
    ),
  },
  {
    name: "JOINED AT",
    selector: (row: QueueEntry) => row.joinedAt,
    cell: (row: QueueEntry) => (
      <span className="text-sm text-slate-600">{row.joinedAt}</span>
    ),
  },
  {
    name: "STATUS",
    selector: (row: QueueEntry) => row.status,
    cell: (row: QueueEntry) => {
      let statusColor = "bg-gray-200 text-gray-800";
      if (row.status === "Waiting")
        statusColor = "bg-yellow-100 text-yellow-800";
      else if (row.status === "Called")
        statusColor = "bg-blue-100 text-blue-800";
      else if (row.status === "No Show")
        statusColor = "bg-red-100 text-red-800";

      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
        >
          {row.status}
        </span>
      );
    },
  },
];

const QUEUE_TABLE_DATA: QueueEntry[] = [
  {
    ticket: "A001",
    customerName: "John Doe",
    waitTime: 5,
    joinedAt: "10:00 AM",
    status: "Waiting",
  },
  {
    ticket: "A002",
    customerName: "Jane Smith",
    waitTime: 10,
    joinedAt: "9:55 AM",
    status: "Called",
  },
  {
    ticket: "A003",
    customerName: "Bob Johnson",
    waitTime: 15,
    joinedAt: "9:50 AM",
    status: "No Show",
  },
  {
    ticket: "A004",
    customerName: "Alice Williams",
    waitTime: 3,
    joinedAt: "10:02 AM",
    status: "Waiting",
  },
  {
    ticket: "A005",
    customerName: "Charlie Brown",
    waitTime: 8,
    joinedAt: "9:52 AM",
    status: "Called",
  },
  {
    ticket: "A006",
    customerName: "Emily Davis",
    waitTime: 12,
    joinedAt: "9:48 AM",
    status: "No Show",
  },
  {
    ticket: "A007",
    customerName: "David Wilson",
    waitTime: 2,
    joinedAt: "10:03 AM",
    status: "Waiting",
  },
  {
    ticket: "A008",
    customerName: "Sarah Miller",
    waitTime: 7,
    joinedAt: "9:53 AM",
    status: "Called",
  },
  {
    ticket: "A009",
    customerName: "Michael Anderson",
    waitTime: 20,
    joinedAt: "9:45 AM",
    status: "No Show",
  },
];

export { QUEUE_TABLE_COLUMNS, QUEUE_TABLE_DATA, type QueueEntry };
