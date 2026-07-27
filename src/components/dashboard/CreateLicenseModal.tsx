import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

type LicensePlan =
  | "lifetime"
  | "1_year"
  | "6_months"
  | "3_months";

interface CreateLicenseModalProps {
  open: boolean;
  customer: string;
  email: string;
  notes: string;
  plan: LicensePlan;

  onClose: () => void;
  onSave: () => void;

  setCustomer: (value: string) => void;
  setEmail: (value: string) => void;
  setNotes: (value: string) => void;
  setPlan: (value: LicensePlan) => void;
}

export default function CreateLicenseModal({
  open,
  customer,
  email,
  notes,
  plan,
  onClose,
  onSave,
  setCustomer,
  setEmail,
  setNotes,
  setPlan,
}: CreateLicenseModalProps) {
  return (
    <Modal
      open={open}
      title="Create License"
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Customer Name"
          placeholder="John Smith"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <Input
          label="Email"
          placeholder="john@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            License Plan
          </label>

          <select
            value={plan}
            onChange={(e) =>
              setPlan(e.target.value as LicensePlan)
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              outline-none
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          >
            <option value="lifetime">Lifetime</option>
            <option value="1_year">1 Year</option>
            <option value="6_months">6 Months</option>
            <option value="3_months">3 Months</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write notes..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={onSave}>
          Save License
        </Button>
      </div>
    </Modal>
  );
}