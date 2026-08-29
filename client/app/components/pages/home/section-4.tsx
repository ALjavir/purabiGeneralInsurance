import CustomButton from "~/components/common/button";

export default function Section4() {
    const title = "Ready to join?";
    const subTitle = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

    return (
        <section id="section-4" className="my-25 md:my-30">
            <div className="bg-blue rounded p-8 sm:p-10 lg:p-15 h-75 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-white">


                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                        {title}
                    </h1>
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                        {subTitle}
                    </p>
                </div>
                <div className="min-w-40">
                    <a
                        href="#"

                        className="inline-block  w-full text-center py-2.5 px-5 border border-blue text-blue bg-white font-normal text-base rounded-lg transition-all"
                    >
                        Register Now
                    </a>
                </div>



            </div>
        </section>
    )
}