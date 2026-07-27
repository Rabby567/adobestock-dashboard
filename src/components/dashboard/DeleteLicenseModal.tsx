import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface DeleteLicenseModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export default function DeleteLicenseModal({
  open,
  onClose,
  onDelete,
}: DeleteLicenseModalProps) {
  return (
    <Modal
      open={open}
      title="Delete License"
      onClose={onClose}
    >
      <p className="text-slate-600">
        Are you sure you want to delete this license?
      </p>

      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}