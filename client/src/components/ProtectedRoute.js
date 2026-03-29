export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.trim();

  console.log("ROLE:", role);
  console.log("ALLOWED:", allowedRoles);

  if (!token) return <h3>Please login</h3>;

  if (!allowedRoles.includes(role)) {
    return null;  
  }

  return children;
}