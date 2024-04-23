'use client';
import { CompetitionResponse, CompetitionTeamsResponse } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import { getCompetitionTeamsQueryUrl } from "@/lib/APIConstants";
import axios from "axios";
import Paginator from "../components/Paginator";
import Team from "./Team";

interface CompetitionProps {
    comp: CompetitionResponse
}

const Competition = ({ comp }: CompetitionProps) => {
    const [data, setData] = useState<CompetitionTeamsResponse>();
	const [pageNumber, setPageNumber] = useState(0);
    const [hidden, setHidden] = useState(true);
    const [bgColor, setBgColor] = useState("bg-white");

    let typeFinnish = "";
    switch (comp.type) {
        case "rifle":
            typeFinnish = "ilmakivääri";
            break;
        case "pistol":
            typeFinnish = "ilmapistooli";
            break;
        default:
            typeFinnish = "";
    }

    const apiUrl = getCompetitionTeamsQueryUrl(comp.competitionId, pageNumber, 5)

    const fetchTeams = async () => {
		try {
			const res = await axios.get(apiUrl, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setData(res.data);
		} catch (e: any) {
			console.error(e);
		}
	}
    useEffect(() => {
        fetchTeams();
    }, [pageNumber])


    if (!data) return;

	let teams = data.content;

    const handlePageNumberChange = (page: number) => {
		if (page < 0 || page > data.totalPages - 1) return;
		setPageNumber(page);
	}

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
            <div onClick={handleHideTeams} className={`${bgColor} flex flex-col gap-2 shadow-md rounded-lg border p-4 hover:bg-slate-50 cursor-pointer`}>
                <h1 className="text-xl">{comp.displayName}</h1>
                <p>Alkamispäivä: {comp.startDate}</p>
                <p>Loppumispäivä: {comp.endDate}</p>
                <p>Tyyppi: {typeFinnish}</p>
                <p>Luontipäivä: {comp.creationDate}</p>
            </div>
            { (!hidden) ?
                <div className="flex flex-col gap-2 ml-8">
                    {teams && teams.map((team, index: number) => (
                        <Team key={index} team={team} />
                    ))}
                </div>
                : null
            }
            { 
                (data.totalPages > 1 && !hidden) ?
                    <Paginator
                        pageNumber={pageNumber}
                        totalPages={data.totalPages}
                        handlePageNumberChange={handlePageNumberChange}
                    />
                : <div></div>
            }
        </div>
    )
}

export default Competition;