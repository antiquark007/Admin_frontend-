import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import { customers as customersData } from "../data/customersData";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("Week");

  // Pagination
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        String(c.id).includes(q)
    );
  }, [customers, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIdx = (page - 1) * pageSize;
  const pageRows = filtered.slice(startIdx, startIdx + pageSize);

  useEffect(() => setPage(1), [search, pageSize]);
  useEffect(() => {
    setPage((p) => (p > totalPages ? totalPages : p));
  }, [totalPages]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="page">
      <div className="page-head">
        <div className="page-title-wrap">
          <h2 className="page-title">Customers</h2>
          <p className="page-sub">Overview & management</p>
        </div>
        <select
          className="btn btn-outline customers-period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="customers-stats">
        <div className="customers-stat" style={{ background: "#f3f0ff" }}>
          <p className="customers-stat-value">10,456</p>
          <p className="customers-stat-title">Total Customers</p>
          <span className="customers-stat-delta">+8% from yesterday</span>
        </div>
        <div className="customers-stat" style={{ background: "#e9fbe9" }}>
          <p className="customers-stat-value">120</p>
          <p className="customers-stat-title">New Signups</p>
          <span className="customers-stat-delta">+5% from yesterday</span>
        </div>
        <div className="customers-stat" style={{ background: "#fff3e6" }}>
          <p className="customers-stat-value">6,800</p>
          <p className="customers-stat-title">Returning Customers</p>
          <span className="customers-stat-delta">+12% from yesterday</span>
        </div>
        <div className="customers-stat" style={{ background: "#ffeef2" }}>
          <p className="customers-stat-value">15</p>
          <p className="customers-stat-title">Blocked Customers</p>
          <span className="customers-stat-delta">0.5% from yesterday</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="customers-tools">
        <div className="customers-tools-left">
          <span className="muted">Show</span>
          <select
            className="customers-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
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
          <button className="chip">Orders ▾</button>
          <button className="chip">Spends ▾</button>
          <button className="chip">Commission ▾</button>
        </div>
      </div>

      {/* Table */}
      <div className="card customers-card">
        <table className="customers-table">
          <colgroup>
              <col style={{ width: "120px" }} /> {/* CustomerID */}
  <col style={{ width: "180px" }} /> {/* Customer */}
  <col style={{ width: "220px" }} /> {/* Email */}
  <col style={{ width: "150px" }} /> {/* Last OrderDate */}
  <col style={{ width: "120px" }} /> {/* Total Orders */}
  <col style={{ width: "150px" }} /> {/* Total Spends */}
  <col style={{ width: "120px" }} /> {/* Commission */}
  <col style={{ width: "100px" }} /> {/* Action */}
          </colgroup>
          <thead>
            <tr>
              <th>CustomerID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Last OrderDate</th>
              <th>Total orders</th>
              <th>Total spends</th>
              <th>Commission</th>
              <th className="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length > 0 ? (
              pageRows.map((c) => (
                <tr key={c.id}>
                  <td><span className="tag">#{c.id}</span></td>
                  <td>{c.name}</td>
                  <td className="muted">{c.email}</td>
                  <td className="muted">{c.orders?.[0]?.date || "-"}</td>
                  <td>{c.totalOrders}</td>
                  <td>{c.totalSpends}</td>
                  <td>{c.commissionEarned}</td>
                  <td className="center action-col">
                    <Link to={`/customers/${c.id}`} className="icon-link eye" title="View">
                      <FiEye />
                    </Link>
                    <button className="icon-link danger" onClick={() => handleDelete(c.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="center muted">
                  No matching customers.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="customers-pager">
          <button className="pager-btn" onClick={() => setPage(1)} disabled={page === 1}>
            «
          </button>
          <button className="pager-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            ‹
          </button>
          {pages.map((p) => (
            <button
              key={p}
              className={`pager-btn ${p === page ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="pager-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            ›
          </button>
          <button
            className="pager-btn"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
