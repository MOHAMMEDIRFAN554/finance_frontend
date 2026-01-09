import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [bank, setBank] = useState("");
  const [fromBank, setFromBank] = useState("");
  const [toBank, setToBank] = useState("");
  const [isTransfer, setIsTransfer] = useState(false);
  const [note, setNote] = useState("");
  const [categories, setCategories] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data.expense));
    api.get("/banks").then(res => setBanks(res.data));
  }, []);

  // Reset irrelevant fields when toggling
  useEffect(() => {
    if (isTransfer) {
      setCategory("");
      setBank("");
    } else {
      setFromBank("");
      setToBank("");
    }
  }, [isTransfer]);

  const submit = async (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Amount is required");
      return;
    }

    if (!isTransfer && (!category || !bank)) {
      alert("Category and Bank are required");
      return;
    }

    if (isTransfer && (!fromBank || !toBank)) {
      alert("Both From Bank and To Bank are required");
      return;
    }

    await api.post("/expense", {
      amount: Number(amount),
      category: isTransfer ? undefined : category,
      bank: isTransfer ? undefined : bank,
      fromBank: isTransfer ? fromBank : undefined,
      toBank: isTransfer ? toBank : undefined,
      isSelfTransfer: isTransfer,
      note,
      date: new Date()
    });

    alert("Expense added successfully");
  };

  return (
    <div className="container mt-4">
      <h4>Add Expense</h4>

      {/* Self Transfer Toggle */}
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="selfTransfer"
          checked={isTransfer}
          onChange={e => setIsTransfer(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="selfTransfer">
          Self Transfer (Bank to Bank)
        </label>
      </div>

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        {/* NORMAL EXPENSE */}
        {!isTransfer && (
          <>
            <select
              className="form-control mb-2"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <select
              className="form-control mb-2"
              value={bank}
              onChange={e => setBank(e.target.value)}
            >
              <option value="">Select Bank</option>
              {banks.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </>
        )}

        {/* SELF TRANSFER */}
        {isTransfer && (
          <>
            <select
              className="form-control mb-2"
              value={fromBank}
              onChange={e => setFromBank(e.target.value)}
            >
              <option value="">From Bank</option>
              {banks.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>

            <select
              className="form-control mb-2"
              value={toBank}
              onChange={e => setToBank(e.target.value)}
            >
              <option value="">To Bank</option>
              {banks.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </>
        )}

        <textarea
          className="form-control mb-2"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <button className="btn btn-danger w-100">
          Save
        </button>
      </form>
    </div>
  );
}
