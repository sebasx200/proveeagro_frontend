import React from "react";

function ToggleButton({ itemID, togglePasswordVisibility, showPassword }) {
  return (
    <button
      itemID={itemID}
      type="button"
      onClick={togglePasswordVisibility}
      className="btn btn-success text-muted position-absolute top-50 end-0 translate-middle-y me-2"
    >
      <span
        id="passwordIcon"
        className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
      ></span>
    </button>
  );
}

function FormButton({ itemID, text, className }) {
  return (
    <button itemID={itemID} className={className}>
      {text}
    </button>
  );
}

function FormLabel({ text }) {
  return <label className="form-labels">{text}</label>;
}

function FormPanel({ children }) {
  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div className="col-md-8 panel">
          <div className="row">{children}</div>
        </div>
      </div>
    </div>
  );
}

function DivInput({ children }) {
  return <div className="form-floating mb-2">{children}</div>;
}
export { FormPanel, DivInput, ToggleButton, FormButton, FormLabel };
