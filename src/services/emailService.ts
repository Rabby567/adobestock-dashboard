/* ========================================================= */
/* TYPES */
/* ========================================================= */

export interface SendEmailData {

  customerName: string;

  email: string;

  licenseKey: string;

  plan: string;

  issueDate: string;

  expiryDate: string | null;

}

/* ========================================================= */
/* SEND LICENSE EMAIL */
/* ========================================================= */

export async function sendLicenseEmail(

  data: SendEmailData

) {

  const response = await fetch(

    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-license-email`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization:
          `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,

        apikey:
          import.meta.env.VITE_SUPABASE_ANON_KEY,

      },

      body: JSON.stringify(data),

    }

  );

  console.log(
    "Email Function Status:",
    response.status
  );

  const result =
    await response.json();

  console.log(
    "Email Function Response:",
    result
  );

  if (!response.ok) {

    throw new Error(

      result.message ??

      "Failed to send email."

    );

  }

  return result;

}