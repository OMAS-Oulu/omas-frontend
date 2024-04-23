import { getFileDownloadUrl } from "@/lib/APIConstants";
import { ImageProof, TeamMember } from "@/types/commonTypes";
import axios from "axios";
import { useState } from "react";
import Images from "./Images";
import { Button } from "@/components/ui/Button";

interface MemberProps {
    member: TeamMember,
    competitionId: string,
    teamName: string
}

const Member = ({ member, competitionId, teamName }: MemberProps) => {
    const [data, setData] = useState<ImageProof[]>();
    const [hidden, setHidden] = useState(true);
    const [message, setMessage] = useState("");

    const apiUrl = getFileDownloadUrl();

    const fetchImages = async () => {
        try {
            const fileName = null;

            const res = await axios(apiUrl, {
                method: "post",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    userId: member.userId,
                    competitionId: competitionId,
                    teamName: teamName,
                    fileName: fileName
                }
            });

            setHidden(false);
            setData(res.data);
        } catch (e: any) {
            setMessage("Kuvia ei löytynyt")
            console.error(e);
        }
    }
    
    return (
        <div>
            <div className="flex flex-col gap-2 shadow-md rounded-lg border p-4 cursor-pointer">
                <h1>{member.legalName}</h1>
                <Button
                    variant="outline"
                    size="lg"
                    className="hover:bg-slate-100"
                    onClick={() => fetchImages()}
                    >
                    Hae kuvat
                </Button>
            </div>
            <div className="p-2">
                {
                    !(hidden) ? 
                        <Images data={data} />
                    : <p>{message}</p>
                }
            </div>
        </div>
    )
}

export default Member;