"use client";
import AdminNavbar from "./AdminNavbar";
import OnlyAdminPermission from "./OnlyAdminPermission";
import useAdminLoggedIn from "@/lib/hooks/admin-is-logged-in";


const AdminView = () => {
    if (!useAdminLoggedIn) return (
        <OnlyAdminPermission />
    )
    
    return (
        <main className="min-h-screen w-full p-4 gap-2">
            <AdminNavbar />
            <div className="py-2">
                <h1 className="text-xl">Tällä sivulla voit tehdä ylläpitäjän toimitoja:</h1>
                <p className="ml-4">{"-> antaa ja poistaa käyttäjiltä rooleja"}</p>
                <p className="ml-4">{"-> poistaa käyttäjiä"}</p>
                <p className="ml-4">{"-> luoda seuroja"}</p>
                <p className="ml-4">{"-> luoda kilpailuja"}</p>
                <p className="ml-4">{"-> tarkastella kuvia"}</p>
            </div>
        </main>
    )
}

export default AdminView;