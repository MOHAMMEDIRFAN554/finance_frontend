export default function AuthLayout({ title, children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">💰 Finance</h3>
        <h5 className="text-center mb-4">{title}</h5>
        {children}
      </div>
    </div>
  );
}
