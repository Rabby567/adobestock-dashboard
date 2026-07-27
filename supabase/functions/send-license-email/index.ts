/* ========================================================= */
/* IMPORTS */
/* ========================================================= */

import { serve } from "@supabase/functions-js";

import {

  sendLicenseEmail,

} from "./resend.ts";

import type {

  SendLicenseEmailRequest,

  SendLicenseEmailResponse,

} from "./types.ts";

/* ========================================================= */
/* CORS */
/* ========================================================= */

const corsHeaders = {

  "Access-Control-Allow-Origin": "*",

  "Access-Control-Allow-Headers":

    "authorization, x-client-info, apikey, content-type",

};

/* ========================================================= */
/* EDGE FUNCTION */
/* ========================================================= */

serve(async (request) => {

  try {

  // ------------------------------------
// OPTIONS
// ------------------------------------

if (request.method === "OPTIONS") {

  return new Response(

    "ok",

    {

      headers: corsHeaders,

    }

  );

}

// ------------------------------------
// Request Body
// ------------------------------------

const body:

  SendLicenseEmailRequest =

await request.json();

// ------------------------------------
// Send Email
// ------------------------------------

await sendLicenseEmail({

  customerName:

    body.customerName,

  email:

    body.email,

  licenseKey:

    body.licenseKey,

  plan:

    body.plan,

  issueDate:

    body.issueDate,

  expiryDate:

    body.expiryDate,

});

// ------------------------------------
// Success Response
// ------------------------------------

const response:

  SendLicenseEmailResponse = {

  success: true,

  message:

    "Email sent successfully.",

};

  return new Response(

  JSON.stringify(response),

    {

      headers: {

        ...corsHeaders,

        "Content-Type":

          "application/json",

      },

    }

  );

  } catch (error) {

  console.error(error);

  return new Response(

    JSON.stringify({

      success: false,

      message: "Failed to send email.",

    }),

    {

      status: 500,

      headers: {

        ...corsHeaders,

        "Content-Type": "application/json",

      },

    }

  );

}

});