"use client";

import { Button } from "@/components/ui/Button";
import React, { Suspense, useEffect } from "react";
import useIsLoggedIn from "@/lib/hooks/is-logged-in";
import {TTeam,} from "@/types/commonTypes";
import { joinTeam } from "@/app/actions";
import useUserInfo from "@/lib/hooks/get-user.info";

export default function TeamCard({ team, memberOf, setIsMember }: { team: TTeam , memberOf: string | null, setIsMember: (teamName: string) => void}) {
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
                            disabled={memberOf !== null || isFull}
                        >
                            {memberOf === team.teamName
                                ? "Olet joukkueessa"
                                : isFull ? "Joukkue on täynnä" : "Liity joukkueeseen"}
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
