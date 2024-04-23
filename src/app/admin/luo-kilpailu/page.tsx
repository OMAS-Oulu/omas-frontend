'use client';

import useAdminLoggedIn from "@/lib/hooks/admin-is-logged-in";
import OnlyAdminPermission from "../OnlyAdminPermission";
import AddCompetition from "./AddCompetition";

export default function CreateComp() {

    return (useAdminLoggedIn()) ?
        (
            <AddCompetition />
        ) :
        (
            <OnlyAdminPermission />
        )
}