import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function NavBar()
{
    const { user, setUser } = useContext(UserContext);
    const loggedIn = user !== '';

    const [showNavMenu, setShowNavMenu] = useState(false);
    const navMenu = useRef(null);

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setShowNavMenu(true);
    }

    useEffect(() => {
        const handleClick = (event) => {
            setShowNavMenu(false);
        };

        if (showNavMenu)
        {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };

    }, [showNavMenu]);

    const NavLink = ({to, text}) => {
        return (
            <li>
                <Link to={to}>
                    <span>{text}</span>
                </Link>
            </li>
        )
    }

    const NavLinks = (
        <>
            <NavLink to="/" text="Home" />
            <NavLink to="/articles" text="Articles" />
        </>
    );

    return (
        <div className="p-4 mb-4">
            <div className="hidden sm:flex">
                <header className="flex w-full max-w-7xl mx-auto justify-between items-center">
                    <nav className="basis-1/3">
                        <ul className="flex space-x-2">
                            {NavLinks}
                        </ul>
                    </nav>

                    <h1 className="basis-1/3 text-3xl text-center">
                        NC News
                    </h1>

                    <div className="basis-1/3 flex justify-end">
                        {loggedIn ?
                            (
                                <h3>
                                    {user}
                                </h3>
                            )
                            :
                            (
                                <button onClick={() => {
                                    console.log("Logging in as default user grumpy19");
                                    setUser("grumpy19");
                                }}>
                                    Sign In
                                </button>
                            )
                        }

                    </div>
                </header>
            </div>

            <div className="sm:hidden">
                <header>
                    <button className="cursor-pointer" onClick={handleMenuClick}>
                        Menu
                    </button>
                </header>
            </div>

            {showNavMenu &&
                <div className="sm:hidden absolute top-0 left-0 bottom-0 right-0 bg-background" ref={navMenu}>
                    <nav>
                        <ul className="flex flex-col space-y-2 p-4">
                            {NavLinks}
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
}