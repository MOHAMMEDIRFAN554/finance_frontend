import { useState } from "react";
import api from "../../services/api";

export default function Banks() {
  const [name, setName] = useState("");

  const submit = async () => {
    await api.post("/banks", { name });
    alert("Bank added");
  };

  return (
    <div className="container mt-4">
      <h4>Add Bank</h4>
      <input className="form-control mb-2"
        placeholder="Bank name"
        onChange={e => setName(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={submit}>
        Save
      </button>
    </div>
  );
}
