import { useState } from "react";
import { NavLink } from "react-router";
import logo from "~/assets/image/navBar/navlogo.png";
import {
    HiOutlineArrowRight,
    HiOutlineChevronDown,
    HiOutlineMenu,
    HiOutlineX
} from "react-icons/hi";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    console.log("the showing of-----------------", isOpen);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Services", path: "/services" },
        { name: "Claims", path: "/claims" },
        { name: "Contact Us", path: "/contact-us" },
    ];

    const servicesItem = [
        { name: "Health Insurance", path: "/" },
        { name: "Travel Insurance", path: "/" },
        { name: "Accident Insurance", path: "/" },
        { name: "Car Insurance", path: "/" },
        { name: "Motorcycle Insurance", path: "/" },
        { name: "Life Insurance", path: "/" },
        { name: "Group Insurance for Employees", path: "/" },
    ]

    return (
        <header id="top-nav-bar" className="relative z-50 mx-auto py-3.5  px-2 md:px-5 xl:px-20 w-full flex items-center justify-between bg-white">


            <img src={logo} alt="Logo" className="h-15 object-contain" />

            <div className="flex flex-row items-center gap-2.5">
                <nav className="hidden xl:flex items-center gap-2.5 h-full">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group h-full flex items-center">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-1 px-5 py-3 border-b transition-colors text-lg font-medium ${isActive
                                        ? "text-p border-p"
                                        : "text-black border-transparent hover:text-p hover:border-p"
                                    }`
                                }
                            >
                                {item.name}
                                {(item.name === "Services" || item.name === "Claims") && (
                                    <HiOutlineChevronDown
                                        className="w-8 h-8 transition-transform pl-2 group-hover:rotate-180"
                                        strokeWidth={2}
                                    />
                                )}
                            </NavLink>


                            {item.name === "Services" && (
                                <div className="absolute top-full left-0 hidden  group-hover:block pt-6 w-md z-50">


                                    <div className="flex flex-col bg-[#FFFFFF33] backdrop-blur-[30px] shadow-lg rounded-sm overflow-hidden">

                                        {servicesItem.map((subItem, index) => (

                                            <NavLink
                                                key={index}
                                                to={subItem.path}
                                                className="group flex justify-between items-center px-5 py-3.5 transition-all duration-200 bg-transparent text-white hover:bg-white hover:text-p"
                                            >
                                                <span className="text-[16px] font-medium">{subItem.name}</span>

                                                <HiOutlineArrowUpRight
                                                    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                                                    strokeWidth={2}
                                                />
                                            </NavLink>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex flex-row items-center rounded   bg-p p-px">
                    <a
                        href="#"
                        className="hidden md:flex items-center gap-2 px-10 py-3.5 bg-p text-white font-medium text-lg lg:text-base rounded-md transition hover:bg-white hover:text-p "
                    >
                        Get A Quote


                        <HiOutlineArrowUpRight className="w-4 h-4 transition-transform  group-hover:rotate-45" strokeWidth={2} />
                    </a>

                </div>



                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="xl:hidden text-gray-800 focus:outline-none"
                    aria-label="Toggle menu"
                >

                    {isOpen ? (
                        <HiOutlineX className="w-7 h-7" strokeWidth={2} />
                    ) : (
                        <HiOutlineMenu className="w-7 h-7" strokeWidth={2} />
                    )}
                </button>
            </div>


            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl p-6 pt-0 flex flex-col gap-4 z-50 xg:hidden">
                    <div className="h-0.5 bg-gray-200"></div>
                    <nav className="flex flex-col gap-4 ">
                        {navItems.map((item) => (
                            <div key={item.name} className="flex flex-col gap-3">
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        if (item.name !== "Services") setIsOpen(false);
                                    }}
                                    className={({ isActive }) =>
                                        `text-base font-medium flex items-center justify-between transition-colors ${isActive ? "text-[#A84428]" : "text-gray-700 hover:text-[#A84428]"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>


                                {item.name === "Services" && (
                                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100">
                                        {servicesItem.map((subItem, index) => (
                                            <NavLink
                                                key={index}
                                                to={subItem.path}
                                                onClick={() => setIsOpen(false)}
                                                className={({ isActive }) =>
                                                    `text-sm transition-colors ${isActive ? "text-[#A84428] font-medium" : "text-gray-500 hover:text-[#A84428]"
                                                    }`
                                                }
                                            >
                                                {subItem.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Get A Quote (Mobile) */}
                    <a
                        href="#"
                        className="md:hidden flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-[#A84428] text-white font-medium text-base rounded-md"
                    >
                        Get A Quote
                    </a>
                </div>
            )}
        </header>
    );
}