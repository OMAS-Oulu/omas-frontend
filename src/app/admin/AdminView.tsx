"use client";
import { AdminViewType, User } from "@/types/commonTypes";
import AdminHelper from "./AdminHelper";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

const adminFeatures = [
    {
        text: "Käyttäjät",
        type: AdminViewType.Users
    },
    {
        text: "Luo seura",
        type: AdminViewType.CreateClub
    },{
        text: "Luo kilpailuja",
        type: AdminViewType.CreateCompetition
    },
    {
        text: "Tarkastele kuvia",
        type: AdminViewType.ImageViewer
    },
    {
        text: "Muut",
        type: AdminViewType.Other
    }
];


const AdminView = () => {
    const [type, setType] = useState(AdminViewType.Other);
    const [adminLogin, setAdminLogin] = useState(false);
    const [token, setToken] = useState("");

    const checkAdminLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                let user: User = JSON.parse(localStorage.getItem("userInfo")!);
                if (user.roles.includes("ROLE_ADMIN")) {
                    setAdminLogin(true);
                }
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        checkAdminLogin();
    }, [])

    if (!adminLogin) return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <h1>Vain ylläpitäjällä on oikeus muokata asetuksia</h1>
        </main>
    )
    
    const handleFeatureClick = (type: AdminViewType) => {
        setType(type);
    }

    return (
        <main className="min-h-screen w-full p-4 gap-2">
            <div className="flex flex-row gap-2">
                {adminFeatures.map((feature: any, index: number) => (
                    <Button
                        onClick={() => handleFeatureClick(feature.type)}
                        variant="outline"
                        className="hover:bg-slate-100"
                        key={index}
                    >
                        {feature.text}
                    </Button>
                ))}
            </div>
            <AdminHelper type={type} />
        </main>
    )
}

export default AdminView;