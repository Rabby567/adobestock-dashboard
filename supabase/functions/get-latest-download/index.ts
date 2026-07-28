/* ========================================================= */
/* IMPORTS */
/* ========================================================= */

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

import {

  getLatestDownload,

} from "./github.ts";

/* ========================================================= */
/* CORS */
/* ========================================================= */

const corsHeaders = {

  "Access-Control-Allow-Origin": "*",

  "Access-Control-Allow-Headers":

    "authorization, x-client-info, apikey, content-type",

  "Access-Control-Allow-Methods":

    "GET, OPTIONS",

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
    // ONLY GET
    // ------------------------------------

    if (request.method !== "GET") {

      return new Response(

        JSON.stringify({

          success: false,

          message: "Method not allowed.",

        }),

        {

          status: 405,

          headers: {

            ...corsHeaders,

            "Content-Type":

              "application/json",

          },

        }

      );

    }

    // ------------------------------------
    // FETCH RELEASE
    // ------------------------------------

    const download =

      await getLatestDownload();

    // ------------------------------------
    // SUCCESS
    // ------------------------------------

    return new Response(

      JSON.stringify({

        success: true,

        data: download,

      }),

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

        message:

          error instanceof Error

            ? error.message

            : "Unknown error.",

      }),

      {

        status: 500,

        headers: {

          ...corsHeaders,

          "Content-Type":

            "application/json",

        },

      }

    );

  }

});