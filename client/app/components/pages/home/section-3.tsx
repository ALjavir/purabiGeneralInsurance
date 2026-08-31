
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import cat1 from "~/assets/image/page/home/ins-cat (1).png";
import cat2 from "~/assets/image/page/home/ins-cat (2).png";
import cat3 from "~/assets/image/page/home/ins-cat (3).png";
import cat4 from "~/assets/image/page/home/ins-cat (4).png";
import cat5 from "~/assets/image/page/home/ins-cat (5).png";
import cat6 from "~/assets/image/page/home/ins-cat (6).png";
import cat7 from "~/assets/image/page/home/ins-cat (7).png";
import cat8 from "~/assets/image/page/home/ins-cat (8).png";
import CustomButton from "~/components/common/button";
export default function Section3() {
    const title = "Categories of Insurance"
    const description = "At SIPLC, we exceed customer expectations by being available both physically and virtually on their preferred channels. As a leading general insurer in Bangladesh, we are committed to continuous development and improvement, ensuring every citizen can access insurance benefits without hindrance"
    const categories = [
        { name: "FIRE INSURANCE", link: "/", Icon: cat1, dis: "With our Fire insurance policies, you can choose from various coverage options that protect your property, equipment." },
        { name: "Health INSURANCE", link: "/", Icon: cat2, dis: "With our Health insurance policies, you can choose from various coverage options that protect your property, equipment." },
        { name: "MOTOR INSURANCE", link: "/", Icon: cat3, dis: "Motor Car insurance provides comprehensive protection for your vehicles, covering accidents, theft." },
        { name: "MARINE INSURANCE", link: "/", Icon: cat4, dis: "We offer comprehensive and flexible coverage for your vessels, protecting against physical damage." },
        { name: "TRAVEL INSURANCE", link: "/", Icon: cat5, dis: "Our Travel Insurance (Overseas Mediclaim Insurance) ensures comprehensive coverage for medical emergencies." },
        { name: "Engineering", link: "/", Icon: cat6, dis: "With our Engineering insurance policies, you can choose from various coverage options that protect your property, equipment,," },
        { name: "AVIATION INSURANCE", link: "/", Icon: cat7, dis: "With our Aviation insurance policies, you can choose from various coverage options that protect your property, equipment,," },
        { name: "MISCELLANEOUS INSURACE", link: "/", Icon: cat8, dis: "With our Miscellaneous insurance policies, you can choose from various coverage options that protect your property, equipment,," },
    ];

    return (
        <section id="section-3" className="w-full mx-auto py-12 md:py-16 lg:py-20 gap-2 flex flex-col items-center">


            <div className="flex flex-col items-center text-center mb-8 md:mb-10 px-5 md:px-8">
                <h1 className="text-3xl lg:text-5xl font-semibold text-black uppercase mb-3 md:mb-4">
                    {title}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm lg:text-base max-w-7xl leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="flex flex-row gap-4 md:gap-6 overflow-x-auto w-full px-5 md:px-12 lg:px-20 pb-16 lg:pb-20 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                {categories.map((cat, index) => (
                    <div
                        key={index}

                        className="relative shrink-0 snap-center w-60 sm:w-64 md:w-72 lg:w-88 bg-[#F7ECEA] rounded-3xl px-4 md:px-5 pt-6 md:pt-8 pb-8 md:pb-10 flex flex-col items-center text-center"
                    >

                        <img
                            src={cat.Icon}
                            alt={cat.name}
                            className="w-14 h-14 md:w-16 md:h-16 lg:w-22 lg:h-22 object-contain mb-3 md:mb-4"
                        />


                        <h2 className="text-base  lg:text-lg font-bold text-black uppercase mb-2 md:mb-3">
                            {cat.name}
                        </h2>


                        <p className="text-gray-500 text-xs lg:text-sm leading-relaxed mb-2">
                            {cat.dis}
                        </p>


                        <div className="absolute -bottom-7 md:-bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center">


                            <a
                                href={cat.link}
                                className="w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 bg-p rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                                aria-label={`Learn more about ${cat.name}`}
                            >
                                <HiOutlineArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                            </a>
                        </div>

                    </div>
                ))}
            </div>


            <div className="mt-6 md:mt-8">
                <CustomButton path="#" name="See More" showicon={true} />
            </div>

        </section>
    )
}