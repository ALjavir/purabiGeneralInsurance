import paymentPartner1 from "~/assets/image/page/footer/paymentPartner (1).png";
import paymentPartner2 from "~/assets/image/page/footer/paymentPartner (2).png";
import paymentPartner3 from "~/assets/image/page/footer/paymentPartner (3).png";
import paymentPartner4 from "~/assets/image/page/footer/paymentPartner (4).png";
import paymentPartner5 from "~/assets/image/page/footer/paymentPartner (5).png";
import paymentPartner6 from "~/assets/image/page/footer/paymentPartner (6).png";
import paymentPartner7 from "~/assets/image/page/footer/paymentPartner (7).png";
import paymentPartner8 from "~/assets/image/page/footer/paymentPartner (8).png";
import paymentPartner9 from "~/assets/image/page/footer/paymentPartner (9).png";
import paymentPartner10 from "~/assets/image/page/footer/paymentPartner (10).png";
import paymentPartner11 from "~/assets/image/page/footer/paymentPartner (11).png";
import paymentPartner12 from "~/assets/image/page/footer/paymentPartner (12).png";
import paymentPartner13 from "~/assets/image/page/footer/paymentPartner (13).png";
import paymentPartner14 from "~/assets/image/page/footer/paymentPartner (14).png";
import paymentPartner15 from "~/assets/image/page/footer/paymentPartner (15).png";

import instaLogo from "~/assets/image/icons/footsocial (1).svg";
import fbLogo from "~/assets/image/icons/footsocial (2).svg";
import twitterLogo from "~/assets/image/icons/footsocial (3).svg";
import CustomButton from "./button";
import { NavLink } from "react-router";
import { HiOutlineChevronDown } from "react-icons/hi2";

export default function Footer() {
    const catagory = "Are you ready?"
    const title = "Get Your Insurance Now!"
    const contractTime = "Sunday to Thursday : 10 AM to 6 PM"

    const paymentPartner = [
        {
            img: paymentPartner1,

        }, {
            img: paymentPartner2,

        }, {
            img: paymentPartner3,

        }, {
            img: paymentPartner4,

        }, {
            img: paymentPartner5,

        }, {
            img: paymentPartner6,

        }, {
            img: paymentPartner7,

        }, {
            img: paymentPartner8,

        }, {
            img: paymentPartner9,

        }, {
            img: paymentPartner10,

        }, {
            img: paymentPartner11,

        }, {
            img: paymentPartner12,

        }, {
            img: paymentPartner13,

        }, {
            img: paymentPartner14,
        }, {
            img: paymentPartner15,
        }

    ]

    const socialMedia = [
        {
            icon: fbLogo,
            path: "https://www.facebook.com/purabiinsurance"
        }, {
            icon: twitterLogo,
            path: "https://twitter.com/purabiinsurance"
        }, {
            icon: instaLogo,
            path: "https://www.instagram.com/purabiinsurance"
        },

    ]

    const extraLink = [
        {
            name: "Terms & Conditions",
            path: "/"
        }, {
            name: "Privacy Policy",
            path: "/"
        }, {
            name: "Contact Us",
            path: "/"
        }

    ]

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Services", path: "/services" },
        { name: "Claims", path: "/claims" },
        { name: "Contact Us", path: "/contact-us" },
    ];

    return (
        <footer className="w-full py-8 md:py-10 px-5 md:px-12 lg:px-20"
        style={{
            background: `linear-gradient(0deg, #FFFFFF, #FFFFFF),
            linear-gradient(180deg, rgba(172, 62, 37, 0),rgba(172, 62, 37, 1) 100%)`,
            }}
        >

            <div className="gap-8 mx-auto flex flex-col items-center text-center mt-18">
                <p className="text-gray-500 text-sm md:text-base">
                    {catagory}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                    {title}
                </h1>
                <CustomButton path="#" name="Buy Now" showicon={true} />
                <nav className="grid grid-cols-2 md:grid-cols-5  gap-8  max-w-3xl justify-items-center w-fit">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group flex items-center w-full justify-center">
                            <NavLink
                                to={item.path}
                                className="flex items-center justify-center text-base md:text-lg font-medium text-black w-full border-b border-transparent transition-colors hover:text-p hover:border-p"
                            >
                                {item.name}
                                {(item.name === "Services" || item.name === "Claims") && (
                                    <HiOutlineChevronDown
                                        className="w-5 h-5 transition-transform group-hover:rotate-180"
                                        strokeWidth={2}
                                    />
                                )}
                            </NavLink>
                        </div>
                    ))}
                </nav>
            </div>




            <div className="gap-8 mx-auto flex flex-col items-center text-center mt-15">
                <div className="flex flex-row items-center justify-center gap-5">
                    {socialMedia.map((item, index) => (
                        <a
                            key={index}
                            href={item.path}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <img src={item.icon} alt="social" className="w-5 h-5 object-contain opacity-70" />
                        </a>
                    ))}
                </div>
                <h1 className=" text-black font-medium text-base md:text-xl">
                    {contractTime}
                </h1>
            </div>




            <div className="w-fit mt-15 text-left mx-auto ">
                <p className="text-xs md:text-sm text-gray-500 mb-4">
                    Payment Channels
                </p>


                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-15 gap-3 md:gap-5 justify-items-center w-fit">
                    {paymentPartner.map((item, index) => (
                        <img
                            key={index}
                            src={item.img}
                            alt="payment"
                            className="h-full max-w-25 object-contain"
                        />

                    ))}
                </div>
            </div>


            <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-10 pt-6  gap-4 text-xs md:text-sm text-gray-600">
                <p className="order-2 lg:order-1 text-center">
                    Copyright © <span className="text-p font-bold text-sm md:text-base ">360D Soul Limited</span> 2025. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-8 order-1 lg:order-2">
                    {
                        extraLink.map((item, index) => (
                            <a key={index} href={item.path} className="hover:text-p transition-colors text-base">
                                {item.name}
                            </a>
                        ))
                    }

                </div>
            </div>


        </footer>
    )
}