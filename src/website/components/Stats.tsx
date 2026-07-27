import {
  FolderIcon,
  CheckBadgeIcon,
  CpuChipIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    icon: FolderIcon,
    value: "500K+",
    title: "Files Processed",
  },
  {
    icon: CheckBadgeIcon,
    value: "99.9%",
    title: "Validation Accuracy",
  },
  {
    icon: CpuChipIcon,
    value: "AI",
    title: "Smart Review",
  },
  {
    icon: CloudIcon,
    value: "24/7",
    title: "License Verification",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-[1700px] px-10">

        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-[0.2em]">
            Trusted Performance
          </p>

          <h2 className="mt-3 text-5xl font-black text-slate-900">
            Built for Professional Adobe Stock Contributors
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Designed to simplify your submission workflow with
            powerful automation, validation and license protection.
          </p>

        </div>

        <div className="mt-16 grid grid-cols-4 gap-8">

          {stats.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-10
                  shadow-sm
                  transition
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">

                  <Icon className="h-8 w-8 text-blue-600" />

                </div>

                <h3 className="mt-8 text-5xl font-black text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-3 text-lg text-slate-500">
                  {item.title}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}