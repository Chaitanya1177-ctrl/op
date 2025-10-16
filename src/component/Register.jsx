




import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6002/api/auth/register", formData);
      if (res.data.success) {
        toast.success(res.data.message, { position: "top-right", autoClose: 3000 });
        setFormData({ name: "", email: "", password: "", phone: "", address: "" });
      } else {
        toast.error(res.data.message, { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: "1rem" }}>Register</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;








// import React from "react";

// const Register = () => (
//   <h2 style={{textAlign:"center", padding:"2rem"}}>🧾 Register Page</h2>
// );

// export default Register;
