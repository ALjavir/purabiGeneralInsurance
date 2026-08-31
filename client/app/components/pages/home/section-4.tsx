import img1 from "~/assets/image/page/home/sec-4.png";
import CustomButton from "~/components/common/button";
export default function Section4() {
    const tagLine = " BE HAPPY TO GET INSURANCE ";
    const title = "Start Tracking Your Claims";
    const dis = "Enjoy peace of mind with hassle-free insurance. Track your claims effortlessly and stay informed every step of the way."
    const mail = "purabiinsurance@gmail.com"


    return (
        <section className="flex flex-col lg:flex-row items-center justify-between   mx-auto px-5 md:px-12 lg:px-20 py-12 gap-8">
  
        <img 
            src={img1} 
            alt="Family" 
            className="w-80 lg:w-full max-w-md object-contain" 
        />
  

    <div className="flex-1 w-full bg-[#FCF5F4] rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-300">
        <span className="block text-base sm:text-sm font-semibold text-gray-600 uppercase tracking-widest mb-3">
            {tagLine}
        </span>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A3534] mb-4">
            {title} 
        </h1>
        
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
            {dis}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center flex-wrap gap-5 md:gap-6 lg:gap-8">
            
            <CustomButton path="#" name="Claim Coverage" showicon={true} />
            <div className="flex flex-row items-center gap-3">
               
                <div className="w-8 h-px bg-p/60"></div>
                
                <span className="text-sm font-semibold text-black uppercase tracking-wider">or</span>
                
             
                <div className="w-8 h-px bg-p/60"></div>
            </div>
            
          
            <div className="flex flex-row items-center gap-2">
                <span className="text-gray-500 text-xs sm:text-sm">
                    Mail Us Anytime:
                </span>
                <a 
                    href={`mailto:${mail}`} 
                    className="text-sm md:text-lg  text-gray-800 font-medium hover:text-p transition-colors"
                >
                    {mail}
                </a>
            </div>
            
        </div>
    </div>
</section>
    )
}