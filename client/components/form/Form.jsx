"use client";

import { useState } from "react";
import Joi from "joi";
import dayjs from "dayjs";
import {
  Alert,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import { Button } from "@mui/material";
import TimeRangeInput from "./TimeRangeInput";
import { requestAppt } from "@/actions/form";
import AutocompleteAddress from "./AutocompleteAddress";

const schema = Joi.object({
  name: Joi.string().min(2).max(255).required().trim(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .trim(),
  phone: Joi.string()
    .pattern(new RegExp(/^[0-9]*$/))
    .length(10)
    .trim(),
  address: Joi.string().required(),
  earlyTimeHour: Joi.number().min(9).max(16).required(),
  lateTimeHour: Joi.number()
    .min(10)
    .max(17)
    .required()
    // check that lateTime > earlyTime
    .greater(Joi.ref("earlyTimeHour")),
});

export default function Form() {
  // capture state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [earlyTime, setEarlyTime] = useState(
    dayjs().hour(9).minute(0).second(0)
  );
  const [lateTime, setLateTime] = useState(
    dayjs().hour(10).minute(0).second(0)
  );
  //! Adding default fake address to pass validation only
  //! Update this once the address validator is fully functional
  const [address, setAddress] = useState("123 Main St, Los Angeles, CA 90012");
  // error state
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPath, setErrorPath] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [disableBtn, setDisableBtn] = useState(null);

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
    setToastMsg("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const earlyTimeHour = earlyTime.hour();
    const lateTimeHour = lateTime.hour();
    const { error, value } = schema.validate({
      name,
      email,
      phone,
      address,
      earlyTimeHour,
      lateTimeHour,
    });

    if (error) {
      setErrorMsg(error.details[0].message);
      setErrorPath(error.details[0].path[0]);
      return;
    }
    const res = await requestAppt(value);

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
        className="flex flex-col gap-4 w-full md:w-1/2 mx-auto mt-12"
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

        <AutocompleteAddress address={address} setAddress={setAddress} />

        <TimeRangeInput
          earlyTime={earlyTime}
          setEarlyTime={setEarlyTime}
          lateTime={lateTime}
          setLateTime={setLateTime}
          errorMsg={errorMsg}
          setDisableBtn={setDisableBtn}
        />

        <div>
          <Button variant="contained" type="submit" disabled={!!disableBtn}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
