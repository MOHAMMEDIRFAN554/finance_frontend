import { useState } from "react";
import api from "../../services/api";

export default function Categories() {
  const [name, setName] = useState("");
  const [type, setType] = useState("income");

  const submit = async () => {
    await api.post("/categories", { name, type });
    alert("Category added");
  };

  return (
    <div className="container mt-4">
      <h4>Add Category</h4>
      <input className="form-control mb-2"
        placeholder="Category name"
        onChange={e => setName(e.target.value)} />
      <select className="form-control mb-2"
        onChange={e => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button className="btn btn-primary w-100" onClick={submit}>
        Save
      </button>
    </div>
  );
}
