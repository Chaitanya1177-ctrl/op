













// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceSort, setPriceSort] = useState("None");
//   const [searchCategory, setSearchCategory] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cart, setCart] = useState([]); // Cart state
//   const [cartOpen, setCartOpen] = useState(false); // Toggle cart panel

//   const PRODUCT_API = "http://localhost:6002/api/product/all";
//   const CATEGORY_API = "http://localhost:6002/api/category/get-all";

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(PRODUCT_API);
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//         setAllProducts(data.products);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(CATEGORY_API);
//       const data = await res.json();
//       if (data.success) setCategories(data.categories);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filter products
//   useEffect(() => {
//     let filtered = allProducts;
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (p) => p.category && p.category.name === selectedCategory
//       );
//     }
//     if (searchCategory.trim() !== "") {
//       filtered = filtered.filter(
//         (p) =>
//           p.category &&
//           p.category.name.toLowerCase().includes(searchCategory.toLowerCase())
//       );
//     }
//     if (priceSort === "LowToHigh") filtered = filtered.slice().sort((a, b) => a.price - b.price);
//     if (priceSort === "HighToLow") filtered = filtered.slice().sort((a, b) => b.price - a.price);
//     setProducts(filtered);
//   }, [selectedCategory, priceSort, searchCategory, allProducts]);

//   const getSimilarProducts = () => {
//     if (!selectedProduct) return [];
//     return allProducts.filter(
//       (p) =>
//         p.category?.name === selectedProduct.category?.name &&
//         p._id !== selectedProduct._id
//     );
//   };

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p._id === product._id);
//       if (existing) {
//         return prev.map((p) =>
//           p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//     setCartOpen(true); // Automatically open cart when adding
//   };

//   const removeFromCart = (productId) => {
//     setCart((prev) => prev.filter((p) => p._id !== productId));
//   };

//   if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>🛍️ Products</h1>

//       {/* Filters */}
//       <div style={styles.filterContainer}>
//         <label>Category:</label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           style={styles.select}
//         >
//           <option value="All">All</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat.name}>{cat.name}</option>
//           ))}
//         </select>

//         <label>Sort by Price:</label>
//         <select
//           value={priceSort}
//           onChange={(e) => setPriceSort(e.target.value)}
//           style={styles.select}
//         >
//           <option value="None">None</option>
//           <option value="LowToHigh">Lowest → Highest</option>
//           <option value="HighToLow">Highest → Lowest</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Search category..."
//           value={searchCategory}
//           onChange={(e) => setSearchCategory(e.target.value)}
//           style={styles.searchInput}
//         />
//         <button style={styles.cartToggle} onClick={() => setCartOpen(!cartOpen)}>
//           🛒 Cart ({cart.length})
//         </button>
//       </div>

//       {/* Products Grid */}
//       {products.length === 0 ? (
//         <p style={{ color: "white", textAlign: "center" }}>No products found</p>
//       ) : (
//         <div style={styles.grid}>
//           {products.map((prod) => (
//             <div key={prod._id} style={styles.card}>
//               <img
//                 src={`http://localhost:6002/api/product/photo/${prod._id}`}
//                 alt={prod.name}
//                 style={styles.image}
//                 onClick={() => setSelectedProduct(prod)}
//                 onError={(e) => { e.target.src = "https://via.placeholder.com/200x150?text=No+Image"; }}
//               />
//               <h3 style={styles.name}>{prod.name}</h3>
//               <p style={styles.price}>₹{prod.price}</p>
//               <button style={styles.btn} onClick={() => addToCart(prod)}>Add to Cart 🛒</button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Floating Cart Panel */}
//       {cartOpen && (
//         <div style={styles.cartPanel}>
//           <h2>🛒 Your Cart</h2>
//           <button style={styles.closeCartBtn} onClick={() => setCartOpen(false)}>✖</button>
//           {cart.length === 0 ? (
//             <p>No items in cart</p>
//           ) : (
//             <>
//               {cart.map((item) => (
//                 <div key={item._id} style={styles.cartItem}>
//                   <p>{item.name} (x{item.quantity}) - ₹{item.price * item.quantity}</p>
//                   <button style={styles.removeBtn} onClick={() => removeFromCart(item._id)}>Remove</button>
//                 </div>
//               ))}
//               <p style={{ fontWeight: "bold", marginTop: 10 }}>
//                 Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
//               </p>
//             </>
//           )}
//         </div>
//       )}

//       {/* Full-Screen Product Modal */}
//       {selectedProduct && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <button style={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✖</button>
//             <img
//               src={`http://localhost:6002/api/product/photo/${selectedProduct._id}`}
//               alt={selectedProduct.name}
//               style={styles.modalImage}
//               onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image"; }}
//             />
//             <h2>{selectedProduct.name}</h2>
//             <p>{selectedProduct.description}</p>
//             <p style={{ fontWeight: "bold" }}>Price: ₹{selectedProduct.price}</p>
//             <p>Category: {selectedProduct.category?.name || "Uncategorized"}</p>
//             <button style={styles.btn} onClick={() => addToCart(selectedProduct)}>Add to Cart 🛒</button>

//             {/* Similar Products */}
//             {getSimilarProducts().length > 0 && (
//               <>
//                 <h3 style={{ marginTop: 20 }}>Similar Products</h3>
//                 <div style={styles.similarGrid}>
//                   {getSimilarProducts().map((p) => (
//                     <div key={p._id} style={styles.similarCard} onClick={() => setSelectedProduct(p)}>
//                       <img
//                         src={`http://localhost:6002/api/product/photo/${p._id}`}
//                         alt={p.name}
//                         style={styles.similarImage}
//                         onError={(e) => { e.target.src = "https://via.placeholder.com/150x100?text=No+Image"; }}
//                       />
//                       <p style={{ color: "white", fontSize: "0.9rem", marginTop: 5 }}>{p.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: { backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "2rem", color: "white" },
//   title: { textAlign: "center", marginBottom: "2rem" },
//   filterContainer: { marginBottom: "1.5rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" },
//   select: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#222", color: "white" },
//   searchInput: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#222", color: "white" },
//   cartToggle: { marginLeft: "auto", padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#f39c12", color: "white", cursor: "pointer" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" },
//   card: { backgroundColor: "#2c2c2c", borderRadius: 10, padding: 10, textAlign: "center", boxShadow: "0 0 10px rgba(255,255,255,0.1)" },
//   image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: 8, marginBottom: 10, cursor: "pointer" },
//   name: { fontSize: "1.1rem", margin: "0.5rem 0" },
//   price: { color: "#0aff84", fontWeight: "bold" },
//   btn: { backgroundColor: "#f39c12", border: "none", borderRadius: 5, padding: "0.5rem 1rem", color: "white", cursor: "pointer", marginTop: 5 },

//   cartPanel: {
//     position: "fixed",
//     right: 0,
//     top: 0,
//     width: "300px",
//     height: "100vh",
//     backgroundColor: "#333",
//     padding: 20,
//     boxShadow: "-3px 0 10px rgba(0,0,0,0.5)",
//     zIndex: 2000,
//     overflowY: "auto",
//   },
//   closeCartBtn: { position: "absolute", top: 10, right: 10, background: "red", color: "white", border: "none", borderRadius: "50%", width: 25, height: 25, cursor: "pointer" },
//   cartItem: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
//   removeBtn: { background: "red", color: "white", border: "none", borderRadius: 5, padding: "0.2rem 0.5rem", cursor: "pointer" },

//   // Full-Screen Modal
//   modal: {
//     position: "fixed",
//     top: 0, left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0,0,0,0.95)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//     overflowY: "auto",
//     padding: "1rem"
//   },
//   modalContent: {
//     backgroundColor: "#222",
//     borderRadius: 10,
//     padding: "2rem",
//     maxWidth: "800px",
//     width: "100%",
//     textAlign: "center",
//     position: "relative"
//   },
//   closeBtn: { position: "absolute", top: 10, right: 10, background: "red", color: "white", border: "none", borderRadius: "50%", width: "30px", height: "30px", fontSize: "18px", cursor: "pointer" },
//   modalImage: { width: "100%", height: "400px", objectFit: "cover", borderRadius: 10, marginBottom: 20 },
//   similarGrid: { display: "flex", overflowX: "auto", gap: "10px", marginTop: 10, paddingBottom: 10 },
//   similarCard: { minWidth: "150px", cursor: "pointer", textAlign: "center" },
//   similarImage: { width: "100%", height: "100px", objectFit: "cover", borderRadius: 8 },
// };

// export default Home;














// 2


// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceSort, setPriceSort] = useState("None");
//   const [searchCategory, setSearchCategory] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cart, setCart] = useState([]); // Cart state
//   const [cartOpen, setCartOpen] = useState(false); // Full-screen cart modal

//   const PRODUCT_API = "http://localhost:6002/api/product/all";
//   const CATEGORY_API = "http://localhost:6002/api/category/get-all";

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(PRODUCT_API);
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//         setAllProducts(data.products);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(CATEGORY_API);
//       const data = await res.json();
//       if (data.success) setCategories(data.categories);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filter products
//   useEffect(() => {
//     let filtered = allProducts;
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (p) => p.category && p.category.name === selectedCategory
//       );
//     }
//     if (searchCategory.trim() !== "") {
//       filtered = filtered.filter(
//         (p) =>
//           p.category &&
//           p.category.name.toLowerCase().includes(searchCategory.toLowerCase())
//       );
//     }
//     if (priceSort === "LowToHigh") filtered = filtered.slice().sort((a, b) => a.price - b.price);
//     if (priceSort === "HighToLow") filtered = filtered.slice().sort((a, b) => b.price - a.price);
//     setProducts(filtered);
//   }, [selectedCategory, priceSort, searchCategory, allProducts]);

//   const getSimilarProducts = () => {
//     if (!selectedProduct) return [];
//     return allProducts.filter(
//       (p) =>
//         p.category?.name === selectedProduct.category?.name &&
//         p._id !== selectedProduct._id
//     );
//   };

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p._id === product._id);
//       if (existing) {
//         return prev.map((p) =>
//           p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//     setCartOpen(true); // Open full-screen cart modal automatically
//   };

//   const removeFromCart = (productId) => {
//     setCart((prev) => prev.filter((p) => p._id !== productId));
//   };

//   if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>🛍️ Products</h1>

//       {/* Filters */}
//       <div style={styles.filterContainer}>
//         <label>Category:</label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           style={styles.select}
//         >
//           <option value="All">All</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat.name}>{cat.name}</option>
//           ))}
//         </select>

//         <label>Sort by Price:</label>
//         <select
//           value={priceSort}
//           onChange={(e) => setPriceSort(e.target.value)}
//           style={styles.select}
//         >
//           <option value="None">None</option>
//           <option value="LowToHigh">Lowest → Highest</option>
//           <option value="HighToLow">Highest → Lowest</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Search category..."
//           value={searchCategory}
//           onChange={(e) => setSearchCategory(e.target.value)}
//           style={styles.searchInput}
//         />
//         <button style={styles.cartToggle} onClick={() => setCartOpen(true)}>
//           🛒 Cart ({cart.length})
//         </button>
//       </div>

//       {/* Products Grid */}
//       {products.length === 0 ? (
//         <p style={{ color: "white", textAlign: "center" }}>No products found</p>
//       ) : (
//         <div style={styles.grid}>
//           {products.map((prod) => (
//             <div key={prod._id} style={styles.card}>
//               <img
//                 src={`http://localhost:6002/api/product/photo/${prod._id}`}
//                 alt={prod.name}
//                 style={styles.image}
//                 onClick={() => setSelectedProduct(prod)}
//                 onError={(e) => { e.target.src = "https://via.placeholder.com/200x150?text=No+Image"; }}
//               />
//               <h3 style={styles.name}>{prod.name}</h3>
//               <p style={styles.price}>₹{prod.price}</p>
//               <button style={styles.btn} onClick={() => addToCart(prod)}>Add to Cart 🛒</button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Full-Screen Cart Modal */}
//       {cartOpen && (
//         <div style={styles.cartModal}>
//           <div style={styles.cartContent}>
//             <button style={styles.closeCartBtnModal} onClick={() => setCartOpen(false)}>✖</button>
//             <h2 style={{ marginBottom: 20 }}>🛒 Your Cart</h2>
//             {cart.length === 0 ? (
//               <p>No items in cart</p>
//             ) : (
//               <>
//                 <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
//                   {cart.map((item) => (
//                     <div key={item._id} style={styles.cartItemModal}>
//                       <p>{item.name} (x{item.quantity}) - ₹{item.price * item.quantity}</p>
//                       <button style={styles.removeBtn} onClick={() => removeFromCart(item._id)}>Remove</button>
//                     </div>
//                   ))}
//                 </div>
//                 <p style={{ fontWeight: "bold", marginTop: 20 }}>
//                   Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Full-Screen Product Modal */}
//       {selectedProduct && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <button style={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✖</button>
//             <img
//               src={`http://localhost:6002/api/product/photo/${selectedProduct._id}`}
//               alt={selectedProduct.name}
//               style={styles.modalImage}
//               onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image"; }}
//             />
//             <h2>{selectedProduct.name}</h2>
//             <p>{selectedProduct.description}</p>
//             <p style={{ fontWeight: "bold" }}>Price: ₹{selectedProduct.price}</p>
//             <p>Category: {selectedProduct.category?.name || "Uncategorized"}</p>
//             <button style={styles.btn} onClick={() => addToCart(selectedProduct)}>Add to Cart 🛒</button>

//             {/* Similar Products */}
//             {getSimilarProducts().length > 0 && (
//               <>
//                 <h3 style={{ marginTop: 20 }}>Similar Products</h3>
//                 <div style={styles.similarGrid}>
//                   {getSimilarProducts().map((p) => (
//                     <div key={p._id} style={styles.similarCard} onClick={() => setSelectedProduct(p)}>
//                       <img
//                         src={`http://localhost:6002/api/product/photo/${p._id}`}
//                         alt={p.name}
//                         style={styles.similarImage}
//                         onError={(e) => { e.target.src = "https://via.placeholder.com/150x100?text=No+Image"; }}
//                       />
//                       <p style={{ color: "white", fontSize: "0.9rem", marginTop: 5 }}>{p.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: { backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "2rem", color: "white" },
//   title: { textAlign: "center", marginBottom: "2rem" },
//   filterContainer: { marginBottom: "1.5rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" },
//   select: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#222", color: "white" },
//   searchInput: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#222", color: "white" },
//   cartToggle: { marginLeft: "auto", padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#f39c12", color: "white", cursor: "pointer" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" },
//   card: { backgroundColor: "#2c2c2c", borderRadius: 10, padding: 10, textAlign: "center", boxShadow: "0 0 10px rgba(255,255,255,0.1)" },
//   image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: 8, marginBottom: 10, cursor: "pointer" },
//   name: { fontSize: "1.1rem", margin: "0.5rem 0" },
//   price: { color: "#0aff84", fontWeight: "bold" },
//   btn: { backgroundColor: "#f39c12", border: "none", borderRadius: 5, padding: "0.5rem 1rem", color: "white", cursor: "pointer", marginTop: 5 },

//   // Full-Screen Cart Modal
//   cartModal: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0,0,0,0.95)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 3000,
//     padding: "1rem",
//     overflowY: "auto",
//   },
//   cartContent: {
//     backgroundColor: "#222",
//     borderRadius: 10,
//     padding: "2rem",
//     width: "90%",
//     maxWidth: "600px",
//     textAlign: "center",
//     position: "relative",
//   },
//   closeCartBtnModal: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     background: "red",
//     color: "white",
//     border: "none",
//     borderRadius: "50%",
//     width: "30px",
//     height: "30px",
//     fontSize: "18px",
//     cursor: "pointer",
//   },
//   cartItemModal: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },

//   // Full-Screen Product Modal
//   modal: {
//     position: "fixed",
//     top: 0, left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0,0,0,0.95)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//     overflowY: "auto",
//     padding: "1rem"
//   },
//   modalContent: {
//     backgroundColor: "#222",
//     borderRadius: 10,
//     padding: "2rem",
//     maxWidth: "800px",
//     width: "100%",
//     textAlign: "center",
//     position: "relative"
//   },
//   closeBtn: { position: "absolute", top: 10, right: 10, background: "red", color: "white", border: "none", borderRadius: "50%", width: "30px", height: "30px", fontSize: "18px", cursor: "pointer" },
//   modalImage: { width: "100%", height: "400px", objectFit: "cover", borderRadius: 10, marginBottom: 20 },
//   similarGrid: { display: "flex", overflowX: "auto", gap: "10px", marginTop: 10, paddingBottom: 10 },
//   similarCard: { minWidth: "150px", cursor: "pointer", textAlign: "center" },
//   similarImage: { width: "100%", height: "100px", objectFit: "cover", borderRadius: 8 },
//   removeBtn: { background: "red", color: "white", border: "none", borderRadius: 5, padding: "0.2rem 0.5rem", cursor: "pointer" },
// };

// export default Home;














//3
import React, { useEffect, useState } from "react";
import Cart from "./Cart"; // import Cart component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceSort, setPriceSort] = useState("None");
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const PRODUCT_API = "http://localhost:6002/api/product/all";
  const CATEGORY_API = "http://localhost:6002/api/category/get-all";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setAllProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter products
  useEffect(() => {
    let filtered = allProducts;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category && p.category.name === selectedCategory
      );
    }
    if (searchCategory.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.category &&
          p.category.name.toLowerCase().includes(searchCategory.toLowerCase())
      );
    }
    if (priceSort === "LowToHigh") filtered = filtered.slice().sort((a, b) => a.price - b.price);
    if (priceSort === "HighToLow") filtered = filtered.slice().sort((a, b) => b.price - a.price);
    setProducts(filtered);
  }, [selectedCategory, priceSort, searchCategory, allProducts]);

  const getSimilarProducts = () => {
    if (!selectedProduct) return [];
    return allProducts.filter(
      (p) =>
        p.category?.name === selectedProduct.category?.name &&
        p._id !== selectedProduct._id
    );
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setCartOpen(true);
  };

  if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛍️ Products</h1>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <label>Sort by Price:</label>
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          style={styles.select}
        >
          <option value="None">None</option>
          <option value="LowToHigh">Lowest → Highest</option>
          <option value="HighToLow">Highest → Lowest</option>
        </select>

        <input
          type="text"
          placeholder="Search category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          style={styles.searchInput}
        />

        <button style={styles.cartToggle} onClick={() => setCartOpen(!cartOpen)}>
          🛒 Cart ({cart.length})
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>No products found</p>
      ) : (
        <div style={styles.grid}>
          {products.map((prod) => (
            <div key={prod._id} style={styles.card}>
              <img
                src={`http://localhost:6002/api/product/photo/${prod._id}`}
                alt={prod.name}
                style={styles.image}
                onClick={() => setSelectedProduct(prod)}
                onError={(e) => { e.target.src = "https://via.placeholder.com/200x150?text=No+Image"; }}
              />
              <h3 style={styles.name}>{prod.name}</h3>
              <p style={styles.price}>₹{prod.price}</p>
              <button style={styles.btn} onClick={() => addToCart(prod)}>Add to Cart 🛒</button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Component */}
      {cartOpen && <Cart cart={cart} setCart={setCart} setCartOpen={setCartOpen} />}

      {/* Full-Screen Product Modal */}
      {selectedProduct && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button style={styles.closeBtn} onClick={() => setSelectedProduct(null)}>✖</button>
            <img
              src={`http://localhost:6002/api/product/photo/${selectedProduct._id}`}
              alt={selectedProduct.name}
              style={styles.modalImage}
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image"; }}
            />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p style={{ fontWeight: "bold" }}>Price: ₹{selectedProduct.price}</p>
            <p>Category: {selectedProduct.category?.name || "Uncategorized"}</p>
            <button style={styles.btn} onClick={() => addToCart(selectedProduct)}>Add to Cart 🛒</button>

            {/* Similar Products */}
            {getSimilarProducts().length > 0 && (
              <>
                <h3 style={{ marginTop: 20 }}>Similar Products</h3>
                <div style={styles.similarGrid}>
                  {getSimilarProducts().map((p) => (
                    <div key={p._id} style={styles.similarCard} onClick={() => setSelectedProduct(p)}>
                      <img
                        src={`http://localhost:6002/api/product/photo/${p._id}`}
                        alt={p.name}
                        style={styles.similarImage}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150x100?text=No+Image"; }}
                      />
                      <p style={{ color: "white", fontSize: "0.9rem", marginTop: 5 }}>{p.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "2rem", color: "white" },
  title: { textAlign: "center", marginBottom: "2rem" },
  filterContainer: { marginBottom: "1.5rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" },
  select: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#222", color: "white" },
  searchInput: { padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#222", color: "white" },
  cartToggle: { marginLeft: "auto", padding: "0.5rem 1rem", borderRadius: 5, border: "none", backgroundColor: "#f39c12", color: "white", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" },
  card: { backgroundColor: "#2c2c2c", borderRadius: 10, padding: 10, textAlign: "center", boxShadow: "0 0 10px rgba(255,255,255,0.1)" },
  image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: 8, marginBottom: 10, cursor: "pointer" },
  name: { fontSize: "1.1rem", margin: "0.5rem 0" },
  price: { color: "#0aff84", fontWeight: "bold" },
  btn: { backgroundColor: "#f39c12", border: "none", borderRadius: 5, padding: "0.5rem 1rem", color: "white", cursor: "pointer", marginTop: 5 },
  modal: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.95)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, overflowY: "auto", padding: "1rem" },
  modalContent: { backgroundColor: "#222", borderRadius: 10, padding: "2rem", maxWidth: "800px", width: "100%", textAlign: "center", position: "relative" },
  closeBtn: { position: "absolute", top: 10, right: 10, background: "red", color: "white", border: "none", borderRadius: "50%", width: "30px", height: "30px", fontSize: "18px", cursor: "pointer" },
  modalImage: { width: "100%", height: "400px", objectFit: "cover", borderRadius: 10, marginBottom: 20 },
  similarGrid: { display: "flex", overflowX: "auto", gap: "10px", marginTop: 10, paddingBottom: 10 },
  similarCard: { minWidth: "150px", cursor: "pointer", textAlign: "center" },
  similarImage: { width: "100%", height: "100px", objectFit: "cover", borderRadius: 8 },
};

export default Home;
