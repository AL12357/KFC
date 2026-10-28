import React from "react";
import { Link } from "react-router-dom";

const ContactInfo = ({ customerInfo, onChange }) => {
  return (
    <section className="delivery_info_container">
      <div style={{ display: "flex" }}>
        <div style={{ width: "40%" }}>
          <h3>CONTACT INFORMATION</h3>
          <Link className="sign_button_ellipse" to="/signin">
            Sign In
          </Link>
        </div>

        <div style={{ width: "60%" }}>
          <form onSubmit={(event) => event.preventDefault()}>
            <TextInput
              id="customer-first-name"
              name="firstName"
              label="First name*"
              value={customerInfo.firstName}
              onChange={onChange}
              required
            />

            <TextInput
              id="customer-last-name"
              name="lastName"
              label="Last name*"
              value={customerInfo.lastName}
              onChange={onChange}
              required
            />

            <TextInput
              id="customer-email"
              name="email"
              type="email"
              label="Email*"
              value={customerInfo.email}
              onChange={onChange}
              required
            />

            <TextInput
              id="customer-phone"
              name="phone"
              type="tel"
              label="Phone number*"
              value={customerInfo.phone}
              onChange={onChange}
              required
            />
          </form>

          <div style={{ display: "flex", marginTop: "20px" }}>
            <input id="marketing-opt-in" type="checkbox" />
            <label style={{ marginLeft: "10px" }} htmlFor="marketing-opt-in">
              I want to receive KFC news and offers by email or SMS.
              This is optional.
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

function TextInput({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="input-container">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={
          name === "firstName" ? "given-name" :
          name === "lastName" ? "family-name" :
          name === "email" ? "email" :
          name === "phone" ? "tel" : "off"
        }
      />
      <label className={value ? "filled" : ""} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default ContactInfo;
