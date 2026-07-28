/* ========================================================= */
/* IMPORTS */
/* ========================================================= */

import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

import {
  getLatestDownload,
  type LatestDownload,
} from "../../services/downloadService";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

interface SuccessState {

  success: boolean;

  message: string;

  customerName: string;

  email: string;

  plan: string;

  licenseKey: string;

  issueDate: string;

  expiryDate: string | null;

}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export default function SuccessCard() {

  const { state } = useLocation();

  const data = state as SuccessState;

  /* ========================================================= */
  /* STATES */
  /* ========================================================= */

  const [download, setDownload] =
    useState<LatestDownload | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [copied, setCopied] =
    useState(false);

  /* ========================================================= */
  /* LOAD DOWNLOAD */
  /* ========================================================= */

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

  /* ========================================================= */
  /* INVALID ACCESS */
  /* ========================================================= */

  if (!data) {

    return (

      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow">

        <h2 className="text-3xl font-bold text-slate-900">

          Invalid Access

        </h2>

        <p className="mt-4 text-slate-600">

          No license information was found.

          Please complete your checkout first.

        </p>

      </div>

    );

  }


  /* ========================================================= */
  /* COPY LICENSE */
  /* ========================================================= */

  async function copyLicense() {

    if (!data?.licenseKey) return;

    await navigator.clipboard.writeText(
      data.licenseKey
    );

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }

  /* ========================================================= */
  /* DOWNLOAD */
  /* ========================================================= */

  function downloadSoftware() {

    if (!download) return;

    window.location.href =
      download.downloadUrl;

  }

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (

    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

      {/* ========================================================= */}
      {/* SUCCESS */}
      {/* ========================================================= */}

      <div className="flex justify-center">

        <CheckCircleIcon className="h-20 w-20 text-green-500" />

      </div>

      <h1 className="mt-8 text-center text-4xl font-black text-slate-900">

        Purchase Completed

      </h1>

      <p className="mt-4 text-center text-slate-600">

        Your license has been generated successfully.

      </p>

      {/* ========================================================= */}
      {/* LICENSE */}
      {/* ========================================================= */}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <h2 className="mb-6 text-xl font-bold text-slate-900">

          License Information

        </h2>

        <div className="space-y-5">

          <div className="flex justify-between gap-8">

            <span className="font-medium text-slate-500">

              Customer

            </span>

            <span className="font-semibold text-slate-900">

              {data.customerName}

            </span>

          </div>

          <div className="flex justify-between gap-8">

            <span className="font-medium text-slate-500">

              Email

            </span>

            <span className="font-semibold text-slate-900">

              {data.email}

            </span>

          </div>

          <div className="flex justify-between gap-8">

            <span className="font-medium text-slate-500">

              Plan

            </span>

            <span className="font-semibold text-slate-900">

              {data.plan}

            </span>

          </div>

          <div className="flex justify-between gap-8">

            <span className="font-medium text-slate-500">

              Issue Date

            </span>

            <span className="font-semibold text-slate-900">

              {new Date(
                data.issueDate
              ).toLocaleDateString("en-GB")}

            </span>

          </div>

          <div>

            <p className="mb-3 font-medium text-slate-500">

              License Key

            </p>

            <div className="rounded-xl bg-slate-900 p-5">

              <p className="break-all font-mono text-lg font-bold tracking-widest text-green-400">

                {data.licenseKey}

              </p>

            </div>

            <button
              onClick={copyLicense}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:border-blue-600 hover:text-blue-600"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />

              {copied
                ? "Copied"
                : "Copy License"}
            </button>

          </div>

        </div>

      </div>

            {/* ========================================================= */}
      {/* DOWNLOAD */}
      {/* ========================================================= */}

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">

        <h2 className="text-xl font-bold text-slate-900">

          Download Software

        </h2>

        <p className="mt-2 text-slate-600">

          Your software is ready to download.

        </p>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between">

            <span className="text-slate-500">

              Latest Version

            </span>

            <span className="font-semibold text-slate-900">

              {loading
                ? "Loading..."
                : download?.version}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-500">

              File Size

            </span>

            <span className="font-semibold text-slate-900">

              {loading
                ? "Loading..."
                : `${(
                    (download?.fileSize ?? 0) /
                    1024 /
                    1024
                  ).toFixed(1)} MB`}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-500">

              Platform

            </span>

            <span className="font-semibold text-slate-900">

              Windows x64

            </span>

          </div>

        </div>

        <button

          onClick={downloadSoftware}

          disabled={!download}

          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-blue-600
            px-6
            py-4
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "

        >

          <ArrowDownTrayIcon className="h-6 w-6" />

          {loading

            ? "Loading..."

            : "Download Software"}

        </button>

      </div>

      {/* ========================================================= */}
      {/* WARNING */}
      {/* ========================================================= */}

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">

        <p className="font-semibold text-amber-900">

          Important

        </p>

        <p className="mt-2 text-sm leading-7 text-amber-800">

          Save your license key in a safe place.

          You will need this key to activate

          Adobe Stock Submission Manager.

        </p>

      </div>

      {/* ========================================================= */}
      {/* EMAIL NOTICE */}
      {/* ========================================================= */}

      <div className="mt-8 border-t border-slate-200 pt-8">

        <p className="text-center text-sm text-slate-500">

          Email delivery is currently unavailable while the

          production domain is being configured.

        </p>

        <p className="mt-3 text-center text-sm text-slate-500">

          You can activate your software immediately using

          the license key shown above.

        </p>

      </div>

    </div>

  );

}