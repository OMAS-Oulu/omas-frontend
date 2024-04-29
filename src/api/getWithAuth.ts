import { getUserCompetitions } from "@/lib/APIConstants";

export default async function fetchData(
  url: string,
  token: string
): Promise<any> {
  try {
    const response = await fetch(getUserCompetitions(), {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error:", error);
    throw Error("Virhe haettaessa tietoja palvelimelta");
  }
}
