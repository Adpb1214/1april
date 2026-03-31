"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LuckyWinnerPage() {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const styles = {
    container: {
      minHeight: "100-screen",
      backgroundColor: "#020202",
      color: "white",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    },
    backgroundGlow1: {
      position: "fixed",
      top: "0",
      left: "25%",
      width: "500px",
      height: "500px",
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      borderRadius: "50%",
      filter: "blur(120px)",
      zIndex: 0,
    },
    backgroundGlow2: {
      position: "fixed",
      bottom: "0",
      right: "25%",
      width: "600px",
      height: "600px",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      borderRadius: "50%",
      filter: "blur(150px)",
      zIndex: 0,
    },
    card: {
      position: "relative",
      zIndex: 10,
      width: "100%",
      maxWidth: "600px",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "32px",
      padding: "56px 48px",
      textAlign: "center",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    },
    badge: {
      display: "inline-block",
      marginBottom: "32px",
      padding: "6px 16px",
      borderRadius: "100px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      fontSize: "10px",
      fontWeight: "bold",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#a855f7",
    },
    imageContainer: {
      position: "relative",
      width: "180px",
      height: "180px",
      margin: "0 auto 40px",
      padding: "6px",
      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(37, 99, 235, 0.5))",
      borderRadius: "50%",
    },
    imageInner: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      overflow: "hidden",
      border: "4px solid #000",
      position: "relative",
    },
    heading: {
      fontSize: "48px",
      fontWeight: "900",
      marginBottom: "24px",
      lineHeight: "1.1",
      letterSpacing: "-0.04em",
    },
    subheading: {
      fontSize: "18px",
      color: "#9ca3af",
      marginBottom: "40px",
      fontWeight: "300",
      lineHeight: "1.6",
    },
    jokeBox: {
      padding: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      border: "1px dashed rgba(255, 255, 255, 0.1)",
      marginBottom: "40px",
      fontSize: "12px",
      color: "#60a5fa",
      fontStyle: "italic",
    },
    button: {
      padding: "20px 40px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "16px",
      fontSize: "14px",
      fontWeight: "900",
      letterSpacing: "0.1em",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    revealHeading: {
      fontSize: "56px",
      fontWeight: "900",
      background: "linear-gradient(to right, #fb923c, #f43f5e)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "16px",
    },
    videoPlaceholder: {
      width: "100%",
      aspectRatio: "16/9",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255, 255, 255, 0.2)",
      marginBottom: "32px",
    }
  };

  return (
    <div style={styles.container as any}>
      <div style={styles.backgroundGlow1} />
      <div style={styles.backgroundGlow2} />

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            style={styles.card as any}
          >
            <div style={styles.badge}>Golden Ticket • Exclusive Access</div>
            
            <div style={styles.imageContainer}>
              <div style={styles.imageInner}>
                <Image
                  src="/ahaan-panday.png"
                  alt="Ahaan Panday"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            <h1 style={styles.heading}>
              YOU HAVE BEEN <br />
              <span style={{ color: "#d1d5db", fontStyle: "italic" }}>CHOSEN.</span>
            </h1>

            <p style={styles.subheading}>
              Based on your social media activity, you've earned a private 
              <span style={{ color: "white", fontWeight: "bold" }}> Meet & Greet </span> 
              with Ahaan Panday.
            </p>

            <div style={styles.jokeBox}>
              YES, IT'S AHAAN (NOT ANANYA) 😉
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRevealed(true)}
              style={styles.button}
            >
              CLAIM YOUR SPOT NOW
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.card as any}
          >
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>😂</div>
            <h2 style={styles.revealHeading}>OOPS! PRANKED!</h2>
            <p style={{ color: "#9ca3af", marginBottom: "32px" }}>
              Gotcha! No meet and greet today, but you're now part of the Ahaan Panday inner circle (kinda).
            </p>

            <div style={styles.videoPlaceholder as any}>
              <div style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Video Placeholder
              </div>
              <div style={{ fontSize: "10px", marginTop: "8px", opacity: 0.5 }}>
                Ahaan reacting to this prank
              </div>
            </div>

            <button
              onClick={() => setRevealed(false)}
              style={{ background: "none", border: "none", color: "#4b5563", textDecoration: "underline", cursor: "pointer", fontSize: "12px" }}
            >
              Try again for real?
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
