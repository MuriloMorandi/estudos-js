import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-blue">
            <nav>
                <NavLink to={'/'}>
                    Home
                </NavLink>
            </nav>
        </header>
    )
}