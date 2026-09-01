import heroImg from "~/assets/image/page/insurance/hero.jpg"


export default function HealthInsuranceHero() {
    const path = "Home > Health Insurance ";
    const heroTxt = "Choose the best Health Insurance Plan for Yourself and your Family"
    return (
     <section className="relative w-full  flex items-center justify-center p-5 md:p10 lg:px-20 lg:py-15 overflow-hidden">
    

    <img 
        src={heroImg} 
        alt="hero background" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
    />

  
    <div className="relative z-10 w-full  bg-black/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start">
        
       
        <div className="mb-4 md:mb-6 border border-white/60 rounded-full px-4 md:px-5 py-1.5 md:py-2">
            <h1 className="text-white text-xs md:text-sm font-medium tracking-wide">
                {path}
            </h1>
        </div>
        
      
        <h1 className="text-3xl md:text-4xl lg:text-[44px] font-medium text-white leading-snug md:leading-tight max-w-4xl">
            {heroTxt}
        </h1>
        
    </div>
</section>
    )
}
