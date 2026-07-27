/* ========================================================= */
/* LICENSE EMAIL DATA */
/* ========================================================= */

export interface LicenseEmailData {

  customerName: string;

  email: string;

  licenseKey: string;

  plan: string;

  issueDate: string;

  expiryDate: string | null;

}

/* ========================================================= */
/* EMAIL REQUEST */
/* ========================================================= */

export interface SendLicenseEmailRequest {

  customerName: string;

  email: string;

  licenseKey: string;

  plan: string;

  issueDate: string;

  expiryDate: string | null;

}

/* ========================================================= */
/* EMAIL RESPONSE */
/* ========================================================= */

export interface SendLicenseEmailResponse {

  success: boolean;

  message: string;

}