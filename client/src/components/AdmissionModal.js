import React from "react";
import "../App.css";

const AdmissionModal = ({ admissionNumber, onClose }) => {
  if (!admissionNumber) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Seat Allocated!</h2>
        <p>Admission Number: {admissionNumber}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default AdmissionModal;
