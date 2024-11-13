"use client";

import { useState } from "react";
import Joi from "joi";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import { requestAppt } from "@/actions/form";

// define schema

const schema = Joi.object({
  //! add regex to restrict to alpha only
  name: Joi.string().alphanum().min(2).max(30).required(),
  //! update tlds config (throws error if not present)
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  //! add regex to restrict to nums only
  phone: Joi.string().alphanum().length(10),
  address: Joi.string().required(),
});

export default function Form() {
  // capture state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // error state
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPath, setErrorPath] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, value } = schema.validate({
      name,
      email,
      phone,
      address,
    });

    if (error) {
      setErrorMsg(values.error.details[0].message);
      setErrorPath(values.error.details[0].path[0]);
      return;
    }
    const response = await requestAppt(value);
    console.log(response);

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setErrorMsg("");
    setErrorPath("");
  }

  return (
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

      <FormControl>
        <InputLabel htmlFor="address">Address</InputLabel>
        <Input
          id="address"
          aria-describedby="address-error-text"
          value={address}
          onChange={(event) => {
            setAddress(event.currentTarget.value);
          }}
        />
        {errorPath && errorPath === "address" && (
          <FormHelperText id="address-error-text" error>
            {errorMsg}
          </FormHelperText>
        )}
      </FormControl>

      <div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
