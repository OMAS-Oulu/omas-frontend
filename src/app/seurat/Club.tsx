import JoinClub from "./JoinClub";
import ChangeClubKey from "./ChangeClubKey";
import { useEffect, useState } from "react";
import { User } from "@/types/commonTypes";

interface ClubProps {
    displayName: string,
    id: string,
    creationDate: string
}

const Club = ({displayName, id, creationDate}: ClubProps) => {
    const [clubAdmin, setClubAdmin] = useState<User | null>(null);
    const [token, setToken] = useState("");

    const getUser = () => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                setToken(token);
                const user: User = JSON.parse(localStorage.getItem("userInfo")!);
                if (user.roles.includes(`${id}/admin`)) setClubAdmin(user);
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="shadow p-2">
            <div>
                <p className="text-xl">{displayName}</p>
                <p className="text-slate-700">Seura luotu: {creationDate}</p>
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