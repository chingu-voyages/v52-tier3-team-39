import { useState } from "react";
import { TextField, Box, InputAdornment, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearchChange, searchText }) => {
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Tooltip
        title="Quickly filter across all column fields"
        placement="top"
        arrow
      >
        <TextField
          label=""
          variant="outlined"
          margin="normal"
          value={searchText}
          onChange={handleSearch}
          sx={{
            flex: 0.55,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default SearchBar;
