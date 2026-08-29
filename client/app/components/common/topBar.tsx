import location from "~/assets/image/topbar/location.svg";
import email from "~/assets/image/topbar/email.svg";
import phone from "~/assets/image/topbar/phone.svg";

import facebook from "~/assets/image/topbar/facebook.svg";
import twitter from "~/assets/image/topbar/twitter.svg";
import instagram from "~/assets/image/topbar/instragrom.svg";
import youtube from "~/assets/image/topbar/yt.svg";
import linkedin from "~/assets/image/topbar/linkdn.svg";


export default function TopBar() {

    const info = [
        {
            icon: location,
            info: "Sandhani Life Tower (2nd Floor), 34 Bangla Motor, Dhaka - 1000."
        }, {
            icon: email,
            info: "purabiinsurance@gmail.com"
        }, {
            icon: phone,
            info: "+880 1714-044146"
        }
    ]

    const portal = [
        {
            name: "Client Portal",
            path: "/"
        }, {
            name: "Agent Portal",
            path: "/"
        }, {
        }
    ]
    const socialMedia = [
        {
            icon: facebook,
            path: "https://www.facebook.com/purabiinsurance"
        }, {
            icon: twitter,
            path: "https://twitter.com/purabiinsurance"
        }, {
            icon: youtube,
            path: "https://www.youtube.com/purabiinsurance"
        }, {
            icon: instagram,
            path: "https://www.instagram.com/purabiinsurance"
        },
        {
            icon: linkedin,
            path: "https://www.instagram.com/purabiinsurance"
        },
    ]

    return (
        <header className="w-full bg-p text-white py-4 px-2 md:px-5 xl:px-20 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">


            <div className="flex flex-col md:flex-row flex-wrap items-start px-2 sm:px-0  md:justify-center-safe  sm:items-center gap-2">
                {
                    info.map((item, index) => (
                        <div key={index} className="flex flex-row gap-2 items-center">

                            <img src={item.icon} alt="icon" className="w-4 h-4 object-contain" />
                            <p className="text-xs md:text-sm font-medium">{item.info}</p>
                        </div>
                    ))
                }
            </div>


            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">


                <div className="flex flex-row items-center gap-4 md:gap-6">
                    {
                        portal.map((item, index) => (
                            <a key={index} href={item.path} className="text-base font-medium uppercase tracking-wide hover:text-gray-200 transition-colors">
                                {item.name}
                            </a>
                        ))
                    }
                </div>


                <div className="flex flex-row items-center gap-2">
                    {
                        socialMedia.map((item, index) => (

                            <a key={index} href={item.path} target="_blank" rel="noreferrer" className="w-7.5 h-7.5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                                <img src={item.icon} alt="social" className="w-3.5 h-3.5 object-contain" />
                            </a>
                        ))
                    }
                </div>

            </div>
        </header>
    )
}