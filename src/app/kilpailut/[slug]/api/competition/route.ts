import { NextRequest, NextResponse } from "next/server";
import * as Q from "@/lib/APIConstants";

//getting users teams

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error("No auth header found in request.");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(Q.getUserCompetitions(), {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    return NextResponse.json({body: body, status: response.status});
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, status: error.status });
  }
}