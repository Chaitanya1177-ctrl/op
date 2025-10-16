// import React from 'react'

// function Pproductu() {
//   return (
//     <div>
      
//       <h1>hello</h1>
//     </div>
//   )
// }

// export default Pproductu











// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminProductDashboard = () => {
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editingData, setEditingData] = useState({});

//   const API_URL = "http://localhost:6002/api/product";
//   const CATEGORY_API = "http://localhost:6002/api/category/get-all";

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(CATEGORY_API);
//       const data = await res.json();
//       if (data.success) setCategories(data.categories);
//     } catch (error) {
//       toast.error("❌ Error fetching categories");
//     }
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/all`);
//       const data = await res.json();
//       if (data.success) {
//         const grouped = groupProductsByCategory(data.products);
//         setProductsByCategory(grouped);
//       } else {
//         toast.error(data.message || "Failed to fetch products");
//       }
//     } catch (error) {
//       toast.error("❌ Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Group products by category
//   const groupProductsByCategory = (products) => {
//     const grouped = {};
//     products.forEach((product) => {
//       const categoryName = product.category?.name || "Uncategorized";
//       if (!grouped[categoryName]) grouped[categoryName] = [];
//       grouped[categoryName].push(product);
//     });
//     return grouped;
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Start editing
//   const startEditing = (product) => {
//     setEditingId(product._id);
//     setEditingData({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       category: product.category?._id || product.category,
//       quantity: product.quantity,
//       shipping: product.shipping,
//       photo: null,
//     });
//   };

//   // Update product
//   const handleUpdateProduct = async (id) => {
//     const { name, description, price, category, quantity } = editingData;
//     if (!name || !description || !price || !category || !quantity) {
//       toast.error("❌ All fields are required");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       Object.entries(editingData).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value);
//       });

//       const res = await fetch(`${API_URL}/update/${id}`, { method: "PUT", body: formData });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("✅ Product updated successfully");
//         setEditingId(null);
//         setEditingData({});
//         fetchProducts();
//       } else {
//         toast.error("❌ " + (data.message || "Failed to update product"));
//       }
//     } catch (error) {
//       toast.error("❌ Error updating product");
//     }
//   };

//   // Delete product
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("✅ Product deleted successfully");
//         fetchProducts();
//       } else {
//         toast.error("❌ " + (data.message || "Failed to delete product"));
//       }
//     } catch (error) {
//       toast.error("❌ Error deleting product");
//     }
//   };

//   if (loading) return <p style={{ color: "white" }}>Loading products...</p>;
//   if (!Object.keys(productsByCategory).length) return <p style={{ color: "white" }}>No products found</p>;

//   return (
//     <div style={{ padding: "20px", backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
//       <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide} />
//       <h2>Admin Product Dashboard</h2>

//       {/* Category-wise Product List */}
//       {Object.keys(productsByCategory).map((category) => (
//         <div key={category} style={{ marginBottom: "30px" }}>
//           <h3>{category}</h3>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
//             {productsByCategory[category].map((prod) => (
//               <div key={prod._id} style={itemStyle}>
//                 {editingId === prod._id ? (
//                   <>
//                     <input type="text" value={editingData.name} onChange={(e) => setEditingData({ ...editingData, name: e.target.value })} style={inputStyle} />
//                     <input type="number" value={editingData.price} onChange={(e) => setEditingData({ ...editingData, price: e.target.value })} style={inputStyle} />
//                     <select value={editingData.category} onChange={(e) => setEditingData({ ...editingData, category: e.target.value })} style={inputStyle}>
//                       {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//                     </select>
//                     <div style={{ marginTop: "5px" }}>
//                       <button onClick={() => handleUpdateProduct(prod._id)} style={updateBtnStyle}>Update</button>
//                       <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>Cancel</button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {prod.photo && <img src={`http://localhost:6002/api/product/photo/${prod._id}`} alt={prod.name} style={imgStyle} />}
//                     <p style={{ fontWeight: "bold" }}>{prod.name}</p>
//                     <p>₹{prod.price}</p>
//                     <p>Qty: {prod.quantity}</p>
//                     <div>
//                       <button onClick={() => startEditing(prod)} style={editBtnStyle}>Edit</button>
//                       <button onClick={() => handleDeleteProduct(prod._id)} style={deleteBtnStyle}>Delete</button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Styles
// const itemStyle = { width: "160px", padding: "10px", backgroundColor: "#222", borderRadius: "5px", textAlign: "center" };
// const imgStyle = { width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px" };
// const inputStyle = { width: "100%", padding: "5px", marginBottom: "5px", borderRadius: "5px", border: "1px solid #555", backgroundColor: "#000", color: "white" };
// const editBtnStyle = { padding: "5px 10px", marginRight: "5px", border: "none", borderRadius: "5px", backgroundColor: "#0a84ff", color: "white", cursor: "pointer" };
// const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
// const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
// const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };

// export default AdminProductDashboard;





















// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminProductDashboard = () => {
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editingData, setEditingData] = useState({});

//   const API_URL = "http://localhost:6002/api/product";
//   const CATEGORY_API = "http://localhost:6002/api/category/get-all";

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(CATEGORY_API);
//       const data = await res.json();
//       if (data.success) setCategories(data.categories);
//     } catch (error) {
//       toast.error("❌ Error fetching categories");
//     }
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/all`);
//       const data = await res.json();
//       if (data.success) {
//         const grouped = groupProductsByCategory(data.products);
//         setProductsByCategory(grouped);
//       } else {
//         toast.error(data.message || "Failed to fetch products");
//       }
//     } catch (error) {
//       toast.error("❌ Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const groupProductsByCategory = (products) => {
//     const grouped = {};
//     products.forEach((product) => {
//       const categoryName = product.category?.name || "Uncategorized";
//       if (!grouped[categoryName]) grouped[categoryName] = [];
//       grouped[categoryName].push(product);
//     });
//     return grouped;
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   const startEditing = (product) => {
//     setEditingId(product._id);
//     setEditingData({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       category: product.category?._id || product.category,
//       quantity: product.quantity,
//       shipping: product.shipping,
//       photo: null, // optional file
//     });
//   };

//   const handleUpdateProduct = async (id) => {
//     const { name, description, price, category, quantity } = editingData;
//     if (!name || !description || !price || !category || !quantity) {
//       toast.error("❌ All fields are required");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       Object.entries(editingData).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value);
//       });

//       const res = await fetch(`${API_URL}/update/${id}`, { method: "PUT", body: formData });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("✅ Product updated successfully");
//         setEditingId(null);
//         setEditingData({});
//         fetchProducts();
//       } else {
//         toast.error("❌ " + (data.message || "Failed to update product"));
//       }
//     } catch (error) {
//       toast.error("❌ Error updating product");
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("✅ Product deleted successfully");
//         fetchProducts();
//       } else {
//         toast.error("❌ " + (data.message || "Failed to delete product"));
//       }
//     } catch (error) {
//       toast.error("❌ Error deleting product");
//     }
//   };

//   if (loading) return <p style={{ color: "white" }}>Loading products...</p>;
//   if (!Object.keys(productsByCategory).length) return <p style={{ color: "white" }}>No products found</p>;

//   return (
//     <div style={{ padding: "20px", backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
//       <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide} />
//       <h2>Admin Product Dashboard</h2>

//       {Object.keys(productsByCategory).map((category) => (
//         <div key={category} style={{ marginBottom: "30px" }}>
//           <h3>{category}</h3>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
//             {productsByCategory[category].map((prod) => (
//               <div key={prod._id} style={itemStyle}>
//                 {/* Image always shows */}
//                 {prod.photo && (
//                   <img
//                     src={`http://localhost:6002/api/product/photo/${prod._id}`}
//                     alt={prod.name}
//                     style={imgStyle}
//                   />
//                 )}

//                 {editingId === prod._id ? (
//                   <>
//                     <input
//                       type="text"
//                       value={editingData.name}
//                       onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
//                       style={inputStyle}
//                       placeholder="Name"
//                     />
//                     <input
//                       type="number"
//                       value={editingData.price}
//                       onChange={(e) => setEditingData({ ...editingData, price: e.target.value })}
//                       style={inputStyle}
//                       placeholder="Price"
//                     />
//                     <input
//                       type="number"
//                       value={editingData.quantity}
//                       onChange={(e) => setEditingData({ ...editingData, quantity: e.target.value })}
//                       style={inputStyle}
//                       placeholder="Quantity"
//                     />
//                     <select
//                       value={editingData.category}
//                       onChange={(e) => setEditingData({ ...editingData, category: e.target.value })}
//                       style={inputStyle}
//                     >
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       type="file"
//                       onChange={(e) => setEditingData({ ...editingData, photo: e.target.files[0] })}
//                       style={{ marginBottom: "5px" }}
//                     />
//                     <div style={{ marginTop: "5px" }}>
//                       <button onClick={() => handleUpdateProduct(prod._id)} style={updateBtnStyle}>
//                         Update
//                       </button>
//                       <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <p style={{ fontWeight: "bold" }}>{prod.name}</p>
//                     <p>₹{prod.price}</p>
//                     <p>Qty: {prod.quantity}</p>
//                     <div>
//                       <button onClick={() => startEditing(prod)} style={editBtnStyle}>
//                         Edit
//                       </button>
//                       <button onClick={() => handleDeleteProduct(prod._id)} style={deleteBtnStyle}>
//                         Delete
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Styles
// const itemStyle = { width: "160px", padding: "10px", backgroundColor: "#222", borderRadius: "5px", textAlign: "center" };
// const imgStyle = { width: "100%", height: "100px", objectFit: "cover", borderRadius: "5px", marginBottom: "5px" };
// const inputStyle = { width: "100%", padding: "5px", marginBottom: "5px", borderRadius: "5px", border: "1px solid #555", backgroundColor: "#000", color: "white" };
// const editBtnStyle = { padding: "5px 10px", marginRight: "5px", border: "none", borderRadius: "5px", backgroundColor: "#0a84ff", color: "white", cursor: "pointer" };
// const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
// const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
// const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };

// export default AdminProductDashboard;












// ff
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProductDashboard = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});

  const API_URL = "http://localhost:6002/api/product";
  const CATEGORY_API = "http://localhost:6002/api/category/get-all";

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch (error) {
      toast.error("❌ Error fetching categories");
    }
  };

  // ✅ Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/all`);
      const data = await res.json();
      if (data.success) {
        const grouped = groupProductsByCategory(data.products);
        setProductsByCategory(grouped);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error("❌ Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const groupProductsByCategory = (products) => {
    const grouped = {};
    products.forEach((product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!grouped[categoryName]) grouped[categoryName] = [];
      grouped[categoryName].push(product);
    });
    return grouped;
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditingData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category?._id || product.category,
      quantity: product.quantity,
      shipping: product.shipping,
      photo: null,
      preview: `http://localhost:6002/api/product/photo/${product._id}`,
    });
  };

  const handleUpdateProduct = async (id) => {
    const { name, description, price, category, quantity } = editingData;
    if (!name || !description || !price || !category || !quantity) {
      toast.error("❌ All fields are required");
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(editingData).forEach(([key, value]) => {
        if (value !== null && key !== "preview") formData.append(key, value);
      });

      const res = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Product updated successfully");
        setEditingId(null);
        setEditingData({});
        fetchProducts();
      } else {
        toast.error("❌ " + (data.message || "Failed to update product"));
      }
    } catch (error) {
      toast.error("❌ Error updating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("❌ " + (data.message || "Failed to delete product"));
      }
    } catch (error) {
      toast.error("❌ Error deleting product");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading products...</p>;
  if (!Object.keys(productsByCategory).length)
    return <p style={{ color: "white" }}>No products found</p>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        transition={Slide}
      />
      <h2>Admin Product Dashboard</h2>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} style={{ marginBottom: "30px" }}>
          <h3>{category}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {productsByCategory[category].map((prod) => (
              <div key={prod._id} style={itemStyle}>
                {/* ✅ Always show image */}
                <img
                  src={`http://localhost:6002/api/product/photo/${prod._id}`}
                  alt={prod.name}
                  style={imgStyle}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=No+Image")
                  }
                />

                {editingId === prod._id ? (
                  <>
                    {/* ✅ Show new image preview if uploaded */}
                    {editingData.preview && (
                      <img
                        src={editingData.preview}
                        alt="Preview"
                        style={{ ...imgStyle, border: "2px solid #0aff84" }}
                      />
                    )}

                    <input
                      type="text"
                      value={editingData.name}
                      onChange={(e) =>
                        setEditingData({ ...editingData, name: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={editingData.price}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          price: e.target.value,
                        })
                      }
                      style={inputStyle}
                      placeholder="Price"
                    />
                    <input
                      type="number"
                      value={editingData.quantity}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          quantity: e.target.value,
                        })
                      }
                      style={inputStyle}
                      placeholder="Quantity"
                    />
                    <select
                      value={editingData.category}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          category: e.target.value,
                        })
                      }
                      style={inputStyle}
                    >
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setEditingData({
                          ...editingData,
                          photo: file,
                          preview: URL.createObjectURL(file),
                        });
                      }}
                      style={{ marginBottom: "5px" }}
                    />
                    <div style={{ marginTop: "5px" }}>
                      <button
                        onClick={() => handleUpdateProduct(prod._id)}
                        style={updateBtnStyle}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={cancelBtnStyle}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ fontWeight: "bold" }}>{prod.name}</p>
                    <p>₹{prod.price}</p>
                    <p>Qty: {prod.quantity}</p>
                    <div>
                      <button
                        onClick={() => startEditing(prod)}
                        style={editBtnStyle}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod._id)}
                        style={deleteBtnStyle}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ✅ Styles
const itemStyle = {
  width: "160px",
  padding: "10px",
  backgroundColor: "#222",
  borderRadius: "5px",
  textAlign: "center",
};
const imgStyle = {
  width: "100%",
  height: "100px",
  objectFit: "cover",
  borderRadius: "5px",
  marginBottom: "5px",
};
const inputStyle = {
  width: "100%",
  padding: "5px",
  marginBottom: "5px",
  borderRadius: "5px",
  border: "1px solid #555",
  backgroundColor: "#000",
  color: "white",
};
const editBtnStyle = {
  padding: "5px 10px",
  marginRight: "5px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#0a84ff",
  color: "white",
  cursor: "pointer",
};
const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };

export default AdminProductDashboard;
