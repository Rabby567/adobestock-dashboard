import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getLatestDownload,
  type LatestDownload,
} from "../../services/downloadService";

export default function Navbar() {

  const [download, setDownload] =
  useState<LatestDownload | null>(null);

useEffect(() => {
  async function load() {
    try {
      const result = await getLatestDownload();
      setDownload(result);
    } catch (error) {
      console.error(error);
    }
  }

  load();
}, []);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            A
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Adobe Stock
            </h1>

            <p className="text-xs text-slate-500">
              Submission Manager
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-8 lg:flex">

          <a href="#home" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Home
          </a>

          <a href="#features" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Features
          </a>

          <a href="#screenshots" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Screenshots
          </a>

          <a href="#download" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Download
          </a>

          <a href="#faq" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            FAQ
          </a>

          <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Contact
          </a>

        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">

        
          <button
  onClick={() => {
    if (download) {
      window.location.href =
        download.downloadUrl;
    }
  }}
  disabled={!download}
  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {download ? "Download" : "Loading..."}
</button>

        </div>

      </div>
    </header>
  );
}