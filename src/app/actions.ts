"use server";

import {
  addScoreSum,
  addTeamMemberURL,
  getFileUploadUrl,
} from "@/lib/APIConstants";

/**
 * Send users score to the server
 * @param token 
 * @param formData 
 * @returns returns status code 200 if successful, 400 if no auth header found, 500 if error
 */


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

/**
* upload image
* POST api/file/upload/
* Authorization: required
* Content-Type: multipart/form-data
* Requires competitionId field and file field for the image. Currently only accepts one image at a time.
 * @param token 
 * @param file 
 * @param competitionId 
 * @returns status code 200 if successful, 400 if no auth header found, 500 if error
 */


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

/**
 * Send request to server to join team
 * @param token 
 * @param teamName 
 * @param competitionName 
 * @returns returns status code 200 if successful, 400 if no auth header found, 500 if error
 */

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

    if (!response.ok) {
      return { message: "Virhe joukkueeseen liittymisessä", status: response.status };
    }

    return { body: "Joukkueesen liittyminen onnistui", status: response.status };
  } catch (error: any) {
    console.error(error);
    return { message: "Virhe joukkueeseen liittymisessä: ", status: 500 };
  }
}





/**
 * Checks if the captcha token is valid
 * @param captchaToken 
 * @returns 
 */

export async function captchaValidation(captchaToken: string | null) {
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    return { body: body, status: response.status };
  } catch (error: any) {
    console.error(error);
    throw new Error('Captchan todennus epäonnistui', error);
  }
}