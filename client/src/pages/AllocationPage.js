import { useState } from "react";
import API from "../services/api"; 
import Card from "../components/Card";
import AdmissionModal from "../components/AdmissionModal.js";

export default function AllocationPage() {
  const [data, setData] = useState({
    applicantId: "",
    programId: "",
    quotaType: "",
  });
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const allocate = async () => {
    if (!data.applicantId || !data.programId || !data.quotaType) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/admission/allocate", {
        applicantId: Number(data.applicantId),
        programId: Number(data.programId),
        quotaType: data.quotaType,
      });

      // Save admission number and show modal
      setAdmissionNumber(res.data.admissionNumber);
      setShowModal(true);

    } catch (e) {
      console.error(e);
      alert(e.response?.data?.error || "Seat allocation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h3>Seat Allocation</h3>
      <input
        placeholder="Applicant ID"
        type="number"
        onChange={(e) =>
          setData({ ...data, applicantId: e.target.value })
        }
      />
      <input
        placeholder="Program ID"
        type="number"
        onChange={(e) =>
          setData({ ...data, programId: e.target.value })
        }
      />
      <input
        placeholder="Quota"
        onChange={(e) =>
          setData({ ...data, quotaType: e.target.value })
        }
      />
      <button onClick={allocate} disabled={loading}>
        {loading ? "Allocating..." : "Allocate Seat"}
      </button>

      {showModal && (
        <AdmissionModal
          admissionNumber={admissionNumber}
          onClose={() => {
            setShowModal(false);
            setAdmissionNumber("");
            setData({ applicantId: "", programId: "", quotaType: "" });
          }}
        />
      )}
    </Card>
  );
}