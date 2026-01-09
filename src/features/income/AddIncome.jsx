import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AddIncome() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [bank, setBank] = useState("");
  const [note, setNote] = useState("");
  const [categories, setCategories] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data.income));
    api.get("/banks").then(res => setBanks(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/income", {
      amount,
      category,
      bank,
      note,
      date: new Date()
    });
    alert("Income added");
  };

  return (
    <div className="container mt-4">
      <h4>Add Income</h4>
      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Amount"
          onChange={e => setAmount(e.target.value)} />
        
        <select className="form-control mb-2"
          onChange={e => setCategory(e.target.value)}>
          <option>Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select className="form-control mb-2"
          onChange={e => setBank(e.target.value)}>
          <option>Select Bank</option>
          {banks.map(b => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>

        <textarea className="form-control mb-2"
          placeholder="Note (optional)"
          onChange={e => setNote(e.target.value)} />

        <button className="btn btn-success w-100">Save</button>
      </form>
    </div>
  );
}
