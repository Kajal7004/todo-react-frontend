
const Modal = ({ isOpen, onClose, title, children }) => {
  // If the modal isn't open, we return null so nothing is added to the DOM
  if (!isOpen) return null; 

  return (
    /* The backdrop covers the full screen */
    <div className="modal-backdrop" onClick={onClose}>
      
      {/* e.stopPropagation() is crucial! 
          It prevents the 'onClose' event from firing when you click 
          inside the white modal box itself.
      */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* This renders whatever HTML or Components you put inside <Modal>...</Modal> */}
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;