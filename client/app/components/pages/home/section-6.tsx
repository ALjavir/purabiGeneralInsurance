import bg from "~/assets/image/page/home/sec-6.png";
import wp1 from "~/assets/image/page/home/op (1).jpg";
import wp2 from "~/assets/image/page/home/op (2).jpg";
import wp3 from "~/assets/image/page/home/op (3).jpg";
import downPeramid from "~/assets/image/icons/downPiramid.svg";

export default function Section6() {
    const tagLine = " INSURANCE SIMPLIFIED ";
    const title = "Our Working Process";
    const description = "Our process makes insurance simple and stress-free, from personalized consultations and tailored solutions to swift activation and ongoing support. We ensure reliable protection and hassle-free claims every step of the way."
    const sec6Data = [
        {
            img: wp1,
            num: "01",
            title: "Get A Quotetation",
            dis: "Answer a couple of questions, we'll provide accurate live quotes."
        },
        {
            img: wp2,
            num: "02",
            title: "Complete The Aplication",
            dis: "Answer a couple of questions, we'llprovide accurate live quotes."
        },
        {
            img: wp3,
            num: "03",
            title: "Get your Insurance",
            dis: "Answer a couple of questions, we'llprovide accurate live quotes."
        },

    ]

    return (
        <section className="relative w-full  flex items-center justify-center p-8 md:p-12 lg:p-20">


            <img
                src={bg}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />


            <div className="absolute inset-0 bg-black/30 z-0"></div>


            <div className="relative z-10 w-full gap-5  bg-white/10 backdrop-blur-md border border-white/20 rounded-4xl p-8 md:p-12 lg:p-20 flex flex-col items-center">


                <div className="flex items-center gap-4">
                    <div className="w-8 md:w-12 h-px bg-white/60"></div>
                    <span className="text-white text-xs md:text-base font-semibold tracking-widest uppercase text-center">
                        {tagLine}
                    </span>
                    <div className="w-8 md:w-12 h-px bg-white/60"></div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                    {title}
                </h1>

                <p className="text-gray-200 text-sm text-center max-w-4xl mx-auto mb-15 leading-relaxed">
                    {description}
                </p>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-12 max-w-7xl mx-auto w-full">
                    {sec6Data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">


                            <div className="relative mb-6">

                                <div className="w-50 h-50  rounded-full border border-white/70 p-5 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>


                                <img
                                    src={downPeramid}
                                    alt="down"
                                    className="w-4 h-4 absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-80"
                                />
                            </div>


                            <div className="w-12 h-12 md:w-14 md:h-14 bg-p rounded-full flex items-center justify-center text-white text-sm md:text-xl shadow-lg mb-4">
                                {item.num}
                            </div>


                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                                {item.title}
                            </h2>

                            <p className="text-gray-200 text-xs md:text-base leading-relaxed max-w-xs">
                                {item.dis}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

}