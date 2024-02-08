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
            <li className="flex ">
                <Link className="p-2 pointer-events-auto hover:shadow-[0_-3px_0_0_inset] shadow-background_alt" to={to}>
                    {text}
                </Link>
            </li>
        )
    }

    const NavButton = ({text, onClick}) => {
        return (
            <button className="p-2 pointer-events-auto hover:shadow-[0_2px_0_0] shadow-background_alt" onClick={onClick}>
                {text}
            </button>
        )
    }

    const NavLinks = (
        <>
            <NavLink to="/" text="Home" />
            <NavLink to="/articles" text="Articles" />
        </>
    );

    return (
        <div className="p-4 bg-[#373e46]" >
            <div className="hidden sm:flex ">
                <header className="flex items-center w-full max-w-7xl mx-auto justify-between">
                    <nav className="basis-1/3">
                        <ul className="flex gap-x-8 ">
                            {NavLinks}
                        </ul>
                    </nav>

                    <Link className="basis-1/3 text-3xl text-center pointer-events-auto" to="/">
                        <h1 className="p-2">
                            NC News
                        </h1>
                    </Link>

                    <div className="basis-1/3 flex justify-end">
                        {loggedIn ?
                            <h3>{user}</h3>
                            :
                            <NavButton text="Sign In" onClick={() => setUser("grumpy19")} />
                        }
                    </div>
                </header>
            </div>

            <div className="sm:hidden">
                <header>
                    <button className="p-2 pointer-events-auto hover:shadow-[0_-3px_0_0_inset] shadow-background_alt" onClick={handleMenuClick}>
                        Menu
                    </button>
                </header>
            </div>

            {showNavMenu &&
                <div className="sm:hidden absolute top-0 left-0 bottom-0 right-0 bg-background" ref={navMenu}>
                    <nav className="flex text-center">
                        <ul className="flex flex-col space-y-2 p-4 gap-y-6">
                            {NavLinks}
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
}