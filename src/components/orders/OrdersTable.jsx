import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./OrdersTable.css"; 

const ordersData = [
  { trackingId: "#20462", product: { name: "Hat", image: "/assets/Hat.jpg" }, customer: "Matt Dickerson", date: "13/05/2022", amount: 4.95, paymentMode: "Transfer Bank", status: "Delivered" },
  { trackingId: "#18933", product: { name: "Laptop", image: "/assets/laptop.jpg" }, customer: "Wiktoria", date: "22/05/2022", amount: 8.95, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#45169", product: { name: "Phone", image: "/assets/Phone.jpg" }, customer: "Trixie Byrd", date: "15/06/2022", amount: 1149.95, paymentMode: "Cash on Delivery", status: "Process" },
  { trackingId: "#34304", product: { name: "Bag", image: "/assets/Bag.jpg" }, customer: "Brad Mason", date: "06/09/2022", amount: 899.95, paymentMode: "Transfer Bank", status: "Process" },
  { trackingId: "#17188", product: { name: "Headset", image: "/assets/Headset.jpg" }, customer: "Sanderson", date: "25/09/2022", amount: 22.95, paymentMode: "Cash on Delivery", status: "Canceled" },
   { trackingId: "#56201", product: { name: "Smartwatch", image: "/assets/Smartwatch.jpg" }, customer: "Alice Johnson", date: "12/01/2023", amount: 149.99, paymentMode: "Transfer Bank", status: "Delivered" },
  { trackingId: "#87234", product: { name: "Shoes", image: "/assets/Shoes.jpg" }, customer: "Robert King", date: "18/01/2023", amount: 79.95, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#34192", product: { name: "Camera", image: "/assets/Camera.jpg" }, customer: "Emily Davis", date: "05/02/2023", amount: 649.00, paymentMode: "Transfer Bank", status: "Process" },
  { trackingId: "#92015", product: { name: "Keyboard", image: "/assets/Keyboard.jpg" }, customer: "Michael Green", date: "11/02/2023", amount: 49.50, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#73458", product: { name: "Tablet", image: "/assets/Tablet.jpg" }, customer: "Sophia Brown", date: "22/02/2023", amount: 299.00, paymentMode: "Transfer Bank", status: "Canceled" },
  { trackingId: "#81924", product: { name: "Monitor", image: "/assets/Monitor.jpg" }, customer: "Daniel White", date: "10/03/2023", amount: 199.99, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#45812", product: { name: "Speakers", image: "/assets/Speakers.jpg" }, customer: "Jessica Miller", date: "16/03/2023", amount: 89.95, paymentMode: "Transfer Bank", status: "Process" },
  { trackingId: "#69210", product: { name: "Printer", image: "/assets/Printer.jpg" }, customer: "Chris Wilson", date: "28/03/2023", amount: 159.95, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#58214", product: { name: "Drone", image: "/assets/Drone.jpg" }, customer: "Olivia Smith", date: "06/04/2023", amount: 899.99, paymentMode: "Transfer Bank", status: "Canceled" },
  { trackingId: "#71324", product: { name: "TV", image: "/assets/TV.jpg" }, customer: "David Martinez", date: "15/04/2023", amount: 1199.00, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#86491", product: { name: "Chair", image: "/assets/Chair.jpg" }, customer: "Sophia Taylor", date: "20/04/2023", amount: 129.00, paymentMode: "Transfer Bank", status: "Delivered" },
  { trackingId: "#49203", product: { name: "Microwave", image: "/assets/Microwave.jpg" }, customer: "James Anderson", date: "02/05/2023", amount: 249.99, paymentMode: "Cash on Delivery", status: "Process" },
  { trackingId: "#15873", product: { name: "Fan", image: "/assets/Fan.jpg" }, customer: "Megan Lee", date: "11/05/2023", amount: 45.99, paymentMode: "Transfer Bank", status: "Delivered" },
  { trackingId: "#78421", product: { name: "Desk", image: "/assets/Desk.jpg" }, customer: "Andrew Scott", date: "19/05/2023", amount: 350.00, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#92751", product: { name: "Lamp", image: "/assets/Lamp.jpg" }, customer: "Laura Adams", date: "01/06/2023", amount: 29.95, paymentMode: "Transfer Bank", status: "Canceled" },
  { trackingId: "#63415", product: { name: "Watch", image: "/assets/Watch.jpg" }, customer: "Henry Walker", date: "12/06/2023", amount: 210.00, paymentMode: "Cash on Delivery", status: "Delivered" },
  { trackingId: "#84512", product: { name: "Gaming Console", image: "/assets/Console.jpg" }, customer: "Amelia Clark", date: "23/06/2023", amount: 499.00, paymentMode: "Transfer Bank", status: "Delivered" },
  { trackingId: "#21485", product: { name: "Refrigerator", image: "/assets/Refrigerator.jpg" }, customer: "Benjamin Harris", date: "05/07/2023", amount: 1399.00, paymentMode: "Cash on Delivery", status: "Process" },
  { trackingId: "#76124", product: { name: "Shoes", image: "/assets/Sneakers.jpg" }, customer: "Zoe Young", date: "15/07/2023", amount: 89.99, paymentMode: "Transfer Bank", status: "Delivered" },
  { trackingId: "#98241", product: { name: "Air Conditioner", image: "/assets/AC.jpg" }, customer: "Jack Thompson", date: "29/07/2023", amount: 899.95, paymentMode: "Cash on Delivery", status: "Delivered" }

];
const paymentModes = Array.from(new Set(ordersData.map((o) => o.paymentMode)));
const statuses = Array.from(new Set(ordersData.map((o) => o.status)));

export default function OrdersTable() {
  const [search, setSearch] = useState("");
  const [filterPaymentMode, setFilterPaymentMode] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = ordersData.filter((order) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      order.trackingId.toLowerCase().includes(q) ||
      order.product.name.toLowerCase().includes(q) ||
      order.customer.toLowerCase().includes(q) ||
      order.paymentMode.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q);

    const matchesPayment = filterPaymentMode
      ? order.paymentMode === filterPaymentMode
      : true;
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    return matchesSearch && matchesPayment && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  useEffect(() => { setCurrentPage(1); }, [search, filterPaymentMode, filterStatus, pageSize]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const pagedData = filteredData.slice(startIndex, startIndex + pageSize);
  const goPrev = () => { if (currentPage > 1) setCurrentPage((p) => p - 1); };
  const goNext = () => { if (currentPage < totalPages) setCurrentPage((p) => p + 1); };
  const gotoPage = (n) => setCurrentPage(n);

  const statusClasses = (status) => {
    switch (status) {
      case "Delivered": return "status delivered";
      case "Process": return "status process";
      case "Canceled": return "status canceled";
      default: return "status";
    }
  };
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="orders-container">
      {/* Summary Cards */}
      <div className="dash-cards">
        <div className="dash-card purple">
          <div className="dash-value">313</div>
          <div className="dash-label">Total Orders</div>
          <div className="dash-trend up">+8% from yesterday</div>
        </div>
        <div className="dash-card green">
          <div className="dash-value">300</div>
          <div className="dash-label">Delivered Orders</div>
          <div className="dash-trend up">+5% from yesterday</div>
        </div>
        <div className="dash-card yellow">
          <div className="dash-value">5</div>
          <div className="dash-label">In Transit</div>
          <div className="dash-trend up">+1.2% from yesterday</div>
        </div>
        <div className="dash-card red">
          <div className="dash-value">8</div>
          <div className="dash-label">Canceled Orders</div>
          <div className="dash-trend down">0.5% from yesterday</div>
        </div>
      </div>
      {/* Controls */}
      <div className="controls">
        <div className="show-entries">
          Show
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          entries
        </div>
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <select value={filterPaymentMode} onChange={e => setFilterPaymentMode(e.target.value)}>
          <option value="">Payment Mode</option>
          {paymentModes.map((pm) => (<option key={pm} value={pm}>{pm}</option>))}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Status</option>
          {statuses.map((st) => (<option key={st} value={st}>{st}</option>))}
        </select>
      </div>
      {/* Table */}
      <div className="orders-table-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.length > 0 ? (pagedData.map((order, idx) => (
              <tr key={order.trackingId} className={idx % 2 !== 0 ? "alt-row" : ""}>
                <td>{order.trackingId}</td>
                <td className="td-product">
                  <img src={order.product.image} alt={order.product.name} />
                  <span>{order.product.name}</span>
                </td>
                <td>{order.customer}</td>
                <td className="td-date">{order.date}</td>
                <td className="td-amount">${order.amount.toFixed(2)}</td>
                <td>{order.paymentMode}</td>
                <td>
                  <span className={statusClasses(order.status)}>{order.status}</span>
                </td>
                <td>
                  <button className="action edit"><FaEdit size={14} /></button>
                  <button className="action del"><FaTrash size={14} /></button>
                </td>
              </tr>
            ))) : (
              <tr><td colSpan="8" className="no-orders">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pages">
        <button onClick={goPrev} disabled={currentPage === 1} className="page-btn">Previous</button>
        {pageNumbers.map((n) => (
          <button
            key={n}
            onClick={() => gotoPage(n)}
            className={"page-num" + (currentPage === n ? " active" : "")}
          >{n}</button>
        ))}
        <button onClick={goNext} disabled={currentPage === totalPages} className="page-btn">Next</button>
      </div>
    </div>
  );
}
