'use client';
import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import UserDetails from "./UserDetails";

export default function Settings() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("userInfo")!);
            setLoggedIn(true);
            setToken(token);
            setUser(user);
        }
    }, [loggedIn])

    
    if (!loggedIn) return (
        <div className="flex flex-col min-h-screen items-center justify-between p-2">
            <p>Asetuksia ei voi muuttaa, ennen kuin olet kirjautunut sisään</p>
        </div>
    )

    if (!user) return (
        <div className="flex flex-col min-h-screen items-center justify-between p-2">
            <p>Virhe käyttäjätietojesi haussa</p>
        </div>
    )

    return (
        <div>
            <UserDetails user={user} />
        </div>
    );
}