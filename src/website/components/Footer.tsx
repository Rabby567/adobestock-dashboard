import {
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="mx-auto max-w-[1700px] px-10 py-20">

        <div className="grid gap-16 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
                A
              </div>

              <div>

                <h3 className="text-2xl font-bold text-white">
                  Adobe Stock
                </h3>

                <p className="text-sm text-slate-400">
                  Submission Manager
                </p>

              </div>

            </div>

            <p className="max-w-sm leading-8 text-slate-400">
              Professional desktop application built for Adobe Stock
              contributors to manage templates, validate metadata,
              export submissions and protect licenses.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h4>

            <ul className="space-y-4">

              <li><a href="#features" className="hover:text-white">Features</a></li>

              <li><a href="#screenshots" className="hover:text-white">Screenshots</a></li>

              <li><a href="#download" className="hover:text-white">Download</a></li>

              <li><a href="#faq" className="hover:text-white">FAQ</a></li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Resources
            </h4>

            <ul className="space-y-4">

              <li>User Guide</li>

              <li>Release Notes</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Contact
            </h4>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <EnvelopeIcon className="h-5 w-5 text-blue-400" />

                <span>
                  support@example.com
                </span>

              </div>

              <div className="flex items-center gap-3">

                <GlobeAltIcon className="h-5 w-5 text-blue-400" />

                <span>
                  www.example.com
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 lg:flex-row">

            <p>
              © 2026 Adobe Stock Submission Manager.
              All Rights Reserved.
            </p>

            <p>
              Version 1.1.2
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}