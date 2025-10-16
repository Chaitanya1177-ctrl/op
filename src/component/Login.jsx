// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:6001/api/auth/login", formData);

//       if (res.data.success) {
//         toast.success(res.data.message, { position: "top-right", autoClose: 3000 });
//         console.log("Logged in user:", res.data.user);

//         // Optional: store user in localStorage for later use
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       } else {
//         toast.error(res.data.message, { position: "top-right", autoClose: 3000 });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Something went wrong", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//         <button type="submit" style={{ marginTop: "1rem" }}>Login</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;










// 2


// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const Login = ({ setCurrentPage }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:6001/api/auth/login", formData);

//       if (res.data.success) {
//         toast.success(res.data.message, { position: "top-right", autoClose: 2000 });

//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         if (res.data.user.role === 1) {
//           setCurrentPage("admin");
//         } else {
//           setCurrentPage("user");
//         }
//       } else {
//         toast.error(res.data.message, { position: "top-right", autoClose: 2000 });
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong", { position: "top-right", autoClose: 2000 });
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
//         />
//         <button
//           type="submit"
//           style={{ padding: "0.7rem", borderRadius: "4px", border: "none", backgroundColor: "#2c3e50", color: "white", fontWeight: "bold", cursor: "pointer" }}
//         >
//           Login
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;














import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:6002/api/auth/login", formData);

      if (res.data.success) {
        toast.success(res.data.message, { position: "top-right", autoClose: 2000 });

        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === 1) {
          setCurrentPage("admin");
        } else {
          setCurrentPage("user");
        }
      } else {
        toast.error(res.data.message, { position: "top-right", autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ padding: "0.7rem", borderRadius: "4px", border: "none", backgroundColor: "#2c3e50", color: "white", fontWeight: "bold", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;











