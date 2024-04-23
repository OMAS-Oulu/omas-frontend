'use client';
import { CompetitionTeam } from "@/types/commonTypes";
import Member from "./Member";
import { useState } from "react";

interface TeamProps {
    team: CompetitionTeam
}

const Team = ({ team }: TeamProps) => {
    const [hidden, setHidden] = useState(true);
    const [bgColor, setBgColor] = useState("bg-white");

    const handleHideTeams = () => {
        if (hidden) {
            setHidden(false);
            setBgColor("bg-slate-100");
        } else {
            setHidden(true);
            setBgColor("bg-white");
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div onClick={handleHideTeams} className={`${bgColor} flex flex-col shadow-md rounded-lg border p-4 hover:bg-slate-50 cursor-pointer`}> 
                <h1 className="text-xl">{team.teamDisplayName}</h1>
            </div>
            { (!hidden) ?
                <div className="ml-8 flex flex-col gap-2">
                    {team.teamMembers && team.teamMembers.map((member, index: number) => (
                        <Member
                            key={index}
                            member={member} 
                            competitionId={team.competitionId}
                            teamName={team.teamName}
                        />
                    ))}
                </div>
                : null
            }
        </div>
    )
}

export default Team;