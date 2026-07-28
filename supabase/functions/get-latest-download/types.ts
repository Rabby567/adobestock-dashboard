/* ========================================================= */
/* GITHUB RELEASE ASSET */
/* ========================================================= */

export interface GitHubReleaseAsset {
  id: number;

  name: string;

  browser_download_url: string;

  size: number;

  download_count: number;
}

/* ========================================================= */
/* GITHUB RELEASE */
/* ========================================================= */

export interface GitHubRelease {
  tag_name: string;

  name: string;

  body: string;

  published_at: string;

  assets: GitHubReleaseAsset[];
}

/* ========================================================= */
/* API RESPONSE */
/* ========================================================= */

export interface LatestDownloadResponse {
  version: string;

  releaseDate: string;

  releaseNotes: string;

  downloadUrl: string;

  fileName: string;

  fileSize: number;
}