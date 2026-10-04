import React from "react";

const Test = () => {
  return (
    <div class="relative flex min-h-screen items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-700 p-6">
      {/* <!-- Decorative background shapes to showcase the glass transparency --> */}
      <div class="absolute top-1/4 left-1/4 h-56 w-56 rounded-full bg-pink-500 blur-3xl opacity-40 mix-blend-multiply animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan-400 blur-3xl opacity-30 mix-blend-multiply animate-pulse"></div>

      {/* <!-- The Glassmorphism Card --> */}
      <div class="relative w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg transition-transform duration-300 hover:scale-[1.02]">
        {/* <!-- Card Content --> */}
        <span class="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
          Tailwind CSS v4
        </span>

        <h2 class="mt-4 text-3xl font-bold text-white tracking-tight">
          Glassmorphism
        </h2>

        <p class="mt-2 text-sm text-purple-100/80 leading-relaxed">
          A modern user interface design trend that pairs subtle background
          blurring with light-reflecting glass borders to create a layered sense
          of depth.
        </p>

        {/* <!-- Interactive Glass Button --> */}
        <div class="mt-6">
          <button class="w-full rounded-xl bg-white/20 px-4 py-3 text-center text-sm font-semibold text-white shadow-md border border-white/10 transition-all duration-200 hover:bg-white/30 active:scale-98">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
