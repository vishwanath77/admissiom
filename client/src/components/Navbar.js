export default function Navbar({ setIsAuth }) {

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <div className="navbar">
      <h3>Admission CRM</h3>
      <button id='logout-button' onClick={logout}>Logout</button>
    </div>
  );
}