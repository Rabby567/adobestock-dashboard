import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

import type { Customer } from "../../types/customer";

interface CustomerModalProps {
  open: boolean;

  customer?: Customer | null;

  onClose: () => void;

  onSave: (values: {
    name: string;
    email: string;
    status: "active" | "inactive";
    email_verified: boolean;
  }) => Promise<void>;
}

export default function CustomerModal({
  open,
  customer,
  onClose,
  onSave,
}: CustomerModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<
    "active" | "inactive"
  >("active");

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setStatus(customer.status);
      setVerified(customer.email_verified);
    } else {
      setName("");
      setEmail("");
      setStatus("active");
      setVerified(false);
    }
  }, [customer]);

  async function handleSave() {
    await onSave({
      name,
      email,
      status,
      email_verified: verified,
    });
  }

  return (
    <Modal
      open={open}
      title={
        customer
          ? "Edit Customer"
          : "Create Customer"
      }
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-5">

        <Input
          label="Customer Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <Input
          label="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "active"
                  | "inactive"
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Email Verification
          </label>

          <select
            value={
              verified
                ? "verified"
                : "pending"
            }
            onChange={(e) =>
              setVerified(
                e.target.value ===
                  "verified"
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="verified">
              Verified
            </option>

            <option value="pending">
              Pending
            </option>
          </select>

        </div>

      </div>

      <div className="mt-8 flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={handleSave}>
          Save Customer
        </Button>

      </div>

    </Modal>
  );
}