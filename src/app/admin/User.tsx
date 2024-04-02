import { useState } from 'react';
import { User as UserType } from '@/types/commonTypes';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import { getAdminDeleteUserUrl, getAdminDemoteUserUrl, getAdminPromoteUserUrl } from '@/lib/APIConstants';

interface UserProps {
    user: UserType
}

const User = ({ user }: UserProps) => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("text-black");

    const roles = user.roles;
    // const [club, setClub] = useState("ei seuraa");

    // if (user.club !== null) {
    //     setClub(user.club);
    // }
    
    // if (user.username === "admin") return;

    const handleSubmit = async (data: FormData) => {
        const role = data.get("role");
        if (data.get("promote")) {
            try {
                const res = await axios({
                    method: 'post',
                    url: getAdminPromoteUserUrl(),
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        userId: user.id,
                        role: role,
                    }
                });
                console.log(res);

                if (res.status === 200) {
                    setMessage("Roolin lisääminen onnistui");
                    setMessageStyle("text-black");
                } else {
                    setMessage("Virhe roolin lisäämisessä");
                    setMessageStyle("text-red-500");
                }
            } catch (error) {
                console.log(error);
                setMessage("Virhe roolin lisäämisessä");
                setMessageStyle("text-red-500");
            }
        } else {
            try {
                const res = await axios({
                    method: 'post',
                    url: getAdminDemoteUserUrl(),
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        userId: user.id,
                        role: role,
                    }
                });

                if (res.status === 200) {
                    setMessage("Roolin poistaminen onnistui");
                    setMessageStyle("text-black");
                } else {
                    setMessage("Virhe roolin poistamisessa");
                    setMessageStyle("text-red-500");
                }
            } catch (error) {
                console.log(error);
                setMessage("Virhe roolin poistamisessa");
                setMessageStyle("text-red-500");
            }
        }
    }

    const handleDeleteUser = async () => {

        try {
            const res = await axios({
                method: 'delete',
                url: getAdminDeleteUserUrl(),
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    username: user.username
                }
            });

            if (res.status === 200) {
                
            } else {
                setMessage("Käyttäjän poistaminen epäonnistui");
                setMessageStyle("text-red-500");
            }
        } catch (error) {
            console.log(error);
            setMessage("Käyttäjän poistaminen epäonnistui");
            setMessageStyle("text-red-500");
        }
    }

    return (
        <div className="items-center gap-2 p-2 w-full border-solid border border-slate-300 rounded-lg shadow-md cursor-pointer">
            <Button
                variant="outline"
                size="sm"
                className="hover:bg-slate-100"
                onClick={handleDeleteUser}
            >
                Poista käyttäjä
            </Button>
            <div className='px-4 p-2 block rounded-lg'>
                <h1>{`id: ${user.id}`}</h1>
                <h1>{`käyttäjänimi: ${user.username}`}</h1>
                <h1>{`nimi: ${user.legalName}`}</h1>
                <h1>{`sähköposti: ${user.email}`}</h1>
                <h1>{`luontipäivä: ${user.creationDate}`}</h1>
                <h1>{`seura: ${user.club}`}</h1>
                <h1>roolit:</h1>
                <div className='flex flex-row gap-2'>
                    
                    {/* 
                    
                    TODO: fix bug, throws objects are not valid as a a react child error

                    {roles.length !== 0 && roles.map((role: string, index: number) => (
                        <p key={index}>{role}</p>
                    ))} */}
                </div>
            </div>
            <div className='px-4 p-2'>
                <h1>poista tai lisää rooli</h1>
                <form
                    action={handleSubmit}
                    className='flex flex-row gap-2'
                >
                    <input
                        className='border rounded-lg p-2'
                        type="text"
                        name="role"
                        placeholder="rooli"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        value="promote"
                        name="promote"
                        className="hover:bg-slate-100"
                        type="submit"
                    >
                        Lisää
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        value="demote"
                        name="demote"
                        className="hover:bg-slate-100"
                        type="submit"
                    >
                        Poista
                    </Button>
                </form>
                <p className={`${messageStyle} mt-3`}>{message}</p>
            </div>
        </div>
    )
}

export default User;