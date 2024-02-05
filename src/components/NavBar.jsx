import { Link } from "react-router-dom";

export default function NavBar()
{

    const NavLink = ({to, text}) => {
        return (
            <li className="p-2">
                <Link to={to}>
                    <span>{text}</span>
                </Link>
            </li>
        )
    }

    return (
        <header className="flex max-w-7xl mx-auto justify-between p-4">
            <nav>
                <ul className="flex">
                    <NavLink to="/" text="Home" />
                    <NavLink to="/articles" text="Articles" />
                </ul>
            </nav>

            <h1 className="text-3xl">
                NC News
            </h1>

            <div>
                Sign In
            </div>
        </header>
    )
}