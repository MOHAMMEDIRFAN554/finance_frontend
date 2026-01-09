import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [banks, setBanks] = useState([]);
  const [showBanks, setShowBanks] = useState(false);

  useEffect(() => {
  const loadData = async () => {
    const summary = await api.get("/reports/dashboard");
    const bankRes = await api.get("/banks");

    setIncome(summary.data.income);
    setExpense(summary.data.expense);
    setBanks(bankRes.data);
  };

  loadData();
}, []);


  const balance = income - expense;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Dashboard</h4>

      <Row>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <h4 className="text-success">₹ {income}</h4>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Expense</Card.Title>
              <h4 className="text-danger">₹ {expense}</h4>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card
            className="shadow-sm cursor-pointer"
            onClick={() => setShowBanks(true)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <Card.Title>Balance</Card.Title>
              <h4 className="text-primary">₹ {balance}</h4>
              <small>Click to view bank-wise</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* BANK BALANCE MODAL */}
      <Modal show={showBanks} onHide={() => setShowBanks(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bank Balances</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {banks.map(b => (
            <div
              key={b._id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <span>{b.name}</span>
              <strong>₹ {b.balance}</strong>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowBanks(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
