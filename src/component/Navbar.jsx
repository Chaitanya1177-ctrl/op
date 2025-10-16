// import React from "react";

// const Navbar = () => {
//   const navbarStyle = {
//     backgroundColor: "#2c3e50",
//     padding: "1rem 2rem",
//     color: "white",
//   };

//   const containerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   };

//   const logoStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//   };

//   const navLinksStyle = {
//     listStyle: "none",
//     display: "flex",
//     gap: "1.5rem",
//     margin: 0,
//     padding: 0,
//   };

//   const linkStyle = {
//     color: "white",
//     textDecoration: "none",
//     fontWeight: "500",
//   };

//   const linkHoverStyle = {
//     color: "#3498db",
//   };

//   return (
//     <nav style={navbarStyle}>
//       <div style={containerStyle}>
//         <div style={logoStyle}>🛍️ MyStore</div>
//         <ul style={navLinksStyle}>
//           {["Home", "Products", "Cart", "Login"].map((item) => (
//             <li key={item}>
//               <a
//                 href="#"
//                 style={linkStyle}
//                 onMouseEnter={(e) => (e.target.style.color = "#3498db")}
//                 onMouseLeave={(e) => (e.target.style.color = "white")}
//               >
//                 {item}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;















import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: "#0976e3ff",
    padding: "1rem 2rem",
    color: "white",
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const logoStyle = { fontSize: "1.5rem", fontWeight: "bold" };
  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  };
  const linkStyle = { color: "white", textDecoration: "none", fontWeight: "500" };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>🛍️ MySwwwtore</div>
        <ul style={navLinksStyle}>
          <li>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li>
            <Link to="/products" style={linkStyle}>Products</Link>
          </li>
          <li>
            <Link to="/cart" style={linkStyle}>Cart</Link>
          </li>
          <li>
            <Link to="/login" style={linkStyle}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;





// import React from 'react'

// function Navbar() {
//   return (
//     <div>
//       <h2>nabar

//       </h2>
//     </div>
//   )
// }

// export default Navbar
