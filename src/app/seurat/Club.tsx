import JoinClub from "./JoinClub";
import ChangeClubKey from "./ChangeClubKey";
import { useEffect, useState } from "react";
import { User } from "@/types/commonTypes";
import { formatDate } from "@/lib/utils";

interface ClubProps {
  displayName: string;
  id: string;
  creationDate: string;
}

const Club = ({ club, clubAdminRoles }: ClubProps) => {
    const { token } = useUserInfo();



    if (clubAdminRoles) {
        console.log(clubAdminRoles);
        console.log(club.name, clubAdminRoles.includes(club.name));
    }

    return (
        <div className="shadow p-2">
            <div>
                <p className="text-xl">{displayName}</p>
                <p className="text-slate-700">Seura luotu: {formatDate(creationDate)}</p>
            </div>
            <div>
			    <JoinClub clubName={id} />
                <ChangeClubKey clubName={id} />
                {/* { (clubAdmin) ? <ChangeClubKey clubName={id} /> : <div></div> } */}
            </div>
        </div>
    )
}
  
export default Club;
