import { useEffect, useState } from "react";
import api from "../../services/api";

/* ---------- Helpers ---------- */
const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);

  const date = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return `${date} · ${time}`;
};

const isSameDay = (dateStr, filterDate) => {
  const d = new Date(dateStr);
  const f = new Date(filterDate);

  return (
    d.getDate() === f.getDate() &&
    d.getMonth() === f.getMonth() &&
    d.getFullYear() === f.getFullYear()
  );
};

/* ---------- Component ---------- */
export default function History() {
  const [data, setData] = useState([]);
  const [banks, setBanks] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterBank, setFilterBank] = useState("");

  // ✅ Single API call
  useEffect(() => {
  api.get("/history")
    .then(res => {
      console.log("History data:", res.data);
      setData(res.data);
    })
    .catch(err => {
      console.error("History load failed", err);
    });

  api.get("/banks").then(res => setBanks(res.data));
}, []);

  const filteredData = data.filter(item => {
    if (filterDate && !isSameDay(item.date, filterDate)) {
      return false;
    }

    if (filterBank) {
      if (item.isSelfTransfer) {
        return (
          item.fromBank?._id === filterBank ||
          item.toBank?._id === filterBank
        );
      }
      return item.bank?._id === filterBank;
    }

    return true;
  });

  const downloadPDF = async () => {
  const res = await api.get("/history/pdf", {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(
    new Blob([res.data], { type: "application/pdf" })
  );

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "history.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};


  return (
    <div className="container mt-4">
      <h4 className="mb-3">History</h4>

      {/* FILTERS */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={filterBank}
            onChange={e => setFilterBank(e.target.value)}
          >
            <option value="">All Banks</option>
            {banks.map(b => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2 text-md-end">
          <button
            className="btn btn-secondary w-100 w-md-auto"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* HISTORY LIST */}
      {filteredData.length === 0 && (
        <div className="text-muted text-center">
          No transactions found
        </div>
      )}

      {filteredData.map(item => (
        <div
          key={item._id}
          className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
        >
          <div>
            <div className="text-muted small">
              {formatDateTime(item.date)}
            </div>

            <div className="small">
              {item.isSelfTransfer
                ? `${item.fromBank?.name} → ${item.toBank?.name}`
                : item.bank?.name}
            </div>

            {item.note && (
              <div className="small text-muted">
                {item.note}
              </div>
            )}
          </div>

          <strong style={{ color: item.color }}>
            ₹{item.amount}
          </strong>
        </div>
      ))}
    </div>
  );
}
