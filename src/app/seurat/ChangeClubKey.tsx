'use client';
import { Button } from "@/components/ui/Button";
import { changeClubKeyURL } from "@/lib/APIConstants";
import useUserInfo from "@/lib/hooks/get-user.info";
import { User } from "@/types/commonTypes";
import axios from "axios";
import { useState } from "react";

interface ChangeClubKeyProps {
    clubName: string,
    token: string,
}

const ChangeClubKey = ({ clubName, token }: ChangeClubKeyProps) => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");

    // console.log(clubName, token);
    
    const handleSubmit = async (data: FormData) => {
        const pass = data.get("pass") || null;
        try {
            const res = await axios({
                method: 'post',
                url: changeClubKeyURL,
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
                    setMessage(`Seuran ${clubName} salasanan vaihto onnistui.`);
                    setMessageStyle("text-black");
                } catch (e: any) {
                    console.log(e);
                }
            } else {
                setMessage(`Seuran ${clubName} salasanan vaihto epäonnistui.`);
                setMessageStyle("text-red-500");
            }
        } catch (error) {
            console.log(error);
            setMessage(`Seuran ${clubName} salasanan vaihto epäonnistui.`);
            setMessageStyle("text-red-500");
        }
    }

    return (
        <div>
            <h1>Aseta uusi salasana:</h1>
            <form
                action={handleSubmit}
                className='flex flex-col gap-2 max-w-[200px]'
            >
                <input
                    className='border rounded-lg p-2'
                    type="password"
                    name="pass"
                    placeholder="uusi salasana"
                />
                <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-slate-100"
                    type="submit"
                >
                    Aseta salasana
                </Button>
            </form>
            <p className={`${messageStyle} mt-3`}>{message}</p>
        </div>
    )
}

export default ChangeClubKey;