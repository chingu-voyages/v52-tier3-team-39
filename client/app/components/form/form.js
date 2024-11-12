"use client";

import { useState } from "react";
import Joi from "joi";

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
  const [error, setError] = useState("");

  // on submit function
  async function handleSubmit(e) {
    e.preventDefault();
    const values = schema.validate({
      name,
      email,
      phone,
      address,
    });

    // validate here
    if (values.error) {
      console.log(values);
    }
    // package values into an obj (use values.value)

    // invoke server action

    // reset the inputs

    // handle the response
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }

  return (
    <form
      className="flex flex-col gap-4 w-1/2 mx-auto mt-12"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        {/* remove required tag for custom error handling */}
        <input
          id="name"
          type="text"
          className="text-black"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          className="text-black"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="text"
          className="text-black"
          value={phone}
          onChange={(event) => {
            setPhone(event.currentTarget.value);
          }}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          className="text-black"
          value={address}
          onChange={(event) => {
            setAddress(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <button className="text-white">Submit</button>
      </div>
    </form>
  );
}
