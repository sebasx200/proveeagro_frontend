import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// CustomModal component
const CustomModal = ({
  isOpen,
  onRequestClose,
  api,
  endPoint,
  onUpdate,
  children,
  initialData,
}) => {
  // State to manage the form data
  const [formData, setFormData] = useState(initialData);

  // Set initial data
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Handle change form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(endPoint, formData);
      onUpdate(response.data);
      onRequestClose();
    } catch (error) {
      console.error("Error actualizando los datos:", error);
    }
  };

  // Map children and pass formData and handleChange
  const childrenWithProps = React.Children.map(children, (child) => {
    // Check if child is a DOM element
    if (typeof child.type === "string") {
      // If it is, don't pass formData
      return child;
    } else {
      // If it's not, pass formData
      return React.cloneElement(child, { formData, handleChange });
    }
  });

  return (
    // Modal component
    <Modal
      isOpen={isOpen}
      contentLabel="Custom Modal"
      style={{
        content: {
          width: "60%",
          height: "60%",
          margin: "auto",
        },
      }}
    >
      <button
        className="btn btn-close"
        onClick={() => onRequestClose()}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      ></button>
      <form onSubmit={handleSubmit}>
        {childrenWithProps}
        <button type="submit" className="btn btn-success">
          Editar datos
        </button>
      </form>
    </Modal>
  );
};

export default CustomModal;
