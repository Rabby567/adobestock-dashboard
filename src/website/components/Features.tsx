import {
  FolderIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";


export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-32"
    >
      <div className="mx-auto max-w-[1700px] px-10">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <p className="font-semibold uppercase tracking-[0.25em] text-blue-600">
            Powerful Features
          </p>

          <h2 className="mt-4 text-6xl font-black text-slate-900">
            Everything You Need
            <br />
            To Manage Adobe Stock
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-600">
            Designed to simplify your submission workflow from validation
            to final package generation with speed, security and accuracy.
          </p>

        </div>

        {/* Feature 01 */}

<div className="mt-32 grid items-center gap-20 lg:grid-cols-2">

  {/* Left */}

  <div>

    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

      📋

    </div>

    <h3 className="text-5xl font-black leading-tight text-slate-900">
      Smart Metadata Validation
    </h3>

    <p className="mt-6 text-xl leading-9 text-slate-600">
      Instantly detect missing titles, keywords, categories,
      releases and submission issues before uploading to
      Adobe Stock.
    </p>

    <div className="mt-10 space-y-5">

      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
        <span className="text-lg text-slate-700">
          Missing Metadata Detection
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
        <span className="text-lg text-slate-700">
          AI Error Suggestions
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
        <span className="text-lg text-slate-700">
          Batch Validation
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
        <span className="text-lg text-slate-700">
          Instant Validation Report
        </span>
      </div>

    </div>

    <button
      className="
        mt-12
        rounded-xl
        bg-blue-600
        px-8
        py-4
        text-white
        font-semibold
        transition
        hover:bg-blue-700
      "
    >
      Learn More
    </button>

  </div>

  {/* Right */}

  <div>

    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        shadow-2xl
        hover:-translate-y-2
hover:shadow-[0_40px_80px_rgba(0,0,0,.18)]
transition-all
duration-500
      "
    >

      <img
        src="/dashboard-preview.png"
        alt="Metadata Validation"
        className="w-full"
      />

    </div>

  </div>

</div>


{/* Feature 02 */}

<div className="mt-40 grid items-center gap-20 lg:grid-cols-2">

  {/* Left Screenshot */}

  <div>

    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_40px_80px_rgba(15,23,42,.18)]
      "
    >
      <img
        src="/dashboard-preview.png"
        alt="Batch Processing"
        className="w-full"
      />
    </div>

  </div>

  {/* Right Content */}

  <div>

    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100">

      <FolderIcon className="h-8 w-8 text-yellow-600" />

    </div>

    <h3 className="text-5xl font-black leading-tight text-slate-900">
      Batch Processing
    </h3>

    <p className="mt-6 text-xl leading-9 text-slate-600">
      Scan, validate and organize hundreds of Adobe Stock
      templates in a single workflow without repetitive tasks.
    </p>

    <div className="mt-10 space-y-5">

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Multi-folder Support
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Smart Processing Queue
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Automatic Organization
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          High Speed Batch Scan
        </span>
      </div>

    </div>

    <button
      className="
        mt-12
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-slate-900
        px-8
        py-4
        font-semibold
        text-white
        transition
        hover:bg-slate-800
      "
    >
      Explore Feature →

    </button>

  </div>

</div>

{/* Feature 03 */}

<div className="mt-40 grid items-center gap-20 lg:grid-cols-2">

  {/* Left */}

  <div>

    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">

      <ShieldCheckIcon className="h-8 w-8 text-green-600" />

    </div>

    <h3 className="text-5xl font-black leading-tight text-slate-900">
      Secure License Protection
    </h3>

    <p className="mt-6 text-xl leading-9 text-slate-600">
      Protect your software with secure online activation,
      device binding and automatic license verification.
    </p>

    <div className="mt-10 space-y-5">

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Online License Verification
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Device Binding Protection
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Secure Activation
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Automatic Status Check
        </span>
      </div>

    </div>

    <button
      className="
        mt-12
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-green-600
        px-8
        py-4
        font-semibold
        text-white
        transition
        hover:bg-green-700
      "
    >
      Explore Feature →
    </button>

  </div>

  {/* Right */}

  <div>

    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_40px_80px_rgba(15,23,42,.18)]
      "
    >

      <img
        src="/license-preview.png"
        alt="License Protection"
        className="w-full"
      />

    </div>

  </div>

</div>

{/* Feature 04 */}

<div className="mt-40 grid items-center gap-20 lg:grid-cols-2">

  {/* Left Screenshot */}

  <div>

    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_40px_80px_rgba(15,23,42,.18)]
      "
    >
      <img
        src="/export-preview.png"
        alt="Export Workflow"
        className="w-full"
      />
    </div>

  </div>

  {/* Right */}

  <div>

    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">

      <ArrowDownTrayIcon className="h-8 w-8 text-purple-600" />

    </div>

    <h3 className="text-5xl font-black leading-tight text-slate-900">
      One Click Export
    </h3>

    <p className="mt-6 text-xl leading-9 text-slate-600">
      Generate Excel reports, ZIP packages and submission-ready
      files with a single click.
    </p>

    <div className="mt-10 space-y-5">

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Excel Export
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          ZIP Package Generator
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Ready For Adobe Stock
        </span>
      </div>

      <div className="flex items-center gap-4">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg text-slate-700">
          Export Progress Tracking
        </span>
      </div>

    </div>

    <button
      className="
        mt-12
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-purple-600
        px-8
        py-4
        font-semibold
        text-white
        transition
        hover:bg-purple-700
      "
    >
      Explore Feature →
    </button>

  </div>

</div>



      </div>
    </section>
  );
}