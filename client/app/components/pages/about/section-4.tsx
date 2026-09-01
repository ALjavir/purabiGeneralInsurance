
import icon1 from "~/assets/image/icons/about-sec-4 (1).svg";
import icon2 from "~/assets/image/icons/about-sec-4 (2).svg";
import icon3 from "~/assets/image/icons/about-sec-4 (3).svg";
import img from "~/assets/image/page/about/about-sec4img.jpg";
import videoIcon from "~/assets/image/icons/video-popup.svg";

export default function ABSection4() {

    const tagLine = " WHY CHOOSE US "
    const title = "Why You Should Choose Our Insurance Policy's";
    const dis = "Choose our insurance policy for comprehensive coverage, reliable protection, hassle-free claims, and a customer-focused experience."
    const secData = [
        {
            icon: icon1,
            title: "100% Safe Money",
            subtle: "Your money is 100% secure with us, ensuring peace of mind."

        }, {
            icon: icon2,
            title: "Anytime Money Back",
            subtle: "Access your money anytime with Anytime Money Back for maximum convenience."
        }, {
            icon: icon3,
            title: "Fast Process",
            subtle: "Experience a Fast Process with quick and efficient solutions tailored to your needs."
        }
    ]

    return (
        <section className="py-16 md:py-30 px-4 md:px-8 lg:px-25  mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-10">


            <div className="w-full lg:w-1/2 flex flex-col gap-12 md:gap-15 pt-4 order-2 lg:order-1">


                {secData.map((item, index) => (
                    <div
                        key={index}

                        className="relative border border-gray-300 rounded-2xl md:rounded-3xl p md:p-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"

                        style={{ background: 'linear-gradient(90deg, rgba(172, 62, 37, 0.1) 0%, rgba(255, 255, 255, 0) 100%)' }}
                    >

                  
                        <div className="absolute top-[-32%] left-[4%] md:top-[-24%] md:left-[2%] py-7.5 px-4  bg-p flex items-center justify-center shrink-0 border-4 border-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-none z-10">
                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-8 h-8 md:w-15 md:h-15 object-contain "
                            />
                        </div>

                        <div className=" pl-25 md:pl-34 pr-2 py-2">
                            <h3 className="text-base md:text-2xl font-bold text-p mb-1 md:mb-1.5">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-xs md:text-lg max-w-md leading-relaxed">
                                {item.subtle}
                            </p>
                        </div>

                    </div>
                ))}
            </div>


            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 lg:gap-2.5 order-1 lg:order-2">
                <div className="flex items-center gap-4">
                    <div className="w-8 md:w-12 h-px bg-p"></div>
                    <span className="text-p text-xs md:text-base font-semibold tracking-widest uppercase">
                        {tagLine}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black  leading-tight">
                    {title}
                </h1>
                <p className="text-gray-500 text-sm md:text-base font-normal leading-relaxed">
                    {dis}
                </p>
                <div className="relative w-full rounded-4xl border-[6px] md:border-8 border-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden">
                    <img
                        src={img}
                        alt="insurance"
                        className="w-full h-56 sm:h-72 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group cursor-pointer">
                        <img
                            src={videoIcon}
                            alt="Play video"
                            className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>

            </div>

        </section>
    )

}