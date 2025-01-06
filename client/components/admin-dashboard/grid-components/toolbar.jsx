import { GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";

const Toolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
    <GridToolbarExport />
  </GridToolbarContainer>
);
