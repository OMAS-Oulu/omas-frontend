"use client";

import Input from "@/components/ui/Input";
import { getCompetitionsQueryUrl } from "../../lib/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const competitions = await axios.get(getCompetitionsQueryUrl(search, 0), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCompetitions(competitions.data.content);
    }
    fetchData();
  }, [search]);

  const openTeam = (competition: CompetitionResponse) => {
    const competitionId = competition.competitionId;
    router.push("/kilpailut/" + competitionId);
  };

  return (
    <div className="flex flex-col py-5">
      <Input
        id={"search"}
        placeholder={"Hae"}
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        required={false}
      />
      {competitions &&
        competitions.map((competition, index) => (
          <div
            key={index}
            className="flex cursor-pointer sm:flex-row flex-col items-baseline border my-1 p-2 sm:pl-10"
            onClick={() => openTeam(competition)}
          >
            <p>{competition.displayName}</p>
            <p className="sm:ml-auto sm:mr-5 text-slate-700">
              {competition.startDate + " - " + competition.endDate}
            </p>
          </div>
        ))}
    </div>
  );
}
