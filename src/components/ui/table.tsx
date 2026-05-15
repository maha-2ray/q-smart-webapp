import { lazy, Suspense } from "react";
import type { TableColumn } from "react-data-table-component";

const DataTable = lazy(() =>
  import("react-data-table-component").then((module) => ({
    default: module.default,
  })),
);

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  selectableRows?: boolean;
  pagination?: boolean;
};

const getCustomStyles = () => ({
  table: {
    style: {
      backgroundColor: "#ffffff",
    },
  },
  headCells: {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      backgroundColor: "#efefef",
      color: "#374151",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
  rows: {
    style: {
      minHeight: "55px",
      cursor: "pointer",
      backgroundColor: "",
      "&:hover": {
        backgroundColor: "#f3f4f6",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#ffffff",
      color: "#0f172a",
    },
    pageButtonsStyle: {
      color: "#0f172a",
      fill: "#0f172a",
      "&:disabled": {
        color: "#9ca3af",
        fill: "#9ca3af",
      },
    },
  },
  noData: {
    style: {
      backgroundColor: "#ffffff",
      color: "#6b7280",
    },
  },
});

function Table<T>({
  columns,
  data,
  selectableRows = false,
  pagination = false,
}: TableProps<T>) {
  const customStyles = getCustomStyles();

  return (
    <Suspense
      fallback={<div className="p-4 text-center text-gray-500">Loading...</div>}
    >
      <DataTable
        columns={columns as TableColumn<unknown>[]}
        data={data}
        selectableRows={selectableRows}
        pagination={pagination}
        customStyles={customStyles}
        responsive
        fixedHeader={false}
        noTableHead={false}
      />
    </Suspense>
  );
}

export default Table;
