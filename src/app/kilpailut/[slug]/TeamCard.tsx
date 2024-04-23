"use client";

import { Button } from "@/components/ui/Button";
import React, { Suspense, useEffect } from "react";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import {TTeam,} from "@/types/commonTypes";
import useUserInfo from "@/lib/hooks/get-user.info";
import { addTeamMemberURL } from "@/lib/APIConstants";

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

export default function TeamCard({ team, memberOf, setIsMember, isPartOfClub }: { team: TTeam , memberOf: string | null, setIsMember: (teamName: string) => void, isPartOfClub: boolean} ) {
    const isLoggedIn = useIsLoggedIn();

    const [isFull , setIsFull] = React.useState<boolean>(false);
    const { token } = useUserInfo();

    useEffect(() => {
        if (team.teamMembers && team.teamMembers.length === 5) {
            setIsFull(true);
        }
    }, [team]);

    useEffect(() => {
        if (memberOf === team.teamName) {
            setIsMember(memberOf);
        }
    }, [memberOf, team, setIsMember]);

    async function handleClick(teamName: string, competitionId: string) {
        const response = await joinTeam(token, teamName, competitionId);
        response.status === 200 ? setIsMember(teamName) : null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div
                className={`flex flex-col border-2 shadow-md p-5 gap-5 rounded-md ${
                    memberOf === team.teamName ? "bg-slate-200" : null
                }`}
            >
                <div className="flex flex-col gap-2 justify-between md:flex-row items-center">
                    <p className="text-lg truncate">{team.teamDisplayName}</p>
                    {isLoggedIn && (
                        <Button
                            variant="outline"
                            className="hover:bg-slate-100"
                            onClick={() =>
                                handleClick(team.teamName, team.competitionId)
                            }
                            disabled={memberOf !== null || isFull || !isPartOfClub}
                        >
                            {memberOf === team.teamName
                                ? "Olet joukkueessa" : !isPartOfClub ? "Liity seuraan": isFull ? "Joukkue on täynnä" : "Liity joukkueeseen"}
                        </Button>
                    )}
                </div>

                <div className="grid gap-1">
                    <p className=" text-md">Jäsenet:</p>
                    {team.teamMembers && team.teamMembers.length > 0 ? (
                        <div className="grid border h-full border-slate-300 gap-x-4 bg-slate-100 p-2 shadow-md rounded-md grid-cols-2">
                            {team.teamMembers.map((member, index) => {
                                return <p key={index}>{member.legalName}</p>;
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </Suspense>
    );
}
