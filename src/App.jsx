









// 55
import React, { useState, useEffect } from "react";
import Product from "./pages/Product";
import Register from "./component/Register";
import Login from "./component/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);

  // ✅ Check login status when app loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.role === 1) {
        setCurrentPage("admin");
      } else {
        setCurrentPage("home");
      }
    }
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCurrentPage("login");
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#2c3e50",
    color: "white",
    position: "sticky",
    top: 0,
  };

  const logoStyle = { fontSize: "1.5rem", fontWeight: "bold" };
  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  };
  const linkStyle = (active) => ({
    color: active ? "#f39c12" : "white",
    textDecoration: "none",
    fontWeight: "500",
    cursor: "pointer",
  });

  // ✅ Render different navbar options based on login status
  const renderNavbarLinks = () => {
    if (!user) {
      // Not logged in
      return (
        <>
          <li>
            <span
              style={linkStyle(currentPage === "login")}
              onClick={() => setCurrentPage("login")}
            >
              Login
            </span>
          </li>
          <li>
            <span
              style={linkStyle(currentPage === "register")}
              onClick={() => setCurrentPage("register")}
            >
              Register
            </span>
          </li>
        </>
      );
    }

    if (user.role === 1) {
      // Admin
      return (
        <>
          <li>
            <span
              style={linkStyle(currentPage === "admin")}
              onClick={() => setCurrentPage("admin")}
            >
              Admin Dashboard
            </span>
          </li>
          <li>
            <span style={linkStyle(false)} onClick={handleLogout}>
              Logout
            </span>
          </li>
        </>
      );
    }

    // Normal user
    return (
      <>
        <li>
          <span
            style={linkStyle(currentPage === "home")}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </span>
        </li>
        <li>
          <span
            style={linkStyle(currentPage === "user")}
            onClick={() => setCurrentPage("user")}
          >
            User Dashboard
          </span>
        </li>
        <li>
          <span style={linkStyle(false)} onClick={handleLogout}>
            Logout
          </span>
        </li>
      </>
    );
  };

  // ✅ Render the correct page
  const renderPage = () => {
    if (!user) {
      if (currentPage === "register") return <Register />;
      return <Login setCurrentPage={setCurrentPage} setUser={setUser} />;
    }

    if (user.role === 1) return <AdminDashboard />;

    switch (currentPage) {
      case "home":
        return <Home />;
      case "user":
        return <UserDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <nav style={navbarStyle}>
        <div style={logoStyle}>🛍️ My1sStore</div>
        <ul style={navLinksStyle}>{renderNavbarLinks()}</ul>
      </nav>

      <div>{renderPage()}</div>
    </div>
  );
}

export default App;













// // src/App.js
// import React, { useState, useEffect } from "react";
// import Product from "./pages/Product";
// import Register from "./component/Register";
// import Login from "./component/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import UserDashboard from "./pages/UserDashboard";
// import Home from "./pages/Home";
// import CartPage from "./pages/Cart"; // ✅ Add this

// function App() {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       if (storedUser.role === 1) {
//         setCurrentPage("admin");
//       } else {
//         setCurrentPage("home");
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setCurrentPage("login");
//   };

//   const navbarStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "1rem 2rem",
//     backgroundColor: "#2c3e50",
//     color: "white",
//     position: "sticky",
//     top: 0,
//   };

//   const navLinksStyle = {
//     listStyle: "none",
//     display: "flex",
//     gap: "1.5rem",
//     margin: 0,
//     padding: 0,
//   };

//   const linkStyle = (active) => ({
//     color: active ? "#f39c12" : "white",
//     cursor: "pointer",
//     textDecoration: "none",
//   });

//   const renderNavbarLinks = () => {
//     if (!user) {
//       return (
//         <>
//           <li>
//             <span style={linkStyle(currentPage === "login")} onClick={() => setCurrentPage("login")}>Login</span>
//           </li>
//           <li>
//             <span style={linkStyle(currentPage === "register")} onClick={() => setCurrentPage("register")}>Register</span>
//           </li>
//         </>
//       );
//     }

//     if (user.role === 1) {
//       return (
//         <>
//           <li>
//             <span style={linkStyle(currentPage === "admin")} onClick={() => setCurrentPage("admin")}>Admin Dashboard</span>
//           </li>
//           <li><span style={linkStyle(false)} onClick={handleLogout}>Logout</span></li>
//         </>
//       );
//     }

//     return (
//       <>
//         <li>
//           <span style={linkStyle(currentPage === "home")} onClick={() => setCurrentPage("home")}>Home</span>
//         </li>
//         <li>
//           <span style={linkStyle(currentPage === "cart")} onClick={() => setCurrentPage("cart")}>Cart ({cart.length})</span>
//         </li>
//         <li>
//           <span style={linkStyle(currentPage === "user")} onClick={() => setCurrentPage("user")}>User Dashboard</span>
//         </li>
//         <li><span style={linkStyle(false)} onClick={handleLogout}>Logout</span></li>
//       </>
//     );
//   };

//   const renderPage = () => {
//     if (!user) {
//       if (currentPage === "register") return <Register />;
//       return <Login setCurrentPage={setCurrentPage} setUser={setUser} />;
//     }

//     if (user.role === 1) return <AdminDashboard />;

//     switch (currentPage) {
//       case "home":
//         return <Home cart={cart} setCart={setCart} />;
//       case "cart":
//         return <CartPage cart={cart} setCart={setCart} setCurrentPage={setCurrentPage} />;
//       case "user":
//         return <UserDashboard />;
//       default:
//         return <Home cart={cart} setCart={setCart} />;
//     }
//   };

//   return (
//     <div>
//       <nav style={navbarStyle}>
//         <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🛍️ My1sStore</div>
//         <ul style={navLinksStyle}>{renderNavbarLinks()}</ul>
//       </nav>
//       <div>{renderPage()}</div>
//     </div>
//   );
// }

// export default App;
