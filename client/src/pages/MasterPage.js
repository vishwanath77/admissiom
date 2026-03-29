import { useState } from "react";
import API from "../services/api";
import Card from "../components/Card";
import { toast } from "react-toastify";

export default function MasterPage() {
  const [program, setProgram] = useState({
    name: "",
    intake: "",
    year: "",
  });

  const [quota, setQuota] = useState({
    programId: "",
    type: "",
    totalSeats: "",
  });

  // ✅ Create Program
  const createProgram = async () => {
    try {
      await API.post("/master/program", program);

      toast.success("Program created successfully!");

      // reset form
      setProgram({ name: "", intake: "", year: "" });

    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.error || "Failed to create program");
    }
  };

  // ✅ Create Quota
  const createQuota = async () => {
    try {
      await API.post("/master/quota", quota);

      toast.success("Quota created successfully!");

      // reset form
      setQuota({ programId: "", type: "", totalSeats: "" });

    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.error || "Failed to create quota");
    }
  };

  return (
    <>
      {/* 🔹 Create Program */}
      <Card>
        <h3>Create Program</h3>

        <input
          placeholder="Branch"
          value={program.name}
          onChange={(e) =>
            setProgram({ ...program, name: e.target.value })
          }
        />

        <input
          placeholder="Seats"
          type="number"
          value={program.intake}
          onChange={(e) =>
            setProgram({ ...program, intake: Number(e.target.value) })
          }
        />

        <input
          placeholder="Year"
          type="number"
          value={program.year}
          onChange={(e) =>
            setProgram({ ...program, year: Number(e.target.value) })
          }
        />

        <button onClick={createProgram}>
          Create Program
        </button>
      </Card>

      {/* 🔹 Create Quota */}
      <Card>
        <h3>Create Quota</h3>

        <input
          placeholder="Program ID"
          type="number"
          value={quota.programId}
          onChange={(e) =>
            setQuota({ ...quota, programId: Number(e.target.value) })
          }
        />

        <input
          placeholder="Type (KCET / Management)"
          value={quota.type}
          onChange={(e) =>
            setQuota({ ...quota, type: e.target.value })
          }
        />

        <input
          placeholder="Seats"
          type="number"
          value={quota.totalSeats}
          onChange={(e) =>
            setQuota({ ...quota, totalSeats: Number(e.target.value) })
          }
        />

        <button onClick={createQuota}>
          Create Quota
        </button>
      </Card>
    </>
  );
}