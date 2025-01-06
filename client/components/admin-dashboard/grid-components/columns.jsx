import VisitedChip from "./VisitedChip";
import StatusChange from "./StatusChange";
import {
  formatName,
  formatDateCreated,
  formatTimeRange,
  formatPhone,
} from "./formatters";

export const getColumns = (toggleVisited) => [
  {
    field: "visitOrder",
    headerName: "Visit Order",
    width: 190,
    valueGetter: (_, row) => row.schedule.order,
  },
  {
    field: "markVisited",
    headerName: "Visited?",
    width: 190,
    renderCell: (params) => (
      <VisitedChip
        id={params.row.id}
        status={params.row.status}
        currentStatus={status}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 190,
    renderCell: (params) => {
      const { id, status } = params.row;
      return <StatusChange id={id} currentStatus={status} />;
    },
  },
  {
    valueFormatter: formatName,
    field: "name",
    headerName: "Name",
    width: 190,
  },
  {
    valueFormatter: formatDateCreated,
    field: "dateCreated",
    headerName: "Requested on",
    width: 190,
  },
  {
    valueFormatter: formatTimeRange,
    field: "timeRange",
    headerName: "Timeslot",
    width: 190,
  },
  {
    valueFormatter: formatPhone,
    field: "phone",
    headerName: "Phone",
    width: 190,
  },
  { field: "email", headerName: "Email", width: 190 },
  {
    field: "address",
    headerName: "Address",
    width: 190,
  },
];
