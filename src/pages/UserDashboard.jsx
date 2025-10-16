




import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Get user
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  // Get orders from localStorage
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) return;
    const userOrders = JSON.parse(localStorage.getItem("orders")) || {};
    setOrders(userOrders[loggedUser._id] || []);
  }, []);

  // Delete order
  const deleteOrder = (orderId) => {
    if (!user) return;
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const updatedOrders = (allOrders[user._id] || []).filter(order => order.id !== orderId);
    allOrders[user._id] = updatedOrders;
    localStorage.setItem("orders", JSON.stringify(allOrders));
    setOrders(updatedOrders);
    alert("Order deleted successfully ✅");
  };

  if (!user) return <h2 style={{ textAlign: "center", padding: "2rem" }}>Loading...</h2>;

  const sidebarStyle = { width: "200px", height: "100vh", backgroundColor: "#2c3e50", color: "white", padding: "1rem" };
  const linkStyle = (tab) => ({
    display: "block",
    padding: "0.7rem 0",
    cursor: "pointer",
    color: activeTab === tab ? "#f39c12" : "white",
    fontWeight: activeTab === tab ? "bold" : "normal",
  });
  const mainStyle = { flex: 1, padding: "2rem" };

  const thStyle = { border: "1px solid #ccc", padding: "0.5rem", backgroundColor: "#f1f1f1" };
  const tdStyle = { border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2>👤 My Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role === 1 ? "Admin" : "User"}</p>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2>🛒 My Orders</h2>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order, idx) => (
                <div key={order.id} style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: 10 }}>
                  <h3>
                    Order #{idx + 1} | Total: ₹{order.totalAmount}
                    <button
                      onClick={() => deleteOrder(order.id)}
                      style={{
                        marginLeft: "1rem",
                        padding: "0.3rem 0.6rem",
                        backgroundColor: "#E53935",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </button>
                  </h3>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={thStyle}>#</th>
                        <th style={thStyle}>Product</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Quantity</th>
                        <th style={thStyle}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((p, i) => (
                        <tr key={i}>
                          <td style={tdStyle}>{i + 1}</td>
                          <td style={tdStyle}>{p.name}</td>
                          <td style={tdStyle}>₹{p.price}</td>
                          <td style={tdStyle}>{p.quantity}</td>
                          <td style={tdStyle}>₹{p.price * p.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <h2>User Panel</h2>
        <span style={linkStyle("profile")} onClick={() => setActiveTab("profile")}>Profile</span>
        <span style={linkStyle("orders")} onClick={() => setActiveTab("orders")}>My Orders</span>
      </div>
      <div style={mainStyle}>{renderContent()}</div>
    </div>
  );
};

export default UserDashboard;




