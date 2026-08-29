export default function Section5() {
    const title = "Meet Our Successfull Students";
    const subTitle = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
    const grid = [
        {
            image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Oleg Ivanov",
            designation: "Web Developer",

        },
        {
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            name: "John Doe",
            designation: "Web Developer",

        },
        {
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Aiony Haust",
            designation: "Web Developer",

        },
        {
            image: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "John Doe",
            designation: "Web Developer",

        }
    ]

    return (
        <section id="section-5" className="my-16 lg:my-24 px-4 sm:px-6 lg:px-8">
       
            <div className="mb-8 md:mb-12 text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-3">
                    {title}
                </h1>
                <p className="text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                    {subTitle}
                </p>
            </div>

      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {grid.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200/70 rounded overflow-hidden shadow-sm flex flex-col"
                    >
                        <div className="w-full h-64 sm:h-75">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="p-5 flex flex-col justify-center">
                            <h2 className="text-lg font-bold text-[#111827]">
                                {item.name}
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
                                {item.designation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}