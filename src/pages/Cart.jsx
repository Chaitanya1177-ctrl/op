











import React, { useEffect, useState, useRef } from "react";
import dropin from "braintree-web-drop-in";

const CartPage = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const [clientToken, setClientToken] = useState(null);
  const dropinInstance = useRef(null);

  // Calculate total
  useEffect(() => {
    const t = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(t);
  }, [cart]);

  // Fetch Braintree token
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("http://localhost:6002/api/product/braintree/token");
        const data = await res.json();
        setClientToken(data.clientToken);
      } catch (err) {
        console.error("Failed to fetch Braintree token:", err);
      }
    };
    getToken();
  }, []);

  // Initialize Drop-in
  useEffect(() => {
    if (!clientToken) return;

    if (dropinInstance.current) {
      dropinInstance.current.teardown().then(() => (dropinInstance.current = null));
    }

    dropin.create({
      authorization: clientToken,
      container: "#bt-dropin",
    })
      .then(instance => (dropinInstance.current = instance))
      .catch(err => console.error("Drop-in create error:", err));
  }, [clientToken]);

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p._id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, amount) => {
    setCart(prev =>
      prev.map(p =>
        p._id === productId
          ? { ...p, quantity: Math.max(1, p.quantity + amount) }
          : p
      )
    );
  };

  // Handle payment
  const handlePayment = async () => {
    if (!dropinInstance.current) return;

    try {
      const { nonce } = await dropinInstance.current.requestPaymentMethod();
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return alert("User not logged in!");

      // Make payment
      const paymentRes = await fetch("http://localhost:6002/api/product/braintree/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nonce, cart }),
      });
      const paymentData = await paymentRes.json();

      if (paymentData.success) {
        // Save order in localStorage
        const userOrders = JSON.parse(localStorage.getItem("orders")) || {};
        const userId = user._id;

        const newOrder = {
          id: Date.now(),
          products: cart,
          totalAmount: paymentData.totalAmount,
          createdAt: new Date().toISOString(),
          transactionId: paymentData.transactionId,
        };

        if (!userOrders[userId]) userOrders[userId] = [];
        userOrders[userId].push(newOrder);
        localStorage.setItem("orders", JSON.stringify(userOrders));

        alert("Payment Successful ✅");
        setCart([]);
        window.location.href = "/user-dashboard";
      } else {
        alert("Payment Failed ❌");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment error! Check console.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Shopping Cart</h1>
      {cart.length === 0 ? (
        <p style={styles.emptyText}>Your cart is currently empty</p>
      ) : (
        <>
          <div style={styles.cartGrid}>
            {cart.map(item => (
              <div key={item._id} style={styles.cartItem}>
                <img
                  src={`http://localhost:6002/api/product/photo/${item._id}`}
                  alt={item.name}
                  style={styles.cartImage}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/120x120?text=No+Image"; }}
                />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>₹{item.price}</p>
                  <div style={styles.qtyWrapper}>
                    <button onClick={() => updateQuantity(item._id, -1)} style={styles.qtyBtn}>−</button>
                    <span style={styles.qtyText}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} style={styles.qtyBtn}>+</button>
                  </div>
                  <p style={styles.itemTotal}>Subtotal: ₹{item.price * item.quantity}</p>
                </div>
                <button style={styles.removeBtn} onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2>Total: ₹{total}</h2>
            <div id="bt-dropin" style={{ margin: "20px 0" }}></div>
            <button style={styles.checkoutBtn} onClick={handlePayment}>Pay Now</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "2rem", minHeight: "100vh", background: "linear-gradient(135deg, #e0c3fc, #8ec5fc)" },
  title: { textAlign: "center", marginBottom: "2rem", fontSize: "2.2rem", color: "#5D2E8C" },
  emptyText: { textAlign: "center", fontSize: "1.3rem", color: "#555", fontStyle: "italic" },
  cartGrid: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  cartItem: { display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1rem 1.5rem", backgroundColor: "#fff", borderRadius: 15, boxShadow: "0 8px 25px rgba(0,0,0,0.15)", alignItems: "center" },
  cartImage: { width: 120, height: 120, objectFit: "cover", borderRadius: 12, border: "1px solid #ccc" },
  itemDetails: { flex: 1, minWidth: 220 },
  itemName: { fontSize: "1.2rem", fontWeight: "600", marginBottom: 6, color: "#4A148C" },
  itemPrice: { fontWeight: "bold", color: "#8E24AA", marginBottom: 8 },
  qtyWrapper: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  qtyBtn: { padding: "0.3rem 0.6rem", borderRadius: 6, border: "none", backgroundColor: "#AB47BC", color: "#fff", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" },
  qtyText: { minWidth: 25, textAlign: "center", fontWeight: "500" },
  itemTotal: { fontWeight: "bold", color: "#D81B60", fontSize: "0.95rem" },
  removeBtn: { padding: "0.5rem 1rem", border: "none", borderRadius: 8, backgroundColor: "#E53935", color: "#fff", cursor: "pointer", fontWeight: "bold" },
  summary: { marginTop: "2.5rem", padding: "1.5rem", backgroundColor: "#fff", borderRadius: 15, textAlign: "center", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
  checkoutBtn: { marginTop: "1.2rem", padding: "0.8rem 1.5rem", border: "none", borderRadius: 10, backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem" }
};

export default CartPage;




















