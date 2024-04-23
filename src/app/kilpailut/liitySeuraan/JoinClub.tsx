"use client";

import { Button } from "@/components/ui/Button";
import { addClubURL, joinClubURL } from "../../../lib/APIConstants";
import axios from "axios";

export default function JoinClub() {
  const addClub = async () => {
    const response = await axios.post(
      addClubURL,
      {
        clubName: "Jannen_seura",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  };

  const joinClub = async () => {
    const response2 = await axios.post(
      joinClubURL,
      {
        clubName: "Jannen_seura",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response2.data);
  };

  return (
    <div>
      <Button variant={"outline"} className="mr-10" onClick={(e) => addClub()}>
        Luo seura
      </Button>
      <Button variant={"outline"} className="mr-10" onClick={(e) => joinClub()}>
        Liity seuraan
      </Button>
    </div>
  );
}
