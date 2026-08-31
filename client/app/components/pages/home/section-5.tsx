import part1 from "~/assets/image/page/home/partner (1).jpg";
import part2 from "~/assets/image/page/home/partner (2).jpg";
import part3 from "~/assets/image/page/home/partner (3).jpg";
import part4 from "~/assets/image/page/home/partner (4).jpg";
import part5 from "~/assets/image/page/home/partner (5).jpg";
import part6 from "~/assets/image/page/home/partner (6).jpg";

export default function Section5() {
    const title = "Our Genuine Trusted Partners & Clients";
    const partnerData = [
        { name: "walton", img: part1 },
        { name: "palmal group", img: part2 },
        { name: "genaral insurance", img: part3 },
        { name: "health insurance", img: part4 },
        { name: "dorren power", img: part5 },
        { name: "acmi", img: part6 }
    ];


    const infinitePartners = [...partnerData, ...partnerData];

    return (
        <section id="section-5" className="w-full max-w-7xl mx-auto py-12 md:py-16 lg:py-20 px-5 md:px-12 xl:px-0 overflow-hidden">
            
          
            <h1 className="text-center text-lg md:text-4xl   uppercase tracking-wide mb-10 md:mb-15">
                {title}
            </h1>
           
            <div className="w-full border-t border-b md:border border-gray-500 overflow-hidden flex bg-white">
                
              
                <div className="flex w-max animate-marquee">
                    {infinitePartners.map((partner, index) => (
                        <div 
                            key={index} 
                        
                            className="flex shrink-0 items-center justify-center w-36 sm:w-48 md:w-56 h-24 sm:h-32 border-r border-gray-400 px-6 py-4"
                        >
                            <img 
                                src={partner.img} 
                                alt={partner.name} 
                                className="w-full h-full object-contain" 
                            />
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
}