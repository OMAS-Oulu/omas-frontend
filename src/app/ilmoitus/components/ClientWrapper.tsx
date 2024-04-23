"use client"

import { ScoreType, UsersCompetition } from "@/types/commonTypes";
import React, { useEffect, useState } from "react";
import ScoreTypeSelectorContainer from "./ScoreTypeSelectorContainer";
import ScoreCard from "./ScoreForm";
import useLoggedIn from "@/lib/hooks/is-logged-in";
import useUserInfo from "@/lib/hooks/get-user.info";
import { getUserCompetitions } from "@/lib/APIConstants"

async function getCompetitions(token: string) {
    const response = await fetch(getUserCompetitions(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
    if (response.status !== 200) {
        return null;
    }
    return response;
}


export default function NotificationClientWrapper() {
    const [scoreType, setScoreType] = useState<ScoreType | null>(null);
    const handleScoreTypeChange = (scoreType: ScoreType | null) => {
        setScoreType(scoreType as ScoreType);
    };
    const [competitions, setCompetitions] = useState<UsersCompetition[] | null>(null);
    const isLoggedin = useLoggedIn();
    const { token } = useUserInfo();

    useEffect(() => {
        if (token == null) {
            return;
        }
        
        getCompetitions(token).then((response) => {
                response?.json().then((data) => {
                        setCompetitions(data);
                });
        });
    }, [token]);

    if (!isLoggedin) {
        return (
            <h2>Kirjaudu sisään syöttääksesi tuloksia</h2>
        )
    }

    return (
        <>
            {competitions != null ? (
                <>
                    <ScoreTypeSelectorContainer
                        onScoreTypeChange={handleScoreTypeChange}
                    />
                    {scoreType && <ScoreCard scoreType={scoreType} competitions={competitions} />}
                </>
            ) : (
                <h2>Liity tiimiin syöttääksesi tuloksia.</h2>
            )}
        </>
    );
}
