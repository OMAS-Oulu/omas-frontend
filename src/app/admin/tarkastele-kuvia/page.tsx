'use client';

import useAdminLoggedIn from "@/lib/hooks/admin-is-logged-in";
import OnlyAdminPermission from "../OnlyAdminPermission";
import ImageViewer from "./ImageViewer";

export default function ViewImages() {

    return (useAdminLoggedIn()) ?
        (
            <ImageViewer />
        ) :
        (
            <OnlyAdminPermission />
        )
}