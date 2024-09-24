import React from "react";
import styles from "./FormComponents.module.css";

function ToggleButton({ itemID, togglePasswordVisibility, showPassword }) {
  return (
    <button
      itemID={itemID}
      type="button"
      onClick={togglePasswordVisibility}
      className={`btn btn-success text-muted position-absolute top-50 end-0 translate-middle-y me-2 ${styles.loginButtonHover}`}
    >
      <span
        id="passwordIcon"
        className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
      ></span>
    </button>
  );
}

function FormButton({ itemID, text, className, onClick }) {
  return (
    <button itemID={itemID} className={className} onClick={onClick}>
      {text}
    </button>
  );
}

function FormPanel({ children }) {
  return (
    <div className="container">
      <div
        className={`row container d-flex justify-content-center align-items-center mt-5 ${styles.panel}`}
      >
        {children}
      </div>
    </div>
  );
}
function SpanMandatory() {
  return <span className="text-danger">*</span>;
}

function FormLogo({src}) {
  return (
    <div>
      <img
        src={src}
        alt="Logo"
        className="img-fluid"
      />
      <p className="text-body-secondary text-center mt-4 mb-2">
        © Proveeagro 2024
      </p>
    </div>
  );
}

export { FormPanel, ToggleButton, FormButton, SpanMandatory, FormLogo };
