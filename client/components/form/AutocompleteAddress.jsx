"use client";

import { useEffect, useState } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { serverUrl } from "@/constants";
import "./Autocomplete.css";

export default function Autocomplete({ setAddress, errorMsg, isPending }) {
  const [hasServerError, setHasServerError] = useState(false);
  useEffect(() => {
    const fetchAddresses = async (query) => {
      try {
        const searchString = encodeURIComponent(query);
        const response = await fetch(
          `${serverUrl}addresses/autocomplete?searchString=${searchString}`
        );
        const { error, suggestions } = await response.json();

        if (error) throw error;

        return suggestions;
      } catch (error) {
        console.error(error);
        setHasServerError(true);
      }
    };

    const autoCompleteJS = new autoComplete({
      selector: "#autoComplete",
      placeHolder: "Search for Los Angeles Addresses...",
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

  if (hasServerError) {
    throw new Error("Failed to fetch autocomplete suggestions");
  }

  return (
    <FormControl>
      <InputLabel htmlFor="address">Address</InputLabel>
      <Input
        id="autoComplete"
        aria-describedby="address-autocomplete"
        disabled={isPending}
        fullWidth
      />
      {errorMsg && (
        <FormHelperText id="name-error-text" error>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
}
