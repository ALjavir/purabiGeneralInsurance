import imgRight from "~/assets/image/page/about/about-sec2 (2).jpg";
import imgLeft1 from "~/assets/image/page/about/about-sec2 (1).jpg";
import imgLeft2 from "~/assets/image/page/about/about-sec2 (4).jpg";
import imgLeft3 from "~/assets/image/page/about/about-sec2 (3).jpg";
import checkMark from "~/assets/image/icons/checkMark.svg";
import growthIcon from "~/assets/image/icons/growthIcon.svg";
import crazyLeft from "~/assets/image/page/about/carzyLeftImg.png";

export default function Section2() {
    const experience = "27+";
    const numOfclienct = "1000k+";
    const categories = "ABOUT US";
    const title = "We’re Providing Best Insurance Policy's";
    const description = "Purabi General Insurance Company Limited (PGICL), established on June 29, 1998, is a leading insurer in Bangladesh, providing comprehensive general insurance services. Licensed under the Insurance Act, 1938, PGICL offers a wide range of protection beyond life insurance, ensuring your peace of mind with reliable and innovative solutions.";
    const sucessrate = "90%";
    const secData = [
        { text: "Comprehensive Coverage" },
        { text: "Customer-Centric Approach" },
        { text: "Commitment to Excellence" }
    ];

    return (
        <section className="w-full py-16 lg:py-25 px-4 md:px-8 lg:px-25">
            <div className="mx-auto flex flex-col xl:flex-row items-center gap-16 lg:gap-20">


                <div className="relative w-full md:max-w-3xl xl:max-w-xl 2xl:max-w-3xl shrink-0">

                    <img
                        src={crazyLeft}
                        alt="Crazy Insurance"
                        className="w-full h-full object-cover rounded-3xl "
                    />


                    <div className="absolute top-[15%] right-[18%] flex flex-col  text-white text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-2">{experience}</h2>
                        <p className="text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase mt-0.5 sm:mt-1 leading-tight tracking-wide">
                            Years of<br />Experience
                        </p>
                    </div>


                    <div className="absolute bottom-[18%] left-[30%] flex flex-col">
                        <h3 className="text-xl md:text-3xl font-semibold ">{numOfclienct}</h3>
                        <p className="text-p text-[10px] md:text-base font-semibold uppercase tracking-widest mt-1">Satisfied Clients</p>
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full flex flex-col justify-center">

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 md:w-12 h-px bg-p"></div>
                        <span className="text-p text-xs md:text-sm font-bold tracking-widest uppercase">
                            {categories}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-6 leading-tight">
                        {title}
                    </h1>

                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
                        {description}
                    </p>


                    
                    <div className="bg-[#F8F9FA] rounded-4xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-center border border-gray-100">

                   
                        <div className="flex-1 w-full flex flex-col justify-between gap-6">

                        
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-p flex items-center justify-center shrink-0 shadow-sm">
                                    <img src={growthIcon} alt="growth" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-4xl md:text-5xl font-bold text-black leading-none mb-1">
                                        {sucessrate}
                                    </h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1">
                                        Success Rate
                                    </p>
                                </div>
                            </div>

                          
                            <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                                <ul className="flex flex-col gap-3">
                                    {secData.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <img src={checkMark} alt="check" className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                            <span className="text-p text-sm md:text-base font-medium">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                        {/* RIGHT SIDE: Image */}
                        <div className="w-full sm:w-[48%] shrink-0">
                            <img
                                src={imgRight}
                                alt="Insurance Agent"
                             
                                className="w-full aspect-4/3 object-cover rounded-xl sm:rounded-2xl shadow-sm"
                            />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}