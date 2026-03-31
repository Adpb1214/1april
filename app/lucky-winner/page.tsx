"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LuckyWinnerPage() {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${revealed ? 'bg-orange-600/20' : 'bg-blue-600/20'}`} />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000">
        
        {!revealed ? (
          <>
            {/* Badge */}
            <div className="mb-6 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
              Exclusive Invitation
            </div>

            {/* Profile Image */}
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/20">
                <Image
                  src="/ahaan-panday.png"
                  alt="Ahaan Panday"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              CONGRATULATIONS!
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                YOU ARE SELECTED.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md leading-relaxed">
              Based on your exceptional activity through social media, you have been handpicked for an exclusive 
              <span className="text-white font-semibold"> Meet & Greet </span> 
              session.
            </p>

            {/* The Joke */}
            <div className="mb-10 px-6 py-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
              <p className="text-blue-300 font-medium italic">
                "And yes... it's Ahaan, not Ananya. We know you know!" 😉
              </p>
            </div>

            {/* CTA */}
            <button 
              onClick={() => setRevealed(true)}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl transition hover:scale-105 active:scale-95 shadow-lg overflow-hidden"
            >
              <span className="relative z-10">CLAIM YOUR EXCLUSIVE PASS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Reveal Header */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              JUST KIDDING! 
              <span className="block text-orange-500">😂 PRANKED!</span>
            </h1>

            {/* Video Placeholder */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8 bg-black/40 flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0013 8v4a1 1 0 001.553.894l3-2a1 1 0 000-1.788l-3-2z" />
                </svg>
                <p className="text-sm font-mono uppercase tracking-widest">Video Placeholder</p>
                <p className="text-xs mt-2 text-gray-600">Ahaan laughing video would go here</p>
              </div>
              {/* Optional: You could use a real placeholder video link here */}
              {/* <video autoPlay loop muted className="w-full h-full object-cover">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-laughing-man-in-front-of-a-white-wall-34246-large.mp4" type="video/mp4" />
              </video> */}
            </div>

            <p className="text-gray-300 text-lg mb-8 max-w-sm mx-auto">
              You've just been hit by the ultimate Ahaan Panday surprise! 
              Keep scrolling, keep liking, and maybe next time it'll be real! 😉
            </p>

            <button 
              onClick={() => setRevealed(false)}
              className="text-gray-500 hover:text-white transition-colors underline underline-offset-4 text-sm"
            >
              Go back to selecting me
            </button>
          </div>
        )}

        {/* Footer info */}
        <p className="mt-8 text-gray-500 text-xs uppercase tracking-widest">
          Limited availability • Non-transferable
        </p>
      </div>

      {/* Floating Elements (Visual Polish) */}
      <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/5 rounded-full animate-pulse" />
      <div className="absolute top-20 right-20 w-16 h-16 border border-white/5 rotate-45 animate-bounce" />
    </div>
  );
}
