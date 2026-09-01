/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import HealthIcon from "~/assets/image/icons/helth-c.svg?react";
import CarIcon from "~/assets/image/icons/car-t.svg?react";
import TravelIcon from "~/assets/image/icons/luggage-i.svg?react";
import LifeIcon from "~/assets/image/icons/family-i.svg?react";
import MarineIcon from "~/assets/image/icons/ship-n.svg?react";
import EngiIcon from "~/assets/image/icons/engineering-h.svg?react";
import MoreIcon from "~/assets/image/icons/more.svg?react";
import { HiOutlineArrowRight } from "react-icons/hi";
import CustomButton from "~/components/common/button";

export default function Section2() {
  const [activeTab, setActiveTab] = useState("Health");


  const categories = [
    { name: "Health", Icon: HealthIcon, link: "/healthInsurance" },
    { name: "Car", Icon: CarIcon, link: "/quote/car" },
    { name: "Travel", Icon: TravelIcon, link: "/quote/travel" },
    { name: "Life", Icon: LifeIcon, link: "/quote/life" },
    { name: "Marine", Icon: MarineIcon, link: "/quote/marine" },
    { name: "Engineering", Icon: EngiIcon, link: "/quote/engineering" },
    { name: "More", Icon: MoreIcon, link: "/quote/more" },
  ];

  return (

    <section id="section-2" className="lg:px-10 py-15 md:py-20 gap-12 bg-[#F7ECEA] px-5 ">

 
<div className="grid grid-cols-3 md:grid-cols-4 lg:flex gap-4 md:gap-8 lg:gap-12 justify-items-center lg:justify-center items-start lg:items-center pb-4 w-full">
        {categories.map((cat) => {
          const isActive = activeTab === cat.name;

          return (
            <div
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}

              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 xl:w-25 xl:h-25 flex items-center justify-center rounded-full transition-colors duration-300 ${isActive
                    ? "bg-p text-white"
                    : "bg-[#AC3E251A] text-p hover:bg-[#AC3E2533]"
                  }`}
              >
                <cat.Icon
                  className={`w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 transition-colors ${isActive ? "text-white" : "text-p"
                    }`}
                />
              </div>

              <span
                className={`text-sm md:text-lg transition-colors text-center ${isActive ? "text-p font-medium" : "text-gray-500 group-hover:text-p"
                  }`}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>


      <div className=" mt-10 flex flex-col md:flex-row gap-6 md:gap-8 items-end justify-center max-w-7xl mx-auto">


        <div className="flex flex-col gap-2 w-full md:flex-1">
          <label className="text-black font-bold text-sm md:text-xl">Name</label>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full px-4 py-3.5 rounded bg-white text-gray-800 outline-none border border-transparent focus:border-p placeholder:italic placeholder:text-gray-400 shadow-sm"
          />
        </div>


        <div className="flex flex-col gap-2 w-full md:flex-1">
          <label className="text-black font-bold text-sm md:text-xl">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter Your Valid Phone Number"
            className="w-full px-4 py-3.5 rounded bg-white text-gray-800 outline-none border border-transparent focus:border-p placeholder:italic placeholder:text-gray-400 shadow-sm"
          />
        </div>

        <CustomButton path={categories.find((c) => c.name === activeTab)?.link || "#"} name="Get Price" showicon={true} />


      </div>
    </section>
  );
}