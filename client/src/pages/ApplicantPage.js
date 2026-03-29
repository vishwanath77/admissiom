import { useState } from "react";
import API from "../services/api";
import Card from "../components/Card";
import { toast } from "react-toastify";

export default function ApplicantPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quotaType: "",
    marks: "",
  });

  const createApplicant = async () => {
    try {
      const res = await API.post("/applicant", form);


      toast.success("Applicant created successfully!");

      // Optional: clear form
      setForm({
        name: "",
        category: "",
        quotaType: "",
        marks: "",
      });

    } catch (e) {
      console.error(e);

      // ❌ Error toast
      toast.error(e.response?.data?.error || "Failed to create applicant");
    }
  };

  return (
    <Card>
      <h3>Create Applicant</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        placeholder="Quota"
        value={form.quotaType}
        onChange={(e) => setForm({ ...form, quotaType: e.target.value })}
      />

      <input
        placeholder="Marks"
        type="number"
        value={form.marks}
        onChange={(e) =>
          setForm({ ...form, marks: Number(e.target.value) })
        }
      />

      <button onClick={createApplicant}>
        Create
      </button>
    </Card>
  );
}