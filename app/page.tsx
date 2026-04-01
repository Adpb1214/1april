"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  // Hover states for buttons
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isProceedHovered, setIsProceedHovered] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.error("Audio play blocked", e));
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleNextStep = () => {
    startMusic();
    setStep(1);
  };

  const handleProceed = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stopMusic(); // Stop music so the video sound plays clearly
    setStep(2);
    // Try to play the video once the step changes
    setTimeout(() => {
      if (videoRef.current) {
        // We set to full volume and play
        videoRef.current.volume = 1;
        videoRef.current.play().catch((err) => console.error("Error playing video:", err));
      }
    }, 100);
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const animations = `
    @keyframes inlineFadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes inlineSlideUp {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    @keyframes btnPulse {
      0%, 100% { box-shadow: 0 0 15px rgba(255,255,255,0.2); }
      50% { box-shadow: 0 0 35px rgba(255,255,255,0.6); }
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #000;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .responsive-padding {
      padding: clamp(1.5rem, 5vw, 3rem);
    }
    .responsive-form-padding {
      padding: clamp(1.5rem, 4vw, 3rem);
    }
  `;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      alignItems: 'center', justifyContent: 'center', backgroundColor: '#000',
      color: '#fafafa', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative'
    }}>
      <style dangerouslySetInnerHTML={{ __html: animations }} />

      {/* Background audio: loops globally unless stopped */}
      <audio ref={audioRef} src="/background.mp3" loop />

      {/* Step 0: Landing Page (Premium Text-Only Layout) */}
      {step === 0 && (
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'inlineFadeIn 1s ease-out forwards', backgroundColor: '#000', overflow: 'hidden' }}>

          {/* Subtle background flair */}
          <div style={{ position: 'absolute', top: '10%', right: '10%', width: 'clamp(200px, 50vw, 400px)', height: 'clamp(200px, 50vw, 400px)', backgroundColor: 'rgba(147, 51, 234, 0.1)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 'clamp(200px, 50vw, 400px)', height: 'clamp(200px, 50vw, 400px)', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />

          {/* Centered Invitation Content securely separated from everything */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', flex: '0 0 auto', textAlign: 'center', zIndex: 10 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800, color: '#fcd34d', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              🎉 Congratulations, Tanushree!
            </h2>

            <p style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#e4e4e7', lineHeight: 1.5, marginBottom: '0.5rem', fontWeight: 300 }}>
              You’re one of the selected fans invited to
            </p>

            <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: 900, marginBottom: '2.5rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', color: 'transparent', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Meet Ahaan Panday
            </h1>

            <button
              onClick={handleNextStep}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              style={{
                padding: 'clamp(0.8rem, 3vw, 1.2rem) clamp(2rem, 5vw, 3rem)', backgroundColor: isBtnHovered ? '#fff' : 'rgba(255,255,255,0.9)',
                color: '#000', fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.25rem)', borderRadius: '50px',
                border: 'none', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: 'btnPulse 2s infinite', transform: isBtnHovered ? 'scale(1.05) translateY(-5px)' : 'scale(1)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
              }}
            >
              Click here for next steps
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Details form */}
      {step === 1 && (
        <div className="responsive-padding" style={{ position: 'relative', zIndex: 10, display: 'flex', width: '100%', maxWidth: '900px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: '0 auto', minHeight: '100vh', boxSizing: 'border-box' }}>
          {/* Subtle background flair */}
          <div style={{ position: 'absolute', top: '10%', left: '10%', width: 'clamp(200px, 50vw, 400px)', height: 'clamp(200px, 50vw, 400px)', backgroundColor: 'rgba(147, 51, 234, 0.15)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1 }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 'clamp(200px, 50vw, 400px)', height: 'clamp(200px, 50vw, 400px)', backgroundColor: 'rgba(37, 99, 235, 0.15)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '700px', animation: 'inlineFadeIn 0.8s ease-out forwards' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 'clamp(1rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>Congratulations!</h2>
            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: '#e4e4e7', lineHeight: 1.6, marginBottom: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>
              Based on your Instagram and Facebook activity you are choosen to be one of the{" "}
              <span style={{ fontWeight: 'bold', color: '#c084fc' }}>25 lucky fan</span> to Meet with{" "}
              <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>Ahaan Panday</span> on his tour of Kolkata in may 2026 proccede to fill your details.
            </p>

            {!showForm ? (
              <button
                onClick={handleProceed}
                onMouseEnter={() => setIsProceedHovered(true)}
                onMouseLeave={() => setIsProceedHovered(false)}
                style={{
                  padding: 'clamp(1rem, 3vw, 1.2rem) clamp(2rem, 5vw, 3rem)', background: isProceedHovered ? 'linear-gradient(to right, #a855f7, #3b82f6)' : 'linear-gradient(to right, #9333ea, #2563eb)',
                  color: 'white', fontWeight: 'bold', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', borderRadius: '50px', border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s', boxShadow: '0 20px 25px -5px rgba(168, 85, 247, 0.3)', transform: isProceedHovered ? 'translateY(-4px) scale(1.02)' : 'none'
                }}
              >
                Proceed
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="responsive-form-padding" style={{
                width: '100%', backgroundColor: 'rgba(20, 20, 22, 0.95)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)', animation: 'inlineSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards', textAlign: 'left', boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 1.8rem)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 500, color: '#a1a1aa', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                    <input required type="text" placeholder="Enter your name" style={{
                      width: '100%', backgroundColor: '#09090b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '1rem',
                      color: 'white', outline: 'none', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', transition: 'all 0.2s', boxSizing: 'border-box'
                    }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 500, color: '#a1a1aa', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                    <input required type="email" placeholder="Enter your email" style={{
                      width: '100%', backgroundColor: '#09090b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '1rem',
                      color: 'white', outline: 'none', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', transition: 'all 0.2s', boxSizing: 'border-box'
                    }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 500, color: '#a1a1aa', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address in Kolkata</label>
                    <textarea required rows={2} placeholder="Enter your full address" style={{
                      width: '100%', backgroundColor: '#09090b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '1rem',
                      color: 'white', outline: 'none', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', resize: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
                    }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 500, color: '#a1a1aa', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Food Preference</label>
                    <select required style={{
                      width: '100%', backgroundColor: '#09090b', border: '1px solid #3f3f46', borderRadius: '12px', padding: '1rem',
                      color: 'white', outline: 'none', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', transition: 'all 0.2s', boxSizing: 'border-box', appearance: 'none'
                    }}>
                      <option value="">Select your preference</option>
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    onMouseEnter={() => setIsSubmitHovered(true)}
                    onMouseLeave={() => setIsSubmitHovered(false)}
                    style={{
                      width: '100%', marginTop: '0.5rem', padding: '1.2rem', backgroundColor: isSubmitHovered ? '#fff' : '#f4f4f5',
                      color: '#000', fontWeight: 'bold', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', borderRadius: '12px', border: 'none', cursor: 'pointer',
                      transition: 'all 0.3s', transform: isSubmitHovered ? 'translateY(-2px)' : 'none'
                    }}
                  >
                    Submit Details
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Full screen video prank */}
      {step === 2 && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          {/* Beautiful Loader Element */}
          {videoLoading && !videoEnded && (
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 60, animation: 'inlineFadeIn 0.5s ease-out' }}>
              <div style={{
                width: '60px', height: '60px', border: '4px solid rgba(255,255,255,0.1)',
                borderTopColor: '#c084fc', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '2rem'
              }} />
              <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: '#d4d4d8', animation: 'glowPulse 2s ease-in-out infinite', textAlign: 'center', letterSpacing: '0.05em' }}>
                Preparing your exclusive experience...
              </p>
            </div>
          )}

          {/* Show full screen video. Once it ends, completely hide this video element. */}
          {!videoEnded && (
            <video
              ref={videoRef}
              style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'contain', backgroundColor: '#000', opacity: videoLoading ? 0 : 1, transition: 'opacity 0.8s ease-out' }}
              controls={false}
              playsInline
              onPlaying={() => setVideoLoading(false)}
              onEnded={handleVideoEnded}
            >
              <source src="https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/419a7155-9c96-44c0-932e-0ccf771d9fb1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Reveal text ONLY visible after video ends */}
          {videoEnded && (
            <div className="responsive-padding" style={{ animation: 'inlineSlideUp 0.8s ease-out forwards', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box', width: '100%' }}>
              <h2 style={{
                fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 900, marginBottom: '2rem', color: '#ef4444', textTransform: 'uppercase',
                textShadow: '0 4px 30px rgba(239,68,68,0.5)', lineHeight: 1.1
              }}>
                boom it's april fool
              </h2>
              <h3 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 'bold', fontStyle: 'italic', color: '#f472b6', marginBottom: '1rem', lineHeight: 1.2 }}>
                sorry beauti-fool
              </h3>
              <p style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', fontWeight: 300, color: '#a1a1aa', marginBottom: '2rem' }}>
                for making you april-fool 🤡
              </p>
              <p style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)', fontWeight: 500, color: '#eab308', opacity: 0.9, backgroundColor: 'rgba(234, 179, 8, 0.1)', padding: '1rem 2rem', borderRadius: '50px', border: '1px solid rgba(234, 179, 8, 0.3)', animation: 'btnPulse 3s infinite' }}>
                you're not meeting with Ahaan now but you can Meet me.. hehe 🤭
              </p>
              
              <div style={{ 
                marginTop: '1.5rem', 
                backgroundColor: 'rgba(244, 114, 182, 0.08)', 
                padding: '1.5rem 2rem', 
                borderRadius: '24px', 
                border: '1px solid rgba(244, 114, 182, 0.2)',
                boxShadow: '0 10px 30px rgba(244, 114, 182, 0.05)',
                maxWidth: '90%',
                animation: 'inlineFadeIn 1.5s ease-out forwards'
              }}>
                <span style={{ display: 'block', fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#fbcfe8', marginBottom: '0.5rem', lineHeight: 1.5, textShadow: '0 2px 10px rgba(244,114,182,0.3)' }}>
                  Oyee kabhi kabhi hass liya kar, teri glowing smile bohot precious hai aur tujhpe best suited hai... 🤭
                </span>
                <span style={{ display: 'block', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', color: '#a1a1aa', fontStyle: 'italic', opacity: 0.8, marginTop: '0.5rem' }}>
                  (not sorry for the prank though 😜)
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
