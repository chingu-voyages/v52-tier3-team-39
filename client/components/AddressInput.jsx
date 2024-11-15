"use client";

import { useState, useEffect } from "react";
import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";

export default function AddressInput() {
  const [addresses, setAddresses] = useState([]);
  // Fetch data from API
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const response = await fetch(
          "https://data.lacity.org/resource/4ca8-mxuh.json?"
        );
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    }
    fetchAddresses();
  }, []);

  return (
    <FormControl>
      <InputLabel htmlFor="address-input">Address</InputLabel>
      <Input id="address-input" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
    </FormControl>
  );
}
