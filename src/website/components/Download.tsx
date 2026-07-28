import {
  ArrowDownTrayIcon,
  ComputerDesktopIcon,
  CalendarDaysIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import {

  getLatestDownload,

  type LatestDownload,

} from "../../services/downloadService";

export default function Download() {



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
      id="download"
      className="bg-slate-900 py-32"
    >
      <div className="mx-auto max-w-[1700px] px-10">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300">
              Latest Release
            </span>

            <h2 className="mt-6 text-6xl font-black leading-tight text-white">
              Download The
              <br />
              Latest Version
            </h2>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">
              Get the latest release of Adobe Stock Submission Manager
              with performance improvements, bug fixes and the newest
              features.
            </p>

           <button

  onClick={() => {

    if (download) {

      window.location.href =

        download.downloadUrl;

    }

  }}

  className="
  mt-12
  inline-flex
  items-center
  gap-3
  rounded-2xl
  bg-blue-600
  px-8
  py-5
  text-lg
  font-semibold
  text-white
  transition
  hover:bg-blue-700
"
>

  <ArrowDownTrayIcon className="h-6 w-6" />

  {

    loading

      ? "Loading..."

      : "Download Latest Version"

  }

</button>

          </div>

          {/* Right */}

          <div className="rounded-[32px] border border-slate-700 bg-slate-800 p-10">

            <div className="space-y-8">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <ComputerDesktopIcon className="h-8 w-8 text-blue-400" />

                  <div>

                    <p className="text-slate-400">
                      Platform
                    </p>

                    <h3 className="text-xl font-bold text-white">
                      Windows x64
                    </h3>

                  </div>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <CircleStackIcon className="h-8 w-8 text-green-400" />

                <div>

                  <p className="text-slate-400">
                    Current Version
                  </p>

                  <h3 className="text-xl font-bold text-white">
                    {

  loading

    ? "Loading..."

    : download?.version

}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <CalendarDaysIcon className="h-8 w-8 text-orange-400" />

                <div>

                  <p className="text-slate-400">
                    Release Date
                  </p>

                  <h3 className="text-xl font-bold text-white">
                    {

  loading || !download
  ? "Loading..."
  : new Date(download.releaseDate).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    )

}
                  </h3>

                </div>

              </div>


            <div className="flex items-center gap-4">

  <CircleStackIcon className="h-8 w-8 text-cyan-400" />

  <div>

    <p className="text-slate-400">

      File Size

    </p>

    <h3 className="text-xl font-bold text-white">

      {

        loading

          ? "Loading..."

          : `${(

              download!.fileSize /

              1024 /

              1024

            ).toFixed(1)} MB`

      }

    </h3>

  </div>

</div>
             


              <div className="rounded-2xl bg-slate-900 p-6">

                <h4 className="mb-5 text-lg font-bold text-white">
                  System Requirements
                </h4>

                <ul className="space-y-3 text-slate-300">

                  <li>• Windows 10 / 11</li>

                  <li>• 64-bit Operating System</li>

                  <li>• 4 GB RAM Minimum</li>

                  <li>• Internet Connection</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}