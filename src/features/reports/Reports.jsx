import { useEffect, useState } from "react";
import api from "../../services/api";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Reports() {
  const [type, setType] = useState("income"); // income | expense | combined
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadReport();
    // eslint-disable-next-line
  }, [type, month, year]);

  const loadReport = async () => {
    const params = {};
    if (month) params.month = month;
    if (year) params.year = year;

    // 🔹 COMBINED
    if (type === "combined") {
      const res = await api.get("/reports/combined", { params });

      const labels = res.data.map(i => i.date);

      setChartData({
        labels,
        datasets: [
          {
            label: "Income",
            data: res.data.map(i => i.income),
            backgroundColor: "#28a745"
          },
          {
            label: "Expense",
            data: res.data.map(i => i.expense),
            backgroundColor: "#dc3545"
          }
        ]
      });

      return;
    }

    // 🔹 INCOME / EXPENSE (Pie)
    const res = await api.get(`/reports/${type}`, { params });

    const labels = res.data.map(i => i._id);
    const values = res.data.map(i => i.total);
    const totalSum = values.reduce((a, b) => a + b, 0);

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#28a745",
            "#dc3545",
            "#007bff",
            "#ffc107",
            "#6f42c1",
            "#20c997"
          ],
          meta: { totalSum }
        }
      ]
    });
  };

  const years = [];
  for (let y = 2020; y <= new Date().getFullYear(); y++) {
    years.push(y);
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Reports</h4>

      {/* FILTERS */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="combined">Combined</option>
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={month}
            onChange={e => setMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {[
              "January", "February", "March", "April",
              "May", "June", "July", "August",
              "September", "October", "November", "December"
            ].map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CHART */}
      {chartData && (
        <div style={{ maxWidth: type === "combined" ? "100%" : "420px", margin: "0 auto" }}>
          {type === "combined" ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                  tooltip: {
                    callbacks: {
                      label: ctx =>
                        `${ctx.dataset.label}: ₹${ctx.raw.toLocaleString()}`
                    }
                  }
                },
                scales: {
                  x: { stacked: false },
                  y: { beginAtZero: true }
                }
              }}
            />
          ) : (
            <Pie
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: ctx => {
                        const value = ctx.raw;
                        const total = ctx.dataset.meta.totalSum;
                        const percent = ((value / total) * 100).toFixed(1);
                        return `${ctx.label}: ₹${value.toLocaleString()} (${percent}%)`;
                      }
                    }
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
