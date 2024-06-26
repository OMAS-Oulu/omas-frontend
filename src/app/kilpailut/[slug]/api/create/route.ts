import { addTeamToCompetitionURL } from "@/lib/APIConstants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const trimmedTeamName = requestBody.teamName.trim();
    if (trimmedTeamName === "") {
      return NextResponse.json({ message: "Joukkueen nimi ei voi olla tyhjä" }, { status: 400 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axios.post(
          addTeamToCompetitionURL,
          { teamName: trimmedTeamName, competitionName: requestBody.competitionName },
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        return NextResponse.json({body: response.data, status: response.status });
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ message: error.response.data.message}, { status: 500 })
    }
  };