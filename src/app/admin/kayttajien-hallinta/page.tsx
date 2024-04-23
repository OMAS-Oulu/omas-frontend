'use client';

import OnlyAdminPermission from "../OnlyAdminPermission";
import useAdminLoggedIn from "@/lib/hooks/admin-is-logged-in";
import UsersMain from "./UsersMain";

export default function ManageUsers() {
    return (useAdminLoggedIn()) ?
        (
            <UsersMain />
        ) :
        (
            <OnlyAdminPermission />
        )
}