import { useEffect, useState } from "react";
import CustomButton from "~/components/common/button";

export default function HomeHeroSection() {
    const herodata = [
        {
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Learn Today. Lead Tomorrow",
            subTitle: "Build valuable skills, discover new possibilities, and take the next step toward your future"
        },
        {
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Start Learning. Start Growing",
            subTitle: "Explore engaging courses and develop the skills you need to turn your goals into reality"
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?q=80&w=722&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Unlock Your Potential",
            subTitle: "Learn at your own pace, expand your knowledge, and become confident in what you can achieve"
        },
        {
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Your Journey to Better Learning",
            subTitle: "Discover new skills, gain practical knowledge, and make learning a part of your everyday growth"
        },
    ]


    const [currentIndex, setCurrentIndex] = useState(1);

    const prevSlide = () => {
        console.log("now prevSlide index is", currentIndex);
        setCurrentIndex((prev) => (prev === 0 ? herodata.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        console.log("now nextSlide index is", currentIndex);
        setCurrentIndex((prev) => (prev === herodata.length - 1 ? 0 : prev + 1));
    };


    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [currentIndex]);

    if (!herodata || herodata.length === 0) return null;
    return (
        <section id="home-hero-section" className="mx-auto">
            <div className="relative w-full h-75 lg:h-180 md:h-100 rounded overflow-hidden shadow-xl">


                {herodata.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                            }`}
                    >

                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/55" />

                        {/* Slide Text Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6 md:px-16 z-20">
                            <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
                                {item.title}
                            </h1>
                            <p className="text-white text-xs md:text-base lg:text-lg max-w-2xl mt-4 font-normal">
                                {item.subTitle}
                            </p>
                            <CustomButton path="#">
                                <p>Get Started</p>

                            </CustomButton>
                        </div>
                    </div>
                ))}


                <button
                    onClick={prevSlide}
                    className="hidden sm:inline absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-4xl text-muted hover:text-white transition-colors focus:outline-none"
                    aria-label="Previous Slide"
                >
                    ˂
                </button>


                <button
                    onClick={nextSlide}
                    className="hidden  sm:inline absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-4xl text-muted hover:text-white transition-colors focus:outline-none"
                    aria-label="Next Slide"
                >
                    ˃
                </button>

                {/* Bottom Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {herodata.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-8 md:w-18 bg-blue"
                                : "w-2.5 md:w-8 bg-white/50 hover:bg-white"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}