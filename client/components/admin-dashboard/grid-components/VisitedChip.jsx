import { Button } from "@mui/material";
import { updateStatusOnServer } from "@/actions/form";

const VisitedChip = ({ id, status }) => {
  const visited = status === "Visited" || status === "Completed";

  const toggleVisited = async (id, newStatus) => {
    try {
      await updateStatusOnServer(id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <Button
      variant={visited ? "contained" : "outlined"}
      color="primary"
      onClick={(e) => toggleVisited(id, visited ? "Scheduled" : "Completed")}
    >
      {visited ? "Visited" : "Not Visited"}
    </Button>
  );
};

export default VisitedChip;
