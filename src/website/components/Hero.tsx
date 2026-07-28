import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { BoltIcon } from "@heroicons/react/24/solid";
import { CpuChipIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import {
  getLatestDownload,
  type LatestDownload,
} from "../../services/downloadService";

export default function Hero() {

  const [download, setDownload] =
  useState<LatestDownload | null>(null);

const [loading, setLoading] =
  useState(true);

useEffect(() => {
  async function load() {
    try {
      const result =
        await getLatestDownload();

      setDownload(result);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  load();

}, []);


  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-white
        pt-36
        pb-24
      "
    >
      {/* Background Decoration */}

      <div className="absolute inset-0 -z-10">

        {/* Top Right Blur */}

        <div
          className="
            absolute
            right-[-250px]
            top-[-200px]
            h-[650px]
            w-[650px]
            rounded-full
            bg-blue-100
            blur-3xl
            opacity-60
          "
        />

        {/* Left Blur */}

        <div
          className="
            absolute
            left-[-220px]
            top-[250px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-sky-100
            blur-3xl
            opacity-60
          "
        />

        {/* Circle */}

        <div
          className="
            absolute
            left-1/2
            top-72
            h-[900px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            border
            border-slate-200
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-80
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            border
            border-slate-200
          "
        />

      </div>

      {/* Container */}

      <div className="mx-auto max-w-[1700px] px-10">

        {/* Badge */}

        <div className="flex justify-center">

          <div
            className="
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-5
              py-2
              text-sm
              font-medium
              text-blue-700
            "
          >
            Professional Desktop Software
          </div>

        </div>

        {/* Heading */}

        <div className="mx-auto mt-8 max-w-5xl text-center">

          <h1
            className="
              text-7xl
              font-black
              leading-tight
              tracking-tight
              text-slate-900
            "
          >
            Adobe Stock Submission Manager
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-xl
              leading-9
              text-slate-600
            "
          >
            Professional desktop application built for Adobe Stock
            contributors. Validate metadata, organize assets, manage
            submissions and accelerate your workflow.
          </p>

          {download && (
  <p className="mt-5 text-sm text-slate-500">
    Current Version:
    <span className="ml-2 font-semibold text-blue-600">
      {download.version}
    </span>
  </p>
)}

        </div>


{/* CTA */}

<div className="mt-10 flex flex-wrap items-center justify-center gap-4">

  <button
  onClick={() => {
    if (download) {
      window.location.href =
        download.downloadUrl;
    }
  }}
  disabled={!download}
  className="
    rounded-xl
    bg-blue-600
    px-8
    py-4
    text-base
    font-semibold
    text-white
    shadow-lg
    shadow-blue-200
    transition
    hover:-translate-y-1
    hover:bg-blue-700
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {loading
    ? "Loading..."
    : "Download Latest Version"}
</button>

  <button
    className="
      rounded-xl
      border
      border-slate-300
      bg-white
      px-8
      py-4
      text-base
      font-semibold
      text-slate-700
      transition
      hover:bg-slate-100
    "
  >
    View User Guide
  </button>

</div>


{/* Feature Pills */}

<div className="mt-10 flex flex-wrap justify-center gap-3">

  {[
    "Windows x64",
    "License Protected",
    "Batch Workflow",
    "Auto Updates",
  ].map((item) => (

    <div
      key={item}
      className="
        rounded-full
        border
        border-slate-200
        bg-white
        px-5
        py-2
        text-sm
        font-medium
        text-slate-700
        shadow-sm
      "
    >
      ✓ {item}
    </div>

  ))}

</div>

{/* App Preview */}

<div className="mx-auto mt-24 max-w-[1650px]">

  <div
    className="
      relative
      overflow-visible
      rounded-[28px]
      border
      border-slate-200
      bg-white
      shadow-2xl
    "
  >

    <img
      src="/app-preview.png"
      alt="Adobe Stock Submission Manager"
      className="w-full"
    />

{/* Floating Card - License */}

<div
  className="
    absolute
    -left-20
    top-14
    hidden
    w-64
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-2xl
    lg:block
  "
>
  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
      <ShieldCheckIcon className="h-8 w-8 text-green-600" />
    </div>

    <div>

      <p className="text-sm text-slate-500">
        License
      </p>

      <h3 className="text-2xl font-bold text-slate-900">
        Protected
      </h3>

    </div>

  </div>

</div>

{/* Floating Card - Auto Update */}

<div
  className="
    absolute
    -right-20
    bottom-20
    hidden
    w-64
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-2xl
    lg:block
  "
>
  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
      <ArrowPathIcon className="h-8 w-8 text-blue-600" />
    </div>

    <div>

      <p className="text-sm text-slate-500">
        Update
      </p>

      <h3 className="text-2xl font-bold text-slate-900">
        Automatic
      </h3>

    </div>

  </div>

</div>

{/* Floating Card - Batch */}

<div
  className="
    absolute
    left-12
    bottom-16
    hidden
    w-64
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-2xl
    lg:block
  "
>
  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
      <BoltIcon className="h-8 w-8 text-yellow-600" />
    </div>

    <div>

      <p className="text-sm text-slate-500">
        Performance
      </p>

      <h3 className="text-2xl font-bold text-slate-900">
        Batch Processing
      </h3>

    </div>

  </div>
</div>

{/* Floating Card - AI */}

<div
  className="
    absolute
    right-20
    top-14
    hidden
    w-64
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-2xl
    lg:block
  "
>
  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
      <CpuChipIcon className="h-8 w-8 text-purple-600" />
    </div>

    <div>

      <p className="text-sm text-slate-500">
        Smart Review
      </p>

      <h3 className="text-2xl font-bold text-slate-900">
        AI Powered
      </h3>

    </div>

  </div>
</div>



  </div>

</div>



      </div>


<div className="mt-16 flex justify-center">

  <div className="flex flex-col items-center">

    <span className="mb-3 text-sm text-slate-400">
      Scroll to explore
    </span>

    <div
      className="
        h-10
        w-6
        rounded-full
        border
        border-slate-300
        p-1
      "
    >
      <div
        className="
          h-2
          w-2
          rounded-full
          bg-blue-600
          animate-bounce
        "
      />
    </div>

  </div>

</div>

    </section>





  );
}