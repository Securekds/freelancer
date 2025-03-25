import React, { useState } from "react";

const ChatAppSearchBox = () => {
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleToggle = (event) => {
    if (!active) {
      setActive(true);
      event.preventDefault();
    } else {
      setActive(false);
      setSearchValue("");
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div
      className={`search-wrapper ${active ? "active" : ""}`}
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
      }}
    >
      <div
        className="input-holder"
        style={{
          height: "70px",
          width: active ? "450px" : "70px",
          overflow: "hidden",
          background: active ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)",
          borderRadius: active ? "50px" : "6px",
          position: "relative",
          transition: active
            ? "all 0.5s cubic-bezier(0.000, 0.105, 0.035, 1.570)"
            : "all 0.3s ease-in-out",
        }}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Type to search"
          value={searchValue}
          onChange={handleInputChange}
          style={{
            width: "100%",
            height: "50px",
            padding: "0px 70px 0 20px",
            opacity: active ? "1" : "0",
            position: "absolute",
            top: "0px",
            left: "0px",
            background: "transparent",
            boxSizing: "border-box",
            border: "none",
            outline: "none",
            fontFamily: '"Open Sans", Arial, Verdana',
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "20px",
            color: "#FFF",
            transform: active ? "translate(0, 10px)" : "translate(0, 60px)",
            transition: active
              ? "all 0.3s cubic-bezier(0.000, 0.105, 0.035, 1.570) 0.3s"
              : "all 0.3s cubic-bezier(0.000, 0.105, 0.035, 1.570)",
          }}
        />
        <button
          className="search-icon"
          onClick={handleToggle}
          style={{
            width: active ? "50px" : "70px",
            height: active ? "50px" : "70px",
            margin: active ? "10px" : "0px",
            borderRadius: active ? "30px" : "6px",
            background: "#FFF",
            border: "none",
            padding: "0px",
            outline: "none",
            position: "relative",
            zIndex: 2,
            float: "right",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <span
            style={{
              width: "22px",
              height: "22px",
              display: "inline-block",
              verticalAlign: "middle",
              position: "relative",
              transform: active ? "rotate(-45deg)" : "rotate(45deg)",
              transition: "all 0.4s cubic-bezier(0.650, -0.600, 0.240, 1.650)",
            }}
          >
            <span
              style={{
                position: "absolute",
                content: '""',
                width: "4px",
                height: "11px",
                left: "9px",
                top: "18px",
                borderRadius: "2px",
                background: "#FE5F55",
              }}
            />
            <span
              style={{
                position: "absolute",
                content: '""',
                width: "14px",
                height: "14px",
                left: "0px",
                top: "0px",
                borderRadius: "16px",
                border: "4px solid #FE5F55",
              }}
            />
          </span>
        </button>
      </div>
      <span
        className="close"
        onClick={handleToggle}
        style={{
          position: "absolute",
          zIndex: 1,
          top: "24px",
          right: active ? "-50px" : "20px",
          width: "25px",
          height: "25px",
          cursor: "pointer",
          transform: active ? "rotate(45deg)" : "rotate(-180deg)",
          transition: active
            ? "all 0.6s cubic-bezier(0.000, 0.105, 0.035, 1.570) 0.5s"
            : "all 0.3s cubic-bezier(0.285, -0.450, 0.935, 0.110) 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            content: '""',
            background: "#FE5F55",
            borderRadius: "2px",
            width: "5px",
            height: "25px",
            left: "10px",
            top: "0px",
          }}
        />
        <span
          style={{
            position: "absolute",
            content: '""',
            background: "#FE5F55",
            borderRadius: "2px",
            width: "25px",
            height: "5px",
            left: "0px",
            top: "10px",
          }}
        />
      </span>
    </div>
  );
};

export default ChatAppSearchBox;
