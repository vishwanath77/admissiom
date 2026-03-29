import { useEffect, useState } from "react";
import API from "../services/api"; // axios instance
import Card from "../components/Card";

export default function ManagementDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/management/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Cannot fetch dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Management Dashboard (View Only)</h2>

      <Card>
        <h3>Total Intake vs Admitted</h3>
        <p>Total Intake: {data.totalIntake}</p>
        <p>Admitted: {data.admittedCount}</p>
      </Card>

      <Card>
        <h3>Quota-wise Seats</h3>
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Quota</th>
              <th>Filled Seats</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {data.quotaWise.map((q, idx) => (
              <tr key={idx}>
                <td>{q.program}</td>
                <td>{q.quota}</td>
                <td>{q.filledSeats}</td>
                <td>{q.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h3>Applicants with Pending Documents</h3>
        <ul>
          {data.pendingDocs.map((a) => (
            <li key={a.id}>{a.name} ({a.category} - {a.quotaType})</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3>Fee Pending List</h3>
        <ul>
          {data.feePending.map((f) => (
            <li key={f.id}>Admission No: {f.admissionNumber} - Applicant ID: {f.applicantId}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}