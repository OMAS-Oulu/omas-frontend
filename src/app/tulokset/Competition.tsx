import React, { useEffect, useState } from "react";
import { competitionResults } from "@/types/commonTypes";
import Team from "./Team";
import { getCompetitionByNameUrl } from "../../lib/APIConstants";
import axios from "axios";
import { formatDate } from "@/lib/utils";

interface CompetitionProps {
  name: string;
  displayName: string;
  startDate: string;
  endDate: string;
  type: string;
}

const Competition = ({
  name,
  displayName,
  startDate,
  endDate,
  type,
}: CompetitionProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [competition, setCompetition] = useState<competitionResults>();

  let apiUrl = getCompetitionByNameUrl(name);
  let typeFinnish = "";

  switch (type) {
    case "rifle":
      typeFinnish = "ilmakivääri";
      break;
    case "pistol":
      typeFinnish = "ilmapistooli";
      break;
    default:
      typeFinnish = "";
  }

  const fetchContent = async () => {
    try {
      const res = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCompetition(res.data);
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [apiUrl]);

  const arrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  let hidden = "";

  const handleShowClubs = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  if (isHidden) {
    hidden = "hidden";
  } else {
    hidden = "";
  }

  if (competition) {
    return (
      <div data-testid={`competition-${competition.displayName}`}>
        <div
          className='flex items-center h-16 bg-slate-100 rounded-md mb-2 shadow-md cursor-pointer'
          onClick={handleShowClubs}
        >
          <div className="ml-2">{isHidden ? arrowDown : arrowUp}</div>
          <div className="block">
            <h1 className="ml-2">{competition.displayName}</h1>
            <p className="ml-2 text-slate-700 text-sm">{`${formatDate(
              startDate
            )} - ${formatDate(endDate)}`}</p>
            <p className="ml-2 text-sm text-slate-500">{typeFinnish}</p>
          </div>
        </div>
        <div className={`${hidden} h-full p-4 bg-slate-50 rounded-md mb-2 shadow-md ml-4`}>
          {(competition.teams && competition.teams.length !== 0) ? competition.teams.slice(0, 8).map((team, index) => (
            <div key={index} className='odd:bg-slate-200 even:bg-slate-100 p-2'>
              <Team
                key={index}
                teamDisplayName={team.teamDisplayName}
                position={index}
                scores={team.scores}
              />
            </div>
            ))
          :
            <div>
              <h1>Tuloksia ei löytynyt</h1>
            </div>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="flex items-center h-16 bg-slate-100 rounded-md mb-2 shadow-md ml-8 cursor-pointer"
          onClick={handleShowClubs}
        >
          <div className="ml-2">{isHidden ? arrowDown : arrowUp}</div>
          <h1 className="ml-2">{displayName}</h1>
          <p className="ml-2 text-slate-700 text-sm">{`${formatDate(
            startDate
          )} - ${formatDate(endDate)}`}</p>
        </div>
        <div
          className={`${hidden} h-full p-4 bg-slate-50 rounded-md mb-2 shadow-md ml-16`}
        >
          <h1>Virhe kilpailun tulosten haussa</h1>
        </div>
      </div>
    );
  }
};

export default Competition;
