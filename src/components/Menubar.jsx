import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedOut, SignedIn, UserButton, useClerk, useUser,useAuth } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';
const Menubar = () => {


    const [menuOpen, setMenuOpen] = useState(false);
    const { openSignIn, openSignUp } = useClerk();
    const { user } = useUser();
    const { credits } = useContext(AppContext); // Assuming you have a way to get user credits
    // const { getToken } = useAuth();

    // const getData = async () => {
    //     const token = await getToken();
    //     console.log(token);
    //     console.log(user.id);

    // }


    const OpenRegister = () => {
        setMenuOpen(false);
        openSignUp({});
    }
    const OpenLogin = () => {
        setMenuOpen(false);
        openSignIn({});
    }

    return (
        <>
            <nav className="bg-white px-8 flex  justify-between item-centre p-8 ">
                {/* Left Side logo + text */}

                <Link className="flex item-centre space-x-2" to="/">
                    <img src={assets.logo} alt="logo" className="h-8 w-8 object-contain cursor-pointer" />
                    <span className="text-2xl font-semibold text-indigo-700 cursor-pointer">remove.
                        <span className="text-gray-400 cursor-pointer">bg</span>
                    </span>
                </Link>

                {/* Right side action buttons + text */}
                <div className="hidden md:flex items-center space-x-4">
                    <SignedOut>
                        <button className="text-gray-700 hover:text-blue-500 font-medium" onClick={OpenLogin}>
                            <span className="hidden md:inline">Login</span>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2
                rounded-full transition-all text-center" onClick={OpenRegister}>
                            Signup
                        </button>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button className="flex items-center gap-2 bg-blue-200 px-4 sm:px-5 py-1 5 sm:py-2 5 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
                                <img src={assets.credits} alt="Credits " height={24} width={24} />
                                <p className="text-xs sm:text-sm font-medium text-gray-700">
                                    Credits:{credits}
                                </p>
                            </button>
                            {/* <button onClick={ getData} className='cursor-pointer'>Get the data</button> */}
                            <p className="text-gray-500 max-sm:hidden">
                                Hi, {user?.fullName}
                            </p>
                        </div>
                        <UserButton />
                    </SignedIn>
                </div>
                {/* Mobile Hamburger icon   -> jab display size chota hoga toh menu icon ban jayega */}
                <div className="flex md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} className="text-gray-700" /> : <Menu size={28} className="text-gray-700" />}
                    </button>
                </div>
                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute top-8 right-8 bg-white drop-shadow-md rounded-md
                    flex flex-col space-y-4 w-40 p-4">
                        <SignedOut>
                            <button className="text-gray-700 hover:text-blue-500 font-medium px-4 py-2"
                                onClick={OpenLogin}>
                                Login
                            </button>

                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-full text-center"
                                onClick={OpenRegister}>
                                Signup
                            </button>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button className="flex items-center gap-2 bg-blue-200 px-4 sm:px-5 py-1 5 sm:py-2 5 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
                                    <img src={assets.credits} alt="Credits " height={24} width={24} />
                                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                                        Credits:{credits}
                                    </p>
                                </button>

                                
                            </div>
                            <UserButton />
                        </SignedIn>
                    </div>
                )
                }
            </nav>
        </>
    )
}
export default Menubar; 