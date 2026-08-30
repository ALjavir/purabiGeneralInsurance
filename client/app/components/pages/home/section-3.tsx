import { link } from "fs";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import cat1 from "~/assets/image/page/home/ins-cat (1).png";
import cat2 from "~/assets/image/page/home/ins-cat (2).png";
import cat3 from "~/assets/image/page/home/ins-cat (3).png";
import cat4 from "~/assets/image/page/home/ins-cat (4).png";
import cat5 from "~/assets/image/page/home/ins-cat (5).png";
import cat6 from "~/assets/image/page/home/ins-cat (6).png";
import cat7 from "~/assets/image/page/home/ins-cat (7).png";
import cat8 from "~/assets/image/page/home/ins-cat (8).png";
export default function Section3() {
  const title = "Categories of Insurance"
  const description = "At SIPLC, we exceed customer expectations by being available both physically and virtually on their preferred channels. As a leading general insurer in Bangladesh, we are committed to continuous development and improvement, ensuring every citizen can access insurance benefits without hindrance"
  const categories = [
    { name: "FIRE INSURANCE", link: "/", Icon: cat1, dis: "With our Fire insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "Health INSURANCE", link: "/", Icon: cat2, dis: "With our Health insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "MOTOR INSURANCE", link: "/", Icon: cat3, dis: "With our Motor insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "MARINE INSURANCE", link: "/", Icon: cat4, dis: "With our Marine insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "TRAVEL INSURANCE", link: "/", Icon: cat5, dis: "With our Travel insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "Engineering", link: "/", Icon: cat6, dis: "With our Engineering insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "AVIATION INSURANCE", link: "/", Icon: cat7, dis: "With our Aviation insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    { name: "MISCELLANEOUS INSURACE", link: "/", Icon: cat8, dis: "With our Miscellaneous insurance policies, you can choose from various coverage options that protect your property, equipment,," },
  ];

  return (
  <section id="section-3" className="w-full max-w-7xl mx-auto py-16 flex flex-col items-center">
    
    {/* HEADER AREA */}
    <div className="flex flex-col items-center text-center mb-10 px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase mb-4">
            {title}
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-4xl leading-relaxed">
            {description}
        </p>
    </div>

    {/* SCROLLABLE CARDS ROW (Scrolls horizontally on ALL screens) */}
    {/* pb-12 is crucial to prevent the overlapping bottom buttons from being clipped */}
    <div className="flex flex-row gap-4 md:gap-6 overflow-x-auto w-full px-4 md:px-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat, index) => (
            <div 
                key={index} 
                // flex-shrink-0 keeps the cards from squishing, defining fixed widths for responsiveness
                className="relative flex-shrink-0 snap-center w-[250px] md:w-[280px] lg:w-[300px] bg-[#FCF5F4] rounded-2xl px-5 pt-8 pb-10 flex flex-col items-center text-center"
            >
                {/* Icon */}
                <img 
                    src={cat.Icon} 
                    alt={cat.name} 
                    className="w-14 h-14 md:w-16 md:h-16 object-contain mb-4" 
                />
                
                {/* Card Title */}
                <h2 className="text-xs md:text-sm font-bold text-black uppercase mb-3">
                    {cat.name}
                </h2>
                
                {/* Card Description */}
                <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed line-clamp-4">
                    {cat.dis}
                </p>

                {/* Overlapping Circular Button */}
                <a 
                    href={cat.link}
                    className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-p rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-md"
                    aria-label={`Learn more about ${cat.name}`}
                >
                    <HiOutlineArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </a>
            </div>
        ))}
    </div>

    {/* BOTTOM "SEE MORE" BUTTON */}
    <div className="mt-8">
        <a 
            href="/categories" 
            className="inline-flex items-center justify-center gap-2 bg-p text-white px-6 py-2.5 md:px-8 md:py-3 rounded-md text-sm md:text-base font-medium hover:opacity-90 transition-opacity"
        >
            See More
            <HiOutlineArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
        </a>
    </div>

</section>
  )
}