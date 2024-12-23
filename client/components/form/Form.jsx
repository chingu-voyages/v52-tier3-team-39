"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Joi from "joi";
import dayjs from "dayjs";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import TimeRangeInput from "./TimeRangeInput";
import { requestAppt } from "@/actions/form";
import AutocompleteAddress from "./AutocompleteAddress";
import ErrorToast from "../errors/ErrorToast";
import Loading from "@/app/loading";

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

export default function Form({ email, token }) {
  const router = useRouter();
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [earlyTime, setEarlyTime] = useState(
    dayjs().hour(9).minute(0).second(0)
  );
  const [lateTime, setLateTime] = useState(
    dayjs().hour(10).minute(0).second(0)
  );
  const [address, setAddress] = useState("");
  const [disableBtn, setDisableBtn] = useState(null);
  // Error state
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPath, setErrorPath] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  function handleCancel() {
    router.push("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const earlyTimeHour = earlyTime.hour();
    const lateTimeHour = lateTime.hour();

    // Handle validation errors
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

    try {
      setIsPending(true);
      // Handle server errors
      const serverErr = await requestAppt(value, token);
      if (serverErr) {
        setToast(true);
        return setToastMsg(serverErr.message);
      }
      router.push("/new-appointment/success");
    } catch (err) {
      console.error(err);
      setHasSubmitError(true);
    } finally {
      setIsPending(false);
    }
  }

  if (hasSubmitError) {
    throw new Error("Failed to submit form due to a server error");
  }

  return (
    <>
      {isPending && <Loading />}
      <ErrorToast
        toast={toast}
        setToast={setToast}
        toastMsg={toastMsg}
        setToastMsg={setToastMsg}
      />
      <Stack gap={4} sx={{ width: { xs: 1 }, marginX: "auto", marginY: 8 }}>
        <Box>
          <Typography
            sx={{ color: "var(--foreground)", fontSize: { xs: 16, lg: 20 } }}
          >
            Email: {email}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack direction="column" gap={4}>
            <FormControl>
              <InputLabel htmlFor="name" sx={{ color: "var(--foreground)" }}>
                Name
              </InputLabel>
              <Input
                id="name"
                aria-describedby="name-error-text"
                value={name}
                sx={{
                  "&:before": {
                    borderColor: "var(--accent)",
                  },
                  color: "var(--foreground)",
                }}
                disabled={isPending}
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
              <InputLabel htmlFor="phone" sx={{ color: "var(--foreground)" }}>
                Phone Number
              </InputLabel>
              <Input
                id="phone"
                aria-describedby="phone-error-text"
                value={phone}
                sx={{
                  "&:before": {
                    borderColor: "var(--accent)", // Custom styles for before
                  },
                  color: "var(--foreground)",
                }}
                disabled={isPending}
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
            <AutocompleteAddress
              setAddress={setAddress}
              errorMsg={errorPath === "address" ? errorMsg : undefined}
              isPending={isPending}
            />

            <TimeRangeInput
              earlyTime={earlyTime}
              setEarlyTime={setEarlyTime}
              lateTime={lateTime}
              setLateTime={setLateTime}
              errorMsg={errorMsg}
              errorPath={errorPath}
              setDisableBtn={setDisableBtn}
              isPending={isPending}
            />

            <Stack
              direction={{ sm: "column", lg: "row" }}
              gap={2}
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                color="warning"
                size="large"
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={!!disableBtn || isPending}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
