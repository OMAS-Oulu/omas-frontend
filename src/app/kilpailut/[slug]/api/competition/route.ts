import axios from "axios";
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
      const response = await axios.get(Q.getUserCompetitions(), {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
      return NextResponse.json({body: response.data, status: response.status});
    } catch (error: any) {
      console.error(error);
        return NextResponse.json({ message: error.response!.data, status: error.status });
    }
  }