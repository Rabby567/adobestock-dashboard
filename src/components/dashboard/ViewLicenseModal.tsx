import Modal from "../ui/Modal";

import type { License } from "../../types/license";

/* ========================================================= */
/* PROPS */
/* ========================================================= */

interface ViewLicenseModalProps {

  open: boolean;

  onClose: () => void;

  license: License | null;

}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export default function ViewLicenseModal({

  open,

  onClose,

  license,

}: ViewLicenseModalProps) {

  return (

    <Modal
      open={open}
      title="License Details"
      onClose={onClose}
    >

      {license && (

        <div className="grid grid-cols-2 gap-5">

          <Info
            title="License Key"
            value={license.license_key}
          />

          <Info
            title="Status"
            value={license.status}
          />

          <Info
            title="Customer"
            value={license.customer_name}
          />

          <Info
            title="Email"
            value={license.email}
          />

          <Info
            title="Plan"
            value={license.plan}
          />

          <Info
            title="Expiry"
            value={license.expiry_date}
          />

          <Info
            title="Device"
            value={license.device_id}
          />

          <Info
            title="Notes"
            value={license.notes}
          />

        </div>

      )}

    </Modal>

  );

}

/* ========================================================= */
/* INFO */
/* ========================================================= */

function Info({

  title,

  value,

}: {

  title: string;

  value: string | null;

}) {

  return (

    <div className="rounded-xl bg-slate-50 p-4">

      <div className="text-sm text-slate-500">

        {title}

      </div>

      <div className="mt-2 break-all font-semibold">

        {value ?? "-"}

      </div>

    </div>

  );

}