"use client";

import { useState } from "react";
import Joi from "joi";
import {
  Alert,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import { Button } from "@mui/material";
import { requestAppt } from "@/actions/form";
import AddressInput from "./AddressInput";

// define schema
const schema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .min(2)
    .max(30)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),
  phone: Joi.string()
    .pattern(new RegExp(/^[0-9]*$/))
    .length(10),
  address: Joi.string().required(),
});

export default function Form() {
  // capture state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState([]);
  // error state
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPath, setErrorPath] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
    setToastMsg("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, value } = schema.validate({
      name,
      email,
      phone,
      address,
    });

    if (error) {
      console.log(error);
      setErrorMsg(error.details[0].message);
      setErrorPath(error.details[0].path[0]);
      return;
    }
    const res = await requestAppt({ name, email, phone, address });

    if (res) {
      setToast(true);
      setToastMsg(res.message);
    }
  }

  return (
    <>
      <Snackbar
        open={toast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleToastClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
      <form
        className="flex flex-col gap-4 w-1/2 mx-auto mt-12"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            aria-describedby="name-error-text"
            value={name}
            onChange={(event) => {
              setName(event.currentTarget.value);
            }}
          />
          {errorPath && errorPath === "name" && (
            <FormHelperText id="name-error-text" error>
              {errorMsg}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            aria-describedby="email-error-text"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
          />
          {errorPath && errorPath === "email" && (
            <FormHelperText id="email-error-text" error>
              {errorMsg}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="phone">Phone Number</InputLabel>
          <Input
            id="phone"
            aria-describedby="phone-error-text"
            value={phone}
            onChange={(event) => {
              setPhone(event.currentTarget.value);
            }}
          />
          {errorPath && errorPath === "phone" && (
            <FormHelperText id="phone-error-text" error>
              {errorMsg}
            </FormHelperText>
          )}
        </FormControl>

        <AddressInput />

        <div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
