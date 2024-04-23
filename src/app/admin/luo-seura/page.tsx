'use client';

import CreateClub from "./CreateClub";
import OnlyAdminPermission from "../OnlyAdminPermission";
import useAdminLoggedIn from "@/lib/hooks/admin-is-logged-in";

export default function ClubCreate() {

    return (useAdminLoggedIn()) ?
        (
            <CreateClub />
        ) :
        (
            <OnlyAdminPermission />
        )
}