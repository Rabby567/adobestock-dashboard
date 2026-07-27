import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How do I activate my license?",
    answer:
      "After purchasing, you will receive a license key by email. Open the application, enter your license key and activate it online.",
  },
  {
    question: "Can I transfer my license to another device?",
    answer:
      "Yes. You can deactivate your current device and activate the license on a new device from the License Manager.",
  },
  {
    question: "Does the application work offline?",
    answer:
      "Yes. After successful activation, the application can continue working offline. Periodic license verification may be required.",
  },
  {
    question: "How do I update the application?",
    answer:
      "Download the latest version from the website. Your existing license will continue to work with future updates.",
  },
  {
    question: "Which operating systems are supported?",
    answer:
      "Currently the application supports Windows 10 and Windows 11 (64-bit).",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-slate-50 py-32"
    >
      <div className="mx-auto max-w-5xl px-10">

        <div className="text-center">

          <p className="font-semibold uppercase tracking-[0.25em] text-blue-600">
            Frequently Asked Questions
          </p>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            Everything You Need To Know
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Find answers to the most common questions about licensing,
            updates and installation.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {

            const isOpen = openIndex === index;

            return (

              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between p-7 text-left"
                >

                  <span className="text-xl font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <MinusIcon className="h-6 w-6 text-blue-600" />
                  ) : (
                    <PlusIcon className="h-6 w-6 text-slate-500" />
                  )}

                </button>

                {isOpen && (

                  <div className="border-t border-slate-200 px-7 py-6">

                    <p className="text-lg leading-8 text-slate-600">
                      {faq.answer}
                    </p>

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}