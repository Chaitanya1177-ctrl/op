
























// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newCategory, setNewCategory] = useState("");
//   const [adding, setAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editingName, setEditingName] = useState("");

//   // Fetch all categories
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:6002/api/category/get-all");
//       const data = await res.json();
//       if (data.success) setCategories(data.categories);
//       else toast.error(data.message || "Failed to fetch categories");
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Error fetching categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Add new category
//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!newCategory.trim()) return;

//     setAdding(true);
//     try {
//       const res = await fetch("http://localhost:6002/api/category/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: newCategory }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setNewCategory("");
//         fetchCategories();
//         toast.success("✅ Category added successfully!");
//       } else {
//         toast.error("❌ " + (data.message || "Failed to add category"));
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//       toast.error("❌ Error adding category");
//     } finally {
//       setAdding(false);
//     }
//   };

//   // Start editing a category
//   const startEditing = (id, name) => {
//     setEditingId(id);
//     setEditingName(name);
//   };

//   // Update category
//   const handleUpdateCategory = async (id) => {
//     if (!editingName.trim()) return;
//     try {
//       const res = await fetch(`http://localhost:6002/api/category/update/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: editingName }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setEditingId(null);
//         setEditingName("");
//         fetchCategories();
//         toast.success("✅ Category updated successfully!");
//       } else {
//         toast.error("❌ " + (data.message || "Failed to update category"));
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       toast.error("❌ Error updating category");
//     }
//   };

//   // Delete category
//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) return;
//     try {
//       const res = await fetch(`http://localhost:6002/api/category/delete/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         fetchCategories();
//         toast.success("✅ Category deleted successfully!");
//       } else {
//         toast.error("❌ " + (data.message || "Failed to delete category"));
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       toast.error("❌ Error deleting category");
//     }
//   };

//   if (loading) return <p style={{ color: "white" }}>Loading categories...</p>;
//   if (!categories.length) return <p style={{ color: "white" }}>No categories found</p>;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#000", minHeight: "100vh" }}>
//       {/* Toast container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}          // Toast disappears after 3 seconds
//         hideProgressBar={false}   // Show progress bar
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"              // Dark theme looks popup-like
//       />

//       <h2 style={{ color: "white" }}>Categories</h2>

//       {/* Add Category Form */}
//       <form onSubmit={handleAddCategory} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           placeholder="New category name"
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             border: "1px solid #555",
//             marginRight: "10px",
//             width: "250px",
//             backgroundColor: "#222",
//             color: "white",
//           }}
//         />
//         <button
//           type="submit"
//           disabled={adding}
//           style={{
//             padding: "10px 15px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: "#0a84ff",
//             color: "white",
//             cursor: "pointer",
//           }}
//         >
//           {adding ? "Adding..." : "Add Category"}
//         </button>
//       </form>

//       {/* Category List */}
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {categories.map((cat) => (
//           <li
//             key={cat._id}
//             style={{
//               padding: "10px",
//               margin: "5px 0",
//               backgroundColor: "#222",
//               color: "white",
//               borderRadius: "5px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             {editingId === cat._id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editingName}
//                   onChange={(e) => setEditingName(e.target.value)}
//                   style={{
//                     padding: "5px",
//                     borderRadius: "5px",
//                     border: "1px solid #555",
//                     backgroundColor: "#111",
//                     color: "white",
//                   }}
//                 />
//                 <button onClick={() => handleUpdateCategory(cat._id)} style={updateBtnStyle}>
//                   Update
//                 </button>
//                 <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span>{cat.name}</span>
//                 <div>
//                   <button onClick={() => startEditing(cat._id, cat.name)} style={editBtnStyle}>
//                     Edit
//                   </button>
//                   <button onClick={() => handleDeleteCategory(cat._id)} style={deleteBtnStyle}>
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Button styles
// const editBtnStyle = {
//   padding: "5px 10px",
//   borderRadius: "5px",
//   border: "none",
//   backgroundColor: "#0a84ff",
//   color: "white",
//   cursor: "pointer",
//   marginRight: "5px",
// };
// const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
// const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
// const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };

// export default CategoryList;
















import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:6002/api/category/get-all");
      const data = await res.json();
      if (data.success) setCategories(data.categories);
      else toast.error(data.message || "Failed to fetch categories");
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("http://localhost:6002/api/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await res.json();
      if (data.success) {
        setNewCategory("");
        fetchCategories();
        toast.success("✅ Category added successfully!");
      } else {
        toast.error("❌ " + (data.message || "Failed to add category"));
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("❌ Error adding category");
    } finally {
      setAdding(false);
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdateCategory = async (id) => {
    if (!editingName.trim()) return;
    try {
      const res = await fetch(`http://localhost:6002/api/category/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        setEditingName("");
        fetchCategories();
        toast.success("✅ Category updated successfully!");
      } else {
        toast.error("❌ " + (data.message || "Failed to update category"));
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("❌ Error updating category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`http://localhost:6002/api/category/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
        toast.success("✅ Category deleted successfully!");
      } else {
        toast.error("❌ " + (data.message || "Failed to delete category"));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("❌ Error deleting category");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading categories...</p>;
  if (!categories.length) return <p style={{ color: "white" }}>No categories found</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#000", minHeight: "100vh" }}>
      {/* Toast container with animation */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide} // animation added
      />

      <h2 style={{ color: "white" }}>Categories</h2>

      <form onSubmit={handleAddCategory} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #555",
            marginRight: "10px",
            width: "250px",
            backgroundColor: "#222",
            color: "white",
          }}
        />
        <button
          type="submit"
          disabled={adding}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#0a84ff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {adding ? "Adding..." : "Add Category"}
        </button>
      </form>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {categories.map((cat) => (
          <li
            key={cat._id}
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor: "#222",
              color: "white",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {editingId === cat._id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #555",
                    backgroundColor: "#111",
                    color: "white",
                  }}
                />
                <button onClick={() => handleUpdateCategory(cat._id)} style={updateBtnStyle}>
                  Update
                </button>
                <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <div>
                  <button onClick={() => startEditing(cat._id, cat.name)} style={editBtnStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(cat._id)} style={deleteBtnStyle}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const editBtnStyle = {
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#0a84ff",
  color: "white",
  cursor: "pointer",
  marginRight: "5px",
};
const deleteBtnStyle = { ...editBtnStyle, backgroundColor: "#ff4d4d" };
const updateBtnStyle = { ...editBtnStyle, backgroundColor: "#0aff84" };
const cancelBtnStyle = { ...editBtnStyle, backgroundColor: "#888" };

export default CategoryList;






