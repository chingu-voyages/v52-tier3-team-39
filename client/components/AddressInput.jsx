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
} from "@mui/material";

export default function AddressInput() {
  const [addresses, setAddresses] = useState([]);
  const [providedAddress, setProvidedAddress] = useState({
    hse_nbr: "",
    hse_dir: "",
    str_nm: "",
    str_sfx: "",
    zip_cd: "",
  });

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

  return (
    <FormControl>
      <Container>
        <Stack direction="row" spacing={2} padding={0}>
          <TextField id="hse_nbr" label="House Number" variant="outlined" />
          <TextField
            id="hse_dir"
            select
            label="Direction"
            defaultValue=""
            helperText="if applicable"
          >
            <MenuItem value="N">North</MenuItem>
            <MenuItem value="E">East</MenuItem>
            <MenuItem value="W">West</MenuItem>
            <MenuItem value="S">South</MenuItem>
          </TextField>
          <TextField id="str_nm" label="Street Name" variant="outlined" />
          <TextField id="str_sfx" label="Suffix" variant="outlined" />
          <TextField id="zip_cd" label="Zip Code" variant="outlined" />
        </Stack>
      </Container>
    </FormControl>
  );
}
