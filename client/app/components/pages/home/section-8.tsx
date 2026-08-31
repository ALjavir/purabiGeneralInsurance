import deviceMockUp from "~/assets/image/page/home/downlodFrom.png";
import appStore from "~/assets/image/page/home/Store download button.png";
import playStore from "~/assets/image/page/home/Store download button (1).png";

export default function Section8() {
    const category = "Get Our Mobile App";
    const title = "Experienced Our Mobile App";
    const description = "Simplify your insurance experience with our mobile app. Access your policy details, track claims, and receive instant updates anytime, anywhere. Stay in control of your coverage with just a few taps. Download now for convenience and peace of mind!"

    return (
   <section className="w-full flex justify-center py-2.5 md:py-10 px-5 md:px-12 lg:px-20">
    

    <div 
        className="w-full  rounded-4xl border border-gray-200 overflow-hidden flex flex-col items-center text-center pt-12 md:pt-20 px-6 md:px-12"
        style={{ background: 'linear-gradient(180deg, rgba(172, 62, 37, 0) 0%, rgba(172, 62, 37, 0.1) 100%)' }}
    >
        

        <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 md:w-12 h-px bg-p"></div>
            <span className="text-p text-xs md:text-sm font-semibold tracking-widest uppercase">
                {category}
            </span>
            <div className="w-8 md:w-12 h-px bg-p"></div>
        </div>

      
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black uppercase mb-6 max-w-4xl mx-auto">
            {title}
        </h1>
        
      
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-6xl mx-auto mb-10">
            {description}
        </p>
        
      
        <div className="flex flex-row items-center justify-center gap-4 mb-12 md:mb-16">
            <a href="#" >
                <img 
                    src={playStore} 
                    alt="Get it on Google Play" 
                    className="w-25 md:w-40 h-auto object-contain" 
                />
            </a>
            <a href="#">
                <img 
                    src={appStore} 
                    alt="Download on the App Store" 
                    className="w-25 md:w-40 h-auto object-contain" 
                />
            </a>
        </div>

      
        <div className="w-full max-w-md md:max-w-100 mt-auto flex justify-center">
            <img 
                src={deviceMockUp} 
                alt="Mobile App Interface" 
                className="w-full h-auto object-contain object-bottom align-bottom" 
            />
        </div>

    </div>
</section>
    )

}