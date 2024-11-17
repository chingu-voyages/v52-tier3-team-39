"use client";

import { useEffect } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import { FormControl, InputLabel, Input } from "@mui/material";

export default function Autocomplete({ address, setAddress }) {
  const addresses = [];

  async function fetchAddresses() {
    fetch("https://data.lacity.org/resource/4ca8-mxuh.json?$limit=5000", {
      method: "GET",
      headers: {
        "X-App-Token": "RaqdAQIchfqi7GxBlLrWKTD8W",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert(`Retrieved ${data.length} records from the dataset!`);
        data.map((address) =>
          addresses.push(
            `${address.hse_nbr} ${address.hse_dir_cd} ${address.str_nm} ${
              address.str_sfx_cd ? address.str_sfx_cd : ""
            } ${address.zip_cd}`
          )
        );
        console.log(addresses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchAddresses();
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
  }, []);

  return (
    <FormControl>
      <InputLabel htmlFor="address">Address</InputLabel>
      <Input id="autoComplete" aria-describedby="phone-error-text" />
    </FormControl>
  );
}
