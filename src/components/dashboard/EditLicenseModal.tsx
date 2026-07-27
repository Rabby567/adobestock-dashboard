import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

import type { License } from "../../types/license";

interface EditLicenseModalProps {
  open: boolean;
  license: License | null;

  onClose: () => void;
  onSave: () => Promise<void>;

  setLicense: React.Dispatch<
    React.SetStateAction<License | null>
  >;
}

export default function EditLicenseModal({
  open,
  license,
  onClose,
  onSave,
  setLicense,
}: EditLicenseModalProps) {
  return (
    <Modal
      open={open}
      title="Edit License"
      onClose={onClose}
    >
      {license && (
        <div className="space-y-5">

          <Input
            label="Customer Name"
            value={license.customer}
            onChange={(e) =>
              setLicense({
                ...license,
                customer: e.target.value,
              })
            }
          />

          <Input
            label="Email"
            value={license.email}
            onChange={(e) =>
              setLicense({
                ...license,
                email: e.target.value,
              })
            }
          />

          <div>
            <label className="block mb-2 text-sm font-semibold">
              License Plan
            </label>

            <select
              value={license.plan}
              onChange={(e) =>
                setLicense({
                  ...license,
                  plan: e.target.value as License["plan"],
                })
              }
              className="
                w-full
                h-11
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
            <label className="block mb-2 text-sm font-semibold">
              Notes
            </label>

            <textarea
              rows={4}
              value={license.notes ?? ""}
              onChange={(e) =>
                setLicense({
                  ...license,
                  notes: e.target.value,
                })
              }
              placeholder="Write notes..."
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                resize-none
                outline-none
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />
          </div>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button onClick={onSave}>
              Save Changes
            </Button>

          </div>

        </div>
      )}
    </Modal>
  );
}