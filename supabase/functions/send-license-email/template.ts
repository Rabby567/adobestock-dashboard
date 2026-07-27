/* ========================================================= */
/* TYPES */
/* ========================================================= */

import type {

  LicenseEmailData,

} from "./types";

/* ========================================================= */
/* LICENSE EMAIL TEMPLATE */
/* ========================================================= */

export function buildLicenseEmail(

  data: LicenseEmailData

): string {

  return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0">

<title>

Adobe Stock Submission Manager

</title>

</head>

<body
style="

margin:0;

padding:40px;

background:#f8fafc;

font-family:Arial,Helvetica,sans-serif;

">

<div
style="

max-width:640px;

margin:auto;

background:#ffffff;

border-radius:16px;

padding:40px;

border:1px solid #e2e8f0;

">

<h1>

Purchase Completed

</h1>

<p>

Hello ${data.customerName},

</p>

<p>

Thank you for purchasing
Adobe Stock Submission Manager.

</p>

<hr>

<p>

License Key

</p>

<strong>

${data.licenseKey}

</strong>

<hr>

<p>

Plan

</p>

<strong>

${data.plan}

</strong>

<hr>

<p>

Issue Date

</p>

<strong>

${data.issueDate}

</strong>

<hr>

<p>

Expiry

</p>

<strong>

${data.expiryDate ?? "Lifetime"}

</strong>

</div>

</body>

</html>

`;

}