/* ========================================================= */
/* IMPORTS */
/* ========================================================= */

import {

  GITHUB_API,

} from "./constants.ts";

import type {

  GitHubRelease,

  LatestDownloadResponse,

} from "./types.ts";

/* ========================================================= */
/* GET LATEST DOWNLOAD */
/* ========================================================= */

export async function getLatestDownload():

Promise<LatestDownloadResponse> {

  const response = await fetch(

    GITHUB_API,

    {

      headers: {

        Authorization:

          `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,

        Accept:

          "application/vnd.github+json",

      },

    }

  );

 if (!response.ok) {

  const text = await response.text();

  throw new Error(

    `GitHub API Error ${response.status}: ${text}`

  );

}

  const release:

    GitHubRelease =

    await response.json();

  const asset =

    release.assets.find(

      (item) =>

        item.name

          .toLowerCase()

          .endsWith(".exe")

    );

  if (!asset) {

    throw new Error(

      "Executable file not found."

    );

  }

  return {

    version:

      release.tag_name,

    releaseDate:

      release.published_at,

    releaseNotes:

      release.body,

    downloadUrl:

      asset.browser_download_url,

    fileName:

      asset.name,

    fileSize:

      asset.size,

  };

}