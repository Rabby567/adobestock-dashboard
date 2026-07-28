/* ========================================================= */
/* TYPES */
/* ========================================================= */

export interface LatestDownload {

  version: string;

  releaseDate: string;

  releaseNotes: string;

  downloadUrl: string;

  fileName: string;

  fileSize: number;

}

/* ========================================================= */
/* GET LATEST DOWNLOAD */
/* ========================================================= */

export async function getLatestDownload():

Promise<LatestDownload> {

  const response = await fetch(

    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-latest-download`,

    {

      method: "GET",

      headers: {

        Authorization:

          `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,

        "Content-Type":

          "application/json",

      },

    }

  );

  const result =

    await response.json();

  if (

    !response.ok ||

    !result.success

  ) {

    throw new Error(

      result.message ??

      "Failed to load latest download."

    );

  }

  return result.data;

}