"use client";

import { useState } from "react";
import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";

export default function AddressInput() {
  return (
    <FormControl>
      <InputLabel htmlFor="address-input">Address</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
    </FormControl>
  );
}
