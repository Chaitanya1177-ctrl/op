// Cart.js
import React from "react";

const Cart = ({ cart, setCart, setCartOpen }) => {

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p._id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(prev =>
      prev.map(p =>
        p._id === productId
          ? { ...p, quantity: Math.max(1, p.quantity + amount) }
          : p
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div style={styles.cartModal}>
      <div style={styles.cartContent}>
        <button style={styles.closeBtn} onClick={() => setCartOpen(false)}>✖</button>
        <h2 style={{ marginBottom: 20 }}>🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {cart.map(item => (
                <div key={item._id} style={styles.cartItem}>
                  <img
                    src={`http://localhost:6002/api/product/photo/${item._id}`}
                    alt={item.name}
                    style={styles.cartImage}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/80x80?text=No+Image"; }}
                  />
                  <div style={{ flex: 1, marginLeft: 10 }}>
                    <p>{item.name}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => updateQuantity(item._id, -1)} style={styles.qtyBtn}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)} style={styles.qtyBtn}>+</button>
                    </div>
                    <p>₹{item.price * item.quantity}</p>
                  </div>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              ))}
            </div>
            <p style={{ fontWeight: "bold", marginTop: 20 }}>Total: ₹{getTotal()}</p>
            <button style={styles.checkoutBtn}>Proceed to Payment</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  cartModal: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    backgroundColor: "rgba(0,0,0,0.95)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 3000, padding: "1rem", overflowY: "auto",
  },
  cartContent: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: "2rem",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10, right: 10,
    background: "red", color: "white",
    border: "none", borderRadius: "50%",
    width: 30, height: 30, fontSize: 18, cursor: "pointer"
  },
  cartItem: {
    display: "flex", alignItems: "center", marginBottom: 10,
    backgroundColor: "#333", padding: 10, borderRadius: 8
  },
  cartImage: {
    width: 80, height: 80, objectFit: "cover", borderRadius: 8
  },
  removeBtn: {
    background: "red", color: "white", border: "none", borderRadius: 5,
    padding: "0.2rem 0.5rem", cursor: "pointer", marginLeft: 10
  },
  qtyBtn: {
    background: "#f39c12", color: "white", border: "none", borderRadius: 5,
    width: 25, height: 25, cursor: "pointer", fontWeight: "bold"
  },
  checkoutBtn: {
    marginTop: 20,
    backgroundColor: "#0aff84", color: "black",
    padding: "0.5rem 1rem", border: "none", borderRadius: 5,
    cursor: "pointer", fontWeight: "bold"
  }
};

export default Cart;
