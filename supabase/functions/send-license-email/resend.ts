/* ========================================================= */
/* RESEND */
/* ========================================================= */

import { Resend } from "resend";

import {

  buildLicenseEmail,

} from "./template.ts";

import type {

  LicenseEmailData,

} from "./types.ts";

/* ========================================================= */
/* RESEND CLIENT */
/* ========================================================= */

const resend = new Resend(

  Deno.env.get("RESEND_API_KEY")

);

/* ========================================================= */
/* SEND LICENSE EMAIL */
/* ========================================================= */

export async function sendLicenseEmail(

  data: LicenseEmailData

) {

  const { error } = await resend.emails.send({

    from:

      "Adobe Stock Submission Manager <onboarding@resend.dev>",

    to:

      data.email,

    subject:

      "Your License is Ready",

    html:

      buildLicenseEmail(data),

  });

  if (error) {

    throw error;

  }

}