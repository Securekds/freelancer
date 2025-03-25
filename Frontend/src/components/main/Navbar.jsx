import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [hoverLink, setHoverLink] = useState("");
  const [hoverTrial, setHoverTrial] = useState(false);
    const navigate = useNavigate();


    const handlelogin = () =>{
      navigate('/auth/signin')
    }

  return (
    <div
      style={{
        width: "100%",
        height: "80px",
      
        position: "fixed",
        top: "0",
        background: "linear-gradient(180deg, rgba(16, 12, 41, 0.9) 0%, rgba(8, 5, 20, 0.8) 100%)",
        backdropFilter: "blur(10px)",
        zIndex: "550",
        padding: "0 40px",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "1400px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px",
            cursor: "pointer" 
          }}>
            <div style={{ 
              width: "40px", 
              height: "40px", 
              borderRadius: "10px", 
              background: "linear-gradient(135deg, #9c70ff 0%, #5c34e9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(156, 112, 255, 0.4)"
            }}>
            <img width={50}
            src="/src/assets/images/small-logos/Mylogo.png"
             alt="" srcset="" />
            </div>
            <span style={{ 
              fontSize: "24px", 
              fontWeight: "bold", 
              fontFamily: "AeonikPro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",

              color: "white",
              letterSpacing: "0.5px"
            }}>Khadamat</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "30px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              padding: "10px 30px",
            }}
          >
            {["services", "pricing", "company", "blog"].map((link) => (
              <a 
                key={link}
                href={`#${link}`} 
                style={{ 
                  cursor: "pointer", 
                  color: hoverLink === link ? "#9c70ff" : "#fff",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "AeonikPro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",

                  textDecoration: "none",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={() => setHoverLink(link)}
                onMouseLeave={() => setHoverLink("")}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <a onClick={handlelogin}
            
            style={{ 
              color: hoverLink === "login" ? "#9c70ff" : "white", 
              fontWeight: "500",
              cursor: "pointer",
              textDecoration: "none",
              fontFamily: "AeonikPro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",

              transition: "color 0.2s ease"
            }}
            onMouseEnter={() => setHoverLink("login")}
            onMouseLeave={() => setHoverLink("")}
          >
            Login
          </a>
          <a 
            href="#trial" 
            style={{ 
              background: "linear-gradient(135deg, #9c70ff 0%, #5c34e9 100%)",
              color: "white",
              padding: "10px 24px",
              borderRadius: "999px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "AeonikPro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif",

              textDecoration: "none",
              boxShadow: hoverTrial ? "0 4px 15px rgba(156, 112, 255, 0.4)" : "0 2px 10px rgba(156, 112, 255, 0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              transform: hoverTrial ? "translateY(-2px)" : "translateY(0)"
            }}
            onMouseEnter={() => setHoverTrial(true)}
            onMouseLeave={() => setHoverTrial(false)}
          >
            Start free trial
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;