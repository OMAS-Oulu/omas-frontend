'use client';
import { getAdminUserQueryUrl } from "@/lib/APIConstants";
import { AdminQueryUser } from '@/types/commonTypes';
import React, { useEffect, useState } from "react";
import Paginator from "../components/Paginator";
import Input from "@/components/ui/Input";
import axios from "axios";
import Users from "./Users";

const UsersMain = () => {
    const [data, setData] = useState<AdminQueryUser>();
    const [pageNumber, setPageNumber] = useState(0);
    const [search, setSearch] = useState("");

    let apiUrl = getAdminUserQueryUrl(search, pageNumber, 10);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(localStorage.getItem("token"));
            console.log(res);
            setData(res.data);
        } catch (e: any) {
            console.error(e);
        }
    }

    const handlePageNumberChange = (page: number) => {
        if (!data) return;
        if (page < 0 || page > data.totalPages - 1) return;
        setPageNumber(page);
    }

    useEffect(() => {
        fetchUsers();
    }, [pageNumber, search]);

    useEffect(() => {
        setPageNumber(0);
    }, [search]);

    return (
        <div>
            <div className="p-4">
                <p className="text-md">Tällä sivulla voit hallinnoida käyttäjiä, voit muokata heidän rooleja sekä poistaa käyttäjiä</p>
                <p className="text-md">Tiedot päivittyvät sivun päivittämisen jälkeen.</p>
                <p className="text-md">Etsiminen tapahtuu koko nimen (etunimi ja sukunimi) perusteella.</p>
            </div>
            <div className="flex min-h-screen w-full flex-col items-center p-4 gap-2">
                <div className="flex flex-col items-center mb-4">
                    <Input
                        id="search"
                        placeholder="Hae käyttäjää"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        required={false}
                    />
                </div>
                {
                    (data) ?
                    <div className="w-full">
                        <Paginator
                            pageNumber={pageNumber}
                            totalPages={data.totalPages}
                            handlePageNumberChange={handlePageNumberChange}
                        />
                        <Users data={data} />
                    </div>
                    : <h1>Käyttäjätietoja ei löytynyt.</h1>
                }
            </div>
        </div>
    )
}

export default UsersMain;