import news2 from "~/assets/image/page/home/news (2).jpg";
import news1 from "~/assets/image/page/home/news (2).png";
import clockIcon from "~/assets/image/icons/clock.svg";
import CustomButton from "~/components/common/button";

export default function Section7() {
    const category = "News & Events";
    const title = "Stay Updated with the Latest Happenings";
    const description = "Stay updated with our latest news, events, and initiatives at Purabi General Insurance. Join us in protecting your future!"
    const newsData = [
        {
            img: news1,
            date: "21 June 2025",
            title: "শোক সংবাদ",
            dis: "Praesent viverra augue assumenda mauris molestie sed vitae, rutrum inventore ullamcorper minima,…"
        },
        {
            img: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            date: "27 June 2025",
            title: "New Insurance Offer",
            dis: "We are pleased to announce the launch of our new insurance offering. Our new policy is designed to meet the needs of our clients and provide them with comprehensive coverage at an affordable price. Get ready to take advantage of this exciting opportunity and start planning your next insurance adventure."
        }, {
            img: news2,
            date: "29 June 2025",
            title: "Notice (28 March, 2022)",
            dis: "Praesent viverra augue assumenda mauris molestie sed vitae, rutrum inventore ullamcorper minima,…"
        }, 
          {
            img: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            date: "27 June 2025",
            title: "New Insurance Offer",
            dis: "We are pleased to announce the launch of our new insurance offering. Our new policy is designed to meet the needs of our clients and provide them with comprehensive coverage at an affordable price. Get ready to take advantage of this exciting opportunity and start planning your next insurance adventure."
        },

    ]

    return (
        <section className="py-14 md:py-25 px-5 md:px-12 lg:px-20 w-full flex flex-col items-center gap-0 md:gap-8">


            <div className="flex flex-col items-center text-center px-4 mb-12 md:mb-16">


                <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 md:w-12 h-px bg-p"></div>
                    <span className="text-p text-xs md:text-base font-semibold tracking-widest uppercase">
                        {category}
                    </span>
                    <div className="w-8 md:w-12 h-px bg-p"></div>
                </div>


                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase mb-5">
                    {title}
                </h1>
                <p className="text-gray-500 text-sm md:text-base  leading-relaxed">
                    {description}
                </p>
            </div>


            <div className="flex flex-row gap-5 overflow-x-auto w-full max-w-[1760px]  snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">

                {newsData.map((item, index) => (
                    <div
                        key={index}

                        className="shrink-0 snap-center p-2.5 w-80 md:w-105  rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.10)] border border-gray-200 flex flex-col"
                    >


                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-48 md:h-65   object-cover rounded-xl mb-5"
                        />
                        <div className="flex flex-col gap-4 p-2">
                            <div className="flex items-center gap-2" >
                                <img src={clockIcon} alt="clock" className="w-3.5 h-3.5 opacity-50" />
                                <p className="text-gray-400 text-xs font-medium">{item.date}</p>
                            </div>


                            <h1 className="text-lg md:text-[22px] font-bold text-gray-800  line-clamp-2 ">
                                {item.title}
                            </h1>


                            <div className="w-full h-px bg-gray-200"></div>


                            <p className="text-gray-500 text-sm md:text-base leading-relaxed  line-clamp-2 ">
                                {item.dis}
                            </p>


                            <div className="w-fit">
                                <CustomButton path="#" name="Read More" showicon={false} />
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </section>
    )
}