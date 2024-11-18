"use client";

import { useEffect, useState } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import { FormControl, InputLabel, Input } from "@mui/material";
import { laCityKey } from "@/constants";

export default function Autocomplete({ address, setAddress }) {
  const [addresses, setAddresses] = useState([]);
  console.log(addresses);

  useEffect(() => {
    async function fetchAddresses() {
      const response = await fetch(
        "https://data.lacity.org/resource/4ca8-mxuh.json?$limit=500",
        {
          method: "GET",
          headers: {
            "X-App-Token": laCityKey,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const combinedAddresses = data.map((address) => {
        return `${address.hse_nbr} ${address.hse_dir_cd} ${address.str_nm} ${
          address.str_sfx_cd ? address.str_sfx_cd : ""
        } ${address.zip_cd}`;
      });
      setAddresses(combinedAddresses);
    }
    fetchAddresses();
  }, []);

  useEffect(() => {
    const autoCompleteJS = new autoComplete({
      selector: "#autoComplete",
      placeHolder: "Search for Addresses...",
      data: {
        src: addresses,
      },
      resultItem: {
        highlight: true,
      },
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value;
            autoCompleteJS.input.value = selection;
            setAddress(selection);
          },
        },
      },
    });
  }, [addresses]);

  return (
    <FormControl>
      <InputLabel htmlFor="address">Address</InputLabel>
      <Input id="autoComplete" aria-describedby="phone-error-text" />
    </FormControl>
  );
}
