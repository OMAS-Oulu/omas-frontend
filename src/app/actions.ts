"use server";

import {
  addScoreSum,
  addTeamMemberURL,
  getFileUploadUrl,
} from "@/lib/APIConstants";
import jwt from 'jsonwebtoken';


export async function sendScore(token: string, formData: FormData) {
  const images = formData.getAll("image");

  if (token == null) {
    console.error("No auth header found in request.");
    return 500;
  }
  try {
    const response = await fetch(addScoreSum, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        competitionName: formData.get("competitionName")?.toString(),
        teamName: formData.get("teamName")?.toString(),
        score: formData.get("score"),
        bullsEyeCount: formData.get("bullseyes"),
        requestType: formData.get("requestType"),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    images.forEach((image) => {
      uploadImage(token, image, formData.get("competitionName")?.toString()!);
    });

    return 200;
  } catch (error: any) {
    console.log(error);
    return 500;
  }
}

// upload image
// POST api/file/upload/
// Authorization: required
// Content-Type: multipart/form-data
// Requires competitionId field and file field for the image. Currently only accepts one image at a time.

export async function uploadImage(
  token: string,
  file: FormDataEntryValue,
  competitionId: string
) {
  if (token == null) {
    console.error("No auth header found in request.");
    return 400;
  }
  const formData = new FormData();
  formData.append("competitionId", competitionId);
  formData.append("file", file);

  try {
    const response = await fetch(getFileUploadUrl(), {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return 200;
  } catch (error: any) {
    console.log("Error:", error);
    return 500;
  }
}

export async function joinTeam(
  token: string,
  teamName: string,
  competitionName: string
) {
  const trimmedTeamName = teamName.trim();

  if (token == null) {
    return { message: "Virheellinen käyttäjä", status: 400 };
  }
  try {
    const response = await fetch(addTeamMemberURL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamName: trimmedTeamName, competitionName: competitionName })
    });
    const body = response.statusText;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { body: "Joukkueesen liittyminen onnistui", status: response.status };
  } catch (error: any) {
    console.error(error);
    return { message: "Virhe joukkueeseen liittymisessä", status: 500 };
  }
}



/**
 * Checks if a JWT token is expired without verifying its signature.
 * @param token - The JWT token to check.
 * @returns Returns true if the token is expired, false otherwise.
 */
export async function isJwtExpired(token: string) {
  // If no token is provided, return false (not expired) as to not remove user data that doesnt even exist
  console.log(token);
  if (!token) {
    return false;
  }
  const { exp } = jwt.decode(token, { complete: true })?.payload as jwt.JwtPayload;

  if (!exp) {
      return true; // If exp unable to be parsed, assume expired
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  console.log(exp < currentTime)
  return exp < currentTime;
}