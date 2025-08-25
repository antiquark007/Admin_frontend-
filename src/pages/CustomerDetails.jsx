import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import { customers as customersData } from "../data/customersData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CustomerDetails() {
  const { id } = useParams();
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2025");

  const person = customers.find((c) => String(c.id) === id);
  if (!person) return <p>Customer not found</p>;

  const filteredOrders = person.orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.date.toLowerCase().includes(search.toLowerCase()) ||
      String(o.items).includes(search) ||
      String(o.amount).includes(search) ||
      String(o.commission).includes(search)
  );

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Delete this order?")) {
      person.orders = person.orders.filter((o) => o.id !== orderId);
      setCustomers([...customers]);
    }
  };

  const barData = {
    labels: [
      "JAN","FEB","MAR","APR","MAY","JUN",
      "JUL","AUG","SEP","OCT","NOV","DEC"
    ],
    datasets: [
      {
        label: "Commission Earned",
        data: person.graph,
        backgroundColor: "#7C5CFC",
        borderRadius: 6,
        barThickness: 14,
      },
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9aa1aa" } },
      y: {
        grid: { color: "#eef0f4" },
        ticks: { color: "#9aa1aa", stepSize: 100 },
      },
    },
  };

  return (
    <div className="page">
      <div className="page-head">
        <div className="page-title-wrap">
          <h2 className="page-title">{person.name}</h2>
          <p className="page-sub">Customer details</p>
        </div>
        <select
          className="btn btn-outline customers-period"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>

      <div className="customer-hero">
        <div className="customer-left">
          <h3 className="customer-name">{person.name}</h3>
          <dl className="kv">
            <dt>GENDER</dt><dd>{person.gender}</dd>
            <dt>TOTAL ORDERS</dt><dd>{person.totalOrders}</dd>
            <dt>CANCELED</dt><dd>{person.canceled}</dd>
            <dt>RETURNED</dt><dd>{person.returned}</dd>
            <dt>TOTAL SPENDS</dt><dd className="amount">{person.totalSpends}</dd>
            <dt>COMMISSION EARNED</dt><dd className="amount">{person.commissionEarned}</dd>
          </dl>
        </div>
        <div className="card commission-card">
          <div className="card-head tight">
            <h4 className="card-title">Commission Earned</h4>
          </div>
          <div className="bar-wrap">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="customers-tools">
        <div className="customers-tools-left">
          <span className="muted">Show</span>
          <select className="customers-select">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="muted">entries</span>
        </div>
        <div className="customers-tools-right">
          <div className="customers-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="chip">Items ▾</button>
          <button className="chip">Spends ▾</button>
          <button className="chip">Commission ▾</button>
        </div>
      </div>

      {/* Orders table */}
      <div className="card customers-card">
        <table className="orders-table">
          <colgroup>
            <colgroup>
  <col style={{ width: "120px" }} /> {/* OrderID */}
  <col style={{ width: "120px" }} /> {/* Total Items */}
  <col style={{ width: "150px" }} /> {/* Order Date */}
  <col style={{ width: "150px" }} /> {/* Total Amount */}
  <col style={{ width: "120px" }} /> {/* Commission */}
  <col style={{ width: "50px" }} /> {/* Action */}
</colgroup>

          </colgroup>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Total items</th>
              <th>OrderDate</th>
              <th>Total amount</th>
              <th>Commission</th>
              <th className="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td className="muted">{o.id}</td>
                  <td>{o.items}</td>
                  <td className="muted">{o.date}</td>
                  <td>{o.amount}</td>
                  <td>{o.commission}</td>
                  <td className="center action-col">
                    <button className="icon-link eye"><FiEye /></button>
                    <button
                      className="icon-link danger"
                      onClick={() => handleDeleteOrder(o.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="center muted">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
