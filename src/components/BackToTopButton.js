import { Avatar } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const BackToTopButton = () => {
  const [backToTop, setBackToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {backToTop && (
        <Avatar
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            height: "50px",
            width: "50px",
            zIndex: 1,
            cursor: "pointer",
            color: "#000",
            backgroundColor: "#D9D9D9",
          }}
          onClick={scrollToTop}
        >
          <ArrowDropUpIcon fontSize="large" />
        </Avatar>
      )}
    </>
  );
};

export default BackToTopButton;
