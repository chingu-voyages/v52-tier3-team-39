"use client";

import { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Container,
  TextField,
  MenuItem,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function AddressInput() {
  const [addresses, setAddresses] = useState([]);
  const [providedAddress, setProvidedAddress] = useState({
    hse_nbr: "",
    hse_dir: "",
    str_nm: "",
    str_sfx: "",
    zip_cd: "",
  });
  const [isAddressFound, setIsAddressFound] = useState(false);

  const handleChange = (e) => {
    setProvidedAddress({
      ...providedAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch data from API
  // useEffect(() => {
  //   async function fetchAddresses() {
  //     try {
  //       const response = await fetch(
  //         "https://data.lacity.org/resource/4ca8-mxuh.json?"
  //       );
  //       const data = await response.json();
  //       setAddresses(data);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   }
  //   fetchAddresses();
  // }, []);

  async function fetchAddresses() {
    try {
      const response = await fetch(
        `https://data.lacity.org/resource/4ca8-mxuh.json?hse_nbr=${providedAddress.hse_nbr}&hse_dir_cd=${providedAddress.hse_dir}&str_nm=${providedAddress.str_nm}&str_sfx_cd=${providedAddress.str_sfx}&zip_cd=${providedAddress.zip_cd}`
      );
      const data = await response.json();
      setAddresses(data);
      setIsAddressFound(true);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }

  return (
    <FormControl>
      <Container>
        <Stack direction="row" spacing={2} padding={0}>
          <TextField
            id="hse_nbr"
            name="hse_nbr"
            label="House Number"
            variant="outlined"
            value={providedAddress.hse_nbr}
            onChange={handleChange}
          />
          <TextField
            id="hse_dir"
            name="hse_dir"
            select
            label="Direction"
            defaultValue=""
            value={providedAddress.hse_dir}
            helperText="if applicable"
            onChange={handleChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="N">North</MenuItem>
            <MenuItem value="E">East</MenuItem>
            <MenuItem value="W">West</MenuItem>
            <MenuItem value="S">South</MenuItem>
          </TextField>
          <TextField
            id="str_nm"
            name="str_nm"
            label="Street Name"
            variant="outlined"
            value={providedAddress.str_nm}
            onChange={handleChange}
          />
          <TextField
            id="str_sfx"
            name="str_sfx"
            label="Suffix"
            variant="outlined"
            value={providedAddress.str_sfx}
            onChange={handleChange}
          />
          <TextField
            id="zip_cd"
            label="Zip Code"
            name="zip_cd"
            variant="outlined"
            value={providedAddress.zip_cd}
            onChange={handleChange}
          />
        </Stack>
        <Button variant="contained" onClick={fetchAddresses}>
          Validate
        </Button>
        {isAddressFound ? (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Address verified
          </Alert>
        ) : (
          <Alert severity="error">Address not found.</Alert>
        )}
      </Container>
    </FormControl>
  );
}
