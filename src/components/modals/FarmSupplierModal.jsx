import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

/** This function is a custom modal that can be used to set a dynamic modal */
function FarmSupplierModal({
  show,
  handleClose,
  title,
  propsBody,
  propsFooter,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{propsBody}</Modal.Body>
        <Modal.Footer>{propsFooter}</Modal.Footer>
      </Modal>
    </>
  );
}

// the protypes that the modal recives are validated and set
FarmSupplierModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  propsBody: PropTypes.node.isRequired,
  propsFooter: PropTypes.node.isRequired,
};

export default FarmSupplierModal;
