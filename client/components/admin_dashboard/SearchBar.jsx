import { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSearchChange, searchText }) => {
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchText}
      onChange={handleSearch}
      placeholder="Search across all fields"
    />
  );
};

export default SearchBar;
