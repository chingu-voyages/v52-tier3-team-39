"use client";

import { useEffect } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { serverUrl } from "@/constants";

export default function Autocomplete({ setAddress, errorMsg }) {
  useEffect(() => {
    const fetchAddresses = async (query) => {
      const searchString = encodeURIComponent(query);
      const response = await fetch(`${serverUrl}addresses/autocomplete?searchString=${searchString}`);
  
      const { error, suggestions } = await response.json();
  
      if (error) {
        console.warn("Failed to fetch autocomplete suggestions");
        console.warn(error);
        return [];
      }
  
      return suggestions;
    }

    const autoCompleteJS = new autoComplete({
      selector: "#autoComplete",
      placeHolder: "Search for Addresses...",
      data: {
        src: fetchAddresses,
      },
      resultItem: {
        highlight: true,
      },
      debounce: 200,
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

    return () => autoCompleteJS.unInit();
  }, [serverUrl]);

  return (
    <FormControl>
      <InputLabel htmlFor="address">Address</InputLabel>
      <Input id="autoComplete" aria-describedby="phone-error-text" />
      {errorMsg && (
        <FormHelperText id="name-error-text" error>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
}
