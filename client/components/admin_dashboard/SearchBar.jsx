import { useState } from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ onSearchChange, searchText }) => {
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        value={searchText}
        onChange={handleSearch}
        sx={{
          flex: 0.55,
        }}
      />
    </Box>
  );
};

export default SearchBar;
