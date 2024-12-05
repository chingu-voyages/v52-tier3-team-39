import { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onFilterChange, columns }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filters = columns.map((col) => ({
      columnField: col.field,
      operatorValue: "contains",
      value,
    }));

    onFilterChange({ items: value ? filters : [] });
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
