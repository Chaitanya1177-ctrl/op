


// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     quantity: "",
//     shipping: 0,
//     photo: null,
//   });

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

//   // Fetch all products
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/all`);
//       const data = await res.json();
//       if (data.success) setProducts(data.products);
//     } catch (error) {
//       toast.error("❌ Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Add product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     const { name, description, price, category, quantity } = newProduct;
//     if (!name || !description || !price || !category || !quantity) {
//       toast.error("❌ All fields are required");
//       return;
//     }
//     setAdding(true);
//     try {
//       const formData = new FormData();
//       Object.entries(newProduct).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value);
//       });

//       const res = await fetch(`${API_URL}/create`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("✅ Product added successfully");
//         setNewProduct({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           quantity: "",
//           shipping: 0,
//           photo: null,
//         });
//         fetchProducts();
//       } else {
//         toast.error("❌ " + (data.message || "Failed to add product"));
//       }
//     } catch (error) {
//       toast.error("❌ Error adding product");
//     } finally {
//       setAdding(false);
//     }
//   };

//   // Start editing product
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

//       const res = await fetch(`${API_URL}/update/${id}`, {
//         method: "PUT",
//         body: formData,
//       });
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
//       const res = await fetch(`${API_URL}/delete/${id}`, {
//         method: "DELETE",
//       });
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

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#000", minHeight: "100vh" }}>
//       <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide} />

//       <h2 style={{ color: "white" }}>Products</h2>

//       {/* Add Product Form */}
//       <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
//         <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={inputStyle} />
//         <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={inputStyle} />
//         <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={inputStyle} />
//         <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={inputStyle} required>
//           <option value="">Select Category</option>
//           {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//         </select>
//         <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} style={inputStyle} />
//         <select value={newProduct.shipping} onChange={(e) => setNewProduct({ ...newProduct, shipping: e.target.value })} style={inputStyle}>
//           <option value={0}>No Shipping</option>
//           <option value={1}>Shipping Available</option>
//         </select>
//         <input type="file" onChange={(e) => setNewProduct({ ...newProduct, photo: e.target.files[0] })} />
//         <button type="submit" disabled={adding} style={addBtnStyle}>{adding ? "Adding..." : "Add Product"}</button>
//       </form>

//       {/* Product List */}
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {products.map((prod) => (
//           <li key={prod._id} style={itemStyle}>
//             {editingId === prod._id ? (
//               <>
//                 <input type="text" value={editingData.name} onChange={(e) => setEditingData({ ...editingData, name: e.target.value })} style={inputStyle} placeholder="Name" />
//                 <input type="text" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} style={inputStyle} placeholder="Description" />
//                 <input type="number" value={editingData.price} onChange={(e) => setEditingData({ ...editingData, price: e.target.value })} style={inputStyle} placeholder="Price" />
//                 <select value={editingData.category} onChange={(e) => setEditingData({ ...editingData, category: e.target.value })} style={inputStyle}>
//                   {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//                 </select>
//                 <input type="number" value={editingData.quantity} onChange={(e) => setEditingData({ ...editingData, quantity: e.target.value })} style={inputStyle} placeholder="Quantity" />
//                 <select value={editingData.shipping} onChange={(e) => setEditingData({ ...editingData, shipping: e.target.value })} style={inputStyle}>
//                   <option value={0}>No Shipping</option>
//                   <option value={1}>Shipping Available</option>
//                 </select>
//                 <input type="file" onChange={(e) => setEditingData({ ...editingData, photo: e.target.files[0] })} />
//                 <div style={{ marginTop: "5px" }}>
//                   <button onClick={() => handleUpdateProduct(prod._id)} style={updateBtnStyle}>Update</button>
//                   <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>Cancel</button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 {prod.photo && <img src={`http://localhost:6002/api/product/photo/${prod._id}`} alt={prod.name} style={imgStyle} />}
//                 <span style={{ fontWeight: "bold" }}>{prod.name}</span>
//                 <span>₹{prod.price}</span>
//                 <span>Qty: {prod.quantity}</span>
//                 <span>Category: {prod.category?.name || prod.category}</span>
//                 <div>
//                   <button onClick={() => startEditing(prod)} style={editBtnStyle}>Edit</button>
//                   <button onClick={() => handleDeleteProduct(prod._id)} style={deleteBtnStyle}>Delete</button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Styles
// const inputStyle = { padding: "8px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #555", backgroundColor: "#222", color: "white" };
// const itemStyle = { padding: "10px", margin: "10px 0", backgroundColor: "#222", color: "white", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "5px" };
// const imgStyle = { width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "5px" };
// const editBtnStyle = { padding: "5px 10px", marginRight: "5px", border: "none", borderRadius: "5px", backgroundColor: "#0a84ff", color: "white", cursor: "pointer" };
// const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
// const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
// const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };
// const addBtnStyle = { ...editBtnStyle, backgroundColor: "#0a84ff" };

// export default ProductList;





































// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);

//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     quantity: "",
//     shipping: 0,
//     photo: null,
//   });
//   const [newProductPreview, setNewProductPreview] = useState(null);

//   const [editingId, setEditingId] = useState(null);
//   const [editingData, setEditingData] = useState({});
//   const [editingPreview, setEditingPreview] = useState(null);

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
//       if (data.success) setProducts(data.products);
//       else toast.error(data.message || "Failed to fetch products");
//     } catch (error) {
//       toast.error("❌ Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Add product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     const { name, description, price, category, quantity } = newProduct;
//     if (!name || !description || !price || !category || !quantity) {
//       toast.error("❌ All fields are required");
//       return;
//     }
//     setAdding(true);
//     try {
//       const formData = new FormData();
//       Object.entries(newProduct).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value);
//       });

//       const res = await fetch(`${API_URL}/create`, { method: "POST", body: formData });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("✅ Product added successfully");
//         setNewProduct({ name: "", description: "", price: "", category: "", quantity: "", shipping: 0, photo: null });
//         setNewProductPreview(null);
//         fetchProducts();
//       } else {
//         toast.error("❌ " + (data.message || "Failed to add product"));
//       }
//     } catch (error) {
//       toast.error("❌ Error adding product");
//     } finally {
//       setAdding(false);
//     }
//   };

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
//     setEditingPreview(null);
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
//         setEditingPreview(null);
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
//   if (!products.length) return <p style={{ color: "white" }}>No products found</p>;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#000", minHeight: "100vh" }}>
//       <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide} />

//       <h2 style={{ color: "white" }}>Products</h2>

//       {/* Add Product Form */}
//       <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
//         <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={inputStyle} />
//         <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={inputStyle} />
//         <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={inputStyle} />
//         <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={inputStyle} required>
//           <option value="">Select Category</option>
//           {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//         </select>
//         <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} style={inputStyle} />
//         <select value={newProduct.shipping} onChange={(e) => setNewProduct({ ...newProduct, shipping: e.target.value })} style={inputStyle}>
//           <option value={0}>No Shipping</option>
//           <option value={1}>Shipping Available</option>
//         </select>
//         <input
//           type="file"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             setNewProduct({ ...newProduct, photo: file });
//             setNewProductPreview(file ? URL.createObjectURL(file) : null);
//           }}
//         />
//         {newProductPreview && <img src={newProductPreview} alt="Preview" style={{ width: "150px", marginTop: "10px", borderRadius: "5px" }} />}
//         <button type="submit" disabled={adding} style={addBtnStyle}>{adding ? "Adding..." : "Add Product"}</button>
//       </form>

//       {/* Product List */}
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {products.map((prod) => (
//           <li key={prod._id} style={itemStyle}>
//             {editingId === prod._id ? (
//               <>
//                 <input type="text" value={editingData.name} onChange={(e) => setEditingData({ ...editingData, name: e.target.value })} style={inputStyle} placeholder="Name" />
//                 <input type="text" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} style={inputStyle} placeholder="Description" />
//                 <input type="number" value={editingData.price} onChange={(e) => setEditingData({ ...editingData, price: e.target.value })} style={inputStyle} placeholder="Price" />
//                 <select value={editingData.category} onChange={(e) => setEditingData({ ...editingData, category: e.target.value })} style={inputStyle}>
//                   {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//                 </select>
//                 <input type="number" value={editingData.quantity} onChange={(e) => setEditingData({ ...editingData, quantity: e.target.value })} style={inputStyle} placeholder="Quantity" />
//                 <select value={editingData.shipping} onChange={(e) => setEditingData({ ...editingData, shipping: e.target.value })} style={inputStyle}>
//                   <option value={0}>No Shipping</option>
//                   <option value={1}>Shipping Available</option>
//                 </select>
//                 <input
//                   type="file"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     setEditingData({ ...editingData, photo: file });
//                     setEditingPreview(file ? URL.createObjectURL(file) : null);
//                   }}
//                 />
//                 {editingPreview ? <img src={editingPreview} alt="Preview" style={{ width: "150px", marginTop: "10px", borderRadius: "5px" }} /> : (prod.photo && <img src={`http://localhost:6002/api/product/photo/${prod._id}`} alt={prod.name} style={imgStyle} />)}
//                 <div style={{ marginTop: "5px" }}>
//                   <button onClick={() => handleUpdateProduct(prod._id)} style={updateBtnStyle}>Update</button>
//                   <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>Cancel</button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 {prod.photo && <img src={`http://localhost:6002/api/product/photo/${prod._id}`} alt={prod.name} style={imgStyle} />}
//                 <span style={{ fontWeight: "bold" }}>{prod.name}</span>
//                 <span>₹{prod.price}</span>
//                 <span>Qty: {prod.quantity}</span>
//                 <span>Category: {prod.category?.name || prod.category}</span>
//                 <div>
//                   <button onClick={() => startEditing(prod)} style={editBtnStyle}>Edit</button>
//                   <button onClick={() => handleDeleteProduct(prod._id)} style={deleteBtnStyle}>Delete</button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Styles
// const inputStyle = { padding: "8px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #555", backgroundColor: "#222", color: "white" };
// const itemStyle = { padding: "10px", margin: "10px 0", backgroundColor: "#222", color: "white", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "5px" };
// const imgStyle = { width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "5px" };
// const editBtnStyle = { padding: "5px 10px", marginRight: "5px", border: "none", borderRadius: "5px", backgroundColor: "#0a84ff", color: "white", cursor: "pointer" };
// const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
// const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
// const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };
// const addBtnStyle = { ...editBtnStyle, backgroundColor: "#0a84ff" };

// export default ProductList;























import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: 0,
    photo: null,
  });
  const [newProductPreview, setNewProductPreview] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [editingPreview, setEditingPreview] = useState(null);

  const API_URL = "http://localhost:6002/api/product";
  const CATEGORY_API = "http://localhost:6002/api/category/get-all";

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch (error) {
      toast.error("❌ Error fetching categories");
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/all`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else toast.error(data.message || "Failed to fetch products");
    } catch (error) {
      toast.error("❌ Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, description, price, category, quantity } = newProduct;
    if (!name || !description || !price || !category || !quantity) {
      toast.error("❌ All fields are required");
      return;
    }
    setAdding(true);
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      const res = await fetch(`${API_URL}/create`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Product added successfully");
        setNewProduct({ name: "", description: "", price: "", category: "", quantity: "", shipping: 0, photo: null });
        setNewProductPreview(null);
        fetchProducts();
      } else {
        toast.error("❌ " + (data.message || "Failed to add product"));
      }
    } catch (error) {
      toast.error("❌ Error adding product");
    } finally {
      setAdding(false);
    }
  };

  // Start editing
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
    });
    setEditingPreview(null);
  };

  // Update product
  const handleUpdateProduct = async (id) => {
    const { name, description, price, category, quantity } = editingData;
    if (!name || !description || !price || !category || !quantity) {
      toast.error("❌ All fields are required");
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(editingData).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      const res = await fetch(`${API_URL}/update/${id}`, { method: "PUT", body: formData });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Product updated successfully");
        setEditingId(null);
        setEditingData({});
        setEditingPreview(null);
        fetchProducts();
      } else {
        toast.error("❌ " + (data.message || "Failed to update product"));
      }
    } catch (error) {
      toast.error("❌ Error updating product");
    }
  };

  // Delete product
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
  if (!products.length) return <p style={{ color: "white" }}>No products found</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#000", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide} />

      <h2 style={{ color: "white" }}>Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={inputStyle} />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={inputStyle} />
        <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={inputStyle} required>
          <option value="">Select Category</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} style={inputStyle} />
        <select value={newProduct.shipping} onChange={(e) => setNewProduct({ ...newProduct, shipping: e.target.value })} style={inputStyle}>
          <option value={0}>No Shipping</option>
          <option value={1}>Shipping Available</option>
        </select>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setNewProduct({ ...newProduct, photo: file });
            setNewProductPreview(file ? URL.createObjectURL(file) : null);
          }}
        />
        {/* Preview below the form in small size */}
        {newProductPreview && <img src={newProductPreview} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "5px", objectFit: "cover" }} />}
        <button type="submit" disabled={adding} style={addBtnStyle}>{adding ? "Adding..." : "Add Product"}</button>
      </form>

      {/* Product List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.map((prod) => (
          <li key={prod._id} style={itemStyle}>
            {editingId === prod._id ? (
              <>
                <input type="text" value={editingData.name} onChange={(e) => setEditingData({ ...editingData, name: e.target.value })} style={inputStyle} placeholder="Name" />
                <input type="text" value={editingData.description} onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} style={inputStyle} placeholder="Description" />
                <input type="number" value={editingData.price} onChange={(e) => setEditingData({ ...editingData, price: e.target.value })} style={inputStyle} placeholder="Price" />
                <select value={editingData.category} onChange={(e) => setEditingData({ ...editingData, category: e.target.value })} style={inputStyle}>
                  {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
                <input type="number" value={editingData.quantity} onChange={(e) => setEditingData({ ...editingData, quantity: e.target.value })} style={inputStyle} placeholder="Quantity" />
                <select value={editingData.shipping} onChange={(e) => setEditingData({ ...editingData, shipping: e.target.value })} style={inputStyle}>
                  <option value={0}>No Shipping</option>
                  <option value={1}>Shipping Available</option>
                </select>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setEditingData({ ...editingData, photo: file });
                    setEditingPreview(file ? URL.createObjectURL(file) : null);
                  }}
                />
                {/* Preview below the form in small size */}
                {editingPreview ? (
                  <img src={editingPreview} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "5px", objectFit: "cover" }} />
                ) : (
                  prod.photo && <img src={`http://localhost:6002/api/product/photo/${prod._id}`} alt={prod.name} style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "5px", objectFit: "cover" }} />
                )}
                <div style={{ marginTop: "5px" }}>
                  <button onClick={() => handleUpdateProduct(prod._id)} style={updateBtnStyle}>Update</button>
                  <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                {prod.photo && <img src={`http://localhost:6002/api/product/photo/${prod._id}`} alt={prod.name} style={{ width: "100px", height: "100px", borderRadius: "5px", objectFit: "cover" }} />}
                <span style={{ fontWeight: "bold" }}>{prod.name}</span>
                <span>₹{prod.price}</span>
                <span>Qty: {prod.quantity}</span>
                <span>Category: {prod.category?.name || prod.category}</span>
                <div>
                  <button onClick={() => startEditing(prod)} style={editBtnStyle}>Edit</button>
                  <button onClick={() => handleDeleteProduct(prod._id)} style={deleteBtnStyle}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const inputStyle = { padding: "8px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #555", backgroundColor: "#222", color: "white" };
const itemStyle = { padding: "10px", margin: "10px 0", backgroundColor: "#222", color: "white", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "5px" };
const editBtnStyle = { padding: "5px 10px", marginRight: "5px", border: "none", borderRadius: "5px", backgroundColor: "#0a84ff", color: "white", cursor: "pointer" };
const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };
const addBtnStyle = { ...editBtnStyle, backgroundColor: "#0a84ff" };

export default ProductList;
