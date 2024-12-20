import { Button } from "@mui/material";

const VisitedChip = ({ id, status, toggleVisited }) => {
  const visited = status === "Visited" || status === "Completed";

  return (
    <Button
      variant={visited ? "contained" : "outlined"}
      color="primary"
      onClick={() => toggleVisited(id, visited ? "Scheduled" : "Completed")}
    >
      {visited ? "Visited" : "Not Visited"}
    </Button>
  );
};

export default VisitedChip;
