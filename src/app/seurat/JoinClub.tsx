import { Button } from "@/components/ui/Button"
import { joinClubURL } from "@/lib/APIConstants";
import { User } from "@/types/commonTypes";
import axios from "axios";
import { useEffect, useState } from "react";

interface JoinClubProps {
    clubName: string
}

const JoinClub = ({ clubName }: JoinClubProps) => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");
    const [user, setUser] = useState<User>();

    const token = localStorage.getItem("token");

    const handleProfileUpdate = (club: string) => {
        const newUser: User = {
            ...JSON.parse(localStorage.getItem("userInfo")!),
            club: club
        };
        localStorage.setItem("userInfo", JSON.stringify(newUser));
    }

    const handleSubmit = async (data: FormData) => {
        const pass = data.get("pass") || null;
        try {
            const res = await axios({
                method: 'post',
                url: joinClubURL,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    clubName: clubName,
                    passkey: pass
                }
            });

            console.log(res);

            if (res.status === 200) {
                try {
                    handleProfileUpdate(clubName);
                    setMessage(`Seuraan ${clubName} liittyminen onnistui.`);
                    setMessageStyle("text-black");
                } catch (e: any) {
                    console.log(e);
                }
            } else {
                setMessage(`Seuraan ${clubName} liittyminen epäonnistui. Tarkista, että seuran nimi sekä salasana ovat oikein ja yritä uudelleen. Salasanaa ei tarvitse syöttää, jos seura ei sitä vaadi.`);
                setMessageStyle("text-red-500");
            }
        } catch (error) {
            console.log(error);
            setMessage(`Seuraan ${clubName} liittyminen epäonnistui. Tarkista, että seuran nimi sekä salasana ovat oikein ja yritä uudelleen. Salasanaa ei tarvitse syöttää, jos seura ei sitä vaadi.`);
            setMessageStyle("text-red-500");
        }
    }

    return (
        <div>
            <form
                action={handleSubmit}
                className='flex flex-col gap-2 max-w-[200px]'
            >
                {/* <input
                    className='border rounded-lg p-2'
                    type="text"
                    name="club"
                    placeholder="seuran nimi"
                /> */}
                <input
                    className='border rounded-lg p-2'
                    type="password"
                    name="pass"
                    placeholder="seuran salasana"
                />
                <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-slate-100"
                    type="submit"
                >
                    Liity seuraan
                </Button>
            </form>
            <p className={`${messageStyle} mt-3`}>{message}</p>
        </div>
    )
}

export default JoinClub;