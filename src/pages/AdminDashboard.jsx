






import React, { useState, useEffect } from "react";
import CreateCategory from "../component/catergory";
import CreateProduct from "../component/Cproduct";
import Product from "../component/Pproductu";

/* -------------------------------------------------------------------------- */
/* 🧩 Subcomponent: AdminUserOrders */
/* -------------------------------------------------------------------------- */
const AdminUserOrders = () => {
  const [users, setUsers] = useState([]);
  const [ordersByUser, setOrdersByUser] = useState({});

  useEffect(() => {
    // ✅ Fetch users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    // ✅ Fetch orders (stored per user)
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    setOrdersByUser(allOrders);
  }, []);

  return (
    <div>
      <h2>👥 User Orders Overview</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id || user.email}
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>
              🧑 {user.name} ({user.email})
            </h3>

            {ordersByUser[user._id || user.email] &&
            ordersByUser[user._id || user.email].length > 0 ? (
              ordersByUser[user._id || user.email].map((order, idx) => (
                <div
                  key={order.id || idx}
                  style={{
                    margin: "0.8rem 0",
                    padding: "0.8rem",
                    border: "1px dashed #888",
                    borderRadius: 6,
                    background: "white",
                  }}
                >
                  <p>
                    <strong>Order #{idx + 1}</strong> | Total: ₹{order.totalAmount} |{" "}
                    <em>{order.date || "No date"}</em>
                  </p>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "0.5rem",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "#eee" }}>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((p, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "4px",
                              textAlign: "center",
                            }}
                          >
                            {i + 1}
                          </td>
                          <td style={{ border: "1px solid #ccc", padding: 4 }}>{p.name}</td>
                          <td style={{ border: "1px solid #ccc", padding: 4 }}>₹{p.price}</td>
                          <td style={{ border: "1px solid #ccc", padding: 4 }}>{p.quantity}</td>
                          <td style={{ border: "1px solid #ccc", padding: 4 }}>
                            ₹{p.price * p.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p style={{ color: "#777" }}>No orders yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 🧩 Main Component: AdminDashboard */
/* -------------------------------------------------------------------------- */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const sidebarStyle = {
    width: "220px",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "1rem",
    boxSizing: "border-box",
  };

  const linkStyle = (tab) => ({
    display: "block",
    padding: "0.7rem 0",
    cursor: "pointer",
    color: activeTab === tab ? "#f39c12" : "white",
    fontWeight: activeTab === tab ? "bold" : "normal",
  });

  const mainStyle = { flex: 1, padding: "2rem" };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <h2>👑 Admin Dashboard Home</h2>;
      case "category":
        return (
          <CreateCategory categories={categories} setCategories={setCategories} />
        );
      case "product":
        return (
          <CreateProduct
            categories={categories}
            products={products}
            setProducts={setProducts}
          />
        );
      case "users":
        return <h2>Users Management (connect backend later)</h2>;
      case "viewProducts":
        return <Product products={products} />;
      case "userOrders":
        return <AdminUserOrders />;
      default:
        return <h2>👑 Admin Dashboard Home</h2>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h2>Admin Panel</h2>
        <span style={linkStyle("dashboard")} onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </span>
        <span style={linkStyle("category")} onClick={() => setActiveTab("category")}>
          Create Category
        </span>
        <span style={linkStyle("product")} onClick={() => setActiveTab("product")}>
          Create Product
        </span>
        <span style={linkStyle("users")} onClick={() => setActiveTab("users")}>
          Users
        </span>
        <span
          style={linkStyle("viewProducts")}
          onClick={() => setActiveTab("viewProducts")}
        >
          View Products
        </span>
        <span
          style={linkStyle("userOrders")}
          onClick={() => setActiveTab("userOrders")}
        >
          User Orders
        </span>
      </div>

      {/* Main content */}
      <div style={mainStyle}>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;










