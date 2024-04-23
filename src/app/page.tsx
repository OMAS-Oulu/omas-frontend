"use client";

import React, { useEffect, useState } from "react";
import { CompetitionResponse } from "@/types/commonTypes";
import useUserInfo from "@/lib/hooks/get-user.info";
import {
  getActiveCompetitions,
  getActiveTeams,
  getUpcomingCompetitions,
} from "@/lib/APIConstants";
import get from "@/api/get";
import JoinClubTip from "./components/JoinClubTip";
import UpcomingCompetitions from "./components/UpcomingCompetitions";
import CurrentCompetitions from "./components/CurrentCompetitions";

export type competitionListProps = {
  competitions: CompetitionResponse[];
};

export default function Home() {
  const { token } = useUserInfo();
  const tokenString = token ? token : "";

  const [futureCompetitions, setFutureCompetitions] = useState<
    CompetitionResponse[]
  >([]);
  const [currentOwnCompetitions, setCurrentOwnCompetitions] = useState<
    CompetitionResponse[]
  >([]);

  async function getUpcoming() {
    try {
      const response = await get(getUpcomingCompetitions(0, 5));
      if (response.content) {
        setFutureCompetitions(response.content);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwnCompetitions() {
    try {
      const response = await get(getActiveCompetitions(0, 50));
      if (response.content) {
        const ownCompetitionsData = response.content;
        let currentCompetitions: CompetitionResponse[] = [];
        let ownCompetitionIds: string[] = [];

        const response2 = await get(getActiveTeams());
        if (response2.content) {
          const ownCompetitionIdsData = response2.content;
          if (ownCompetitionIdsData) {
            ownCompetitionIdsData.forEach(
              (competition: CompetitionResponse) => {
                ownCompetitionIds.push(competition.competitionId);
              }
            );
          }
        }

        if (ownCompetitionsData) {
          ownCompetitionsData.forEach((competition: CompetitionResponse) => {
            if (!ownCompetitionIds.includes(competition.competitionId)) return;
            const competitionStartDate = new Date(competition.startDate);
            const competitionEndDate = new Date(competition.endDate);
            const currentDate = new Date();

            if (
              competitionStartDate < currentDate &&
              competitionEndDate > currentDate
            ) {
              currentCompetitions.push(competition);
            }
          });
        }
        currentCompetitions.sort((a, b) => {
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
        setCurrentOwnCompetitions(currentCompetitions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUpcoming();
    if (token) {
      getOwnCompetitions();
    }
  }, [token]);

  return (
    <main className="min-h-screen p-8">
      <JoinClubTip />
      <UpcomingCompetitions competitions={futureCompetitions} />
      <CurrentCompetitions competitions={currentOwnCompetitions} />
    </main>
  );
}
