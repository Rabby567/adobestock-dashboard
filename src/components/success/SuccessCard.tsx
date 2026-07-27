import {
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function SuccessCard() {

  return (

    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      {/* Success Icon */}

      <div className="flex justify-center">

        <CheckCircleIcon className="h-20 w-20 text-green-500" />

      </div>

      {/* Title */}

      <h1 className="mt-8 text-center text-4xl font-bold text-slate-900">

        Purchase Completed

      </h1>

      {/* Description */}

      <p className="mt-6 text-center text-lg leading-8 text-slate-600">

        Thank you for your purchase!

      </p>

      <p className="mt-4 text-center leading-8 text-slate-600">

        Your license has been generated successfully.

        <br />

        A copy has been sent to your email address.

      </p>

      <p className="mt-8 text-center leading-8 text-slate-600">

        Please check your Inbox to access your

        <br />

        license and installation instructions.

      </p>

      <p className="mt-6 text-center text-sm leading-7 text-slate-500">

        If you don't receive the email within a few minutes,

        please check your Spam or Junk folder.

      </p>

      {/* Footer */}

      <div className="mt-10 border-t border-slate-200 pt-8">

        <p className="text-center text-sm text-slate-500">

          Didn't receive the email?

        </p>

        <button
          className="mx-auto mt-4 block rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
        >

          Contact Support

        </button>

      </div>

    </div>

  );

}