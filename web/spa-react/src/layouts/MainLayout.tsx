import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function MainLayout() {
    return (
        <div className="flex">

            <Sidebar />
            <div className="ml-64 p-8">

                <Outlet />
            </div>

        </div>
    )
}