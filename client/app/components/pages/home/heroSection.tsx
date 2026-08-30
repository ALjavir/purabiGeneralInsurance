import heroImg from "~/assets/image/page/home/heroImg.jpg";
import ytButton from "~/assets/image/icons/ytVideo.svg";
import CustomButton from "~/components/common/button";

export default function HomeHeroSection() {
    const tagLine = "Protecting Value Through Innovation"
    const title = "Leading Insurance Solutions for Your Peace of Mind"
    const description = "Purabi General Insurance Company Limited (PGICL), established in 1988, is a leading insurer in Bangladesh, providing comprehensive asset protection for corporate organizations."

    return (
        <section id="home-hero-section" className="relative w-full h-125 md:h-150 lg:h-200 flex items-center">
    
    <img
        src={heroImg}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
    />
    
   
    <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent md:from-black/90 md:via-black/50 z-0"></div>
    
   
    <div className="relative z-10 w-full px-4 md:px-8 lg:px-20 max-w-6xl flex flex-col items-start">
        
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 lg:mb-6">
            <div className="w-8 md:w-12 h-px bg-white"></div>
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-xl font-semibold">
                {tagLine}
            </p>
        </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-snug md:leading-tight mb-4 md:mb-6">
            {title}
        </h1>
        
      
        <p className="text-gray-200 line-clamp-3 md:line-clamp-99 text-xs md:text-base lg:text-xl mb-8 md:mb-10 max-w-[90%] md:max-w-2xl lg:max-w-4xl leading-relaxed">
            {description}
        </p>
        
      
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
            <CustomButton path="#" name="DISCOVER MORE" showicon={false} />
            
          
            <div className="flex flex-row gap-3 md:gap-4 items-center cursor-pointer group">
                <img className="w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-105" src={ytButton} alt="Watch Video" />
                <p className="text-gray-200 text-sm md:text-base lg:text-xl font-bold tracking-wider group-hover:text-white transition-colors">
                    WATCH VIDEO
                </p>
            </div>
        </div>
        
    </div>
</section>
    )
}