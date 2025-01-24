import { NavLink } from "react-router-dom";


export function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
            <div className="p-5 text-xl font-bold">Meu App</div>
            <ul className="mt-6 space-y-4">
                <li>
                    <NavLink to='/'>
                        
                        <p className="block px-4 py-1 hover:bg-gray-700 rounded">Home</p>
                    </NavLink>
                </li>

                <li>
                    <NavLink to='users'>
                        
                        <p className="block px-4 py-1 hover:bg-gray-700 rounded">Users</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}