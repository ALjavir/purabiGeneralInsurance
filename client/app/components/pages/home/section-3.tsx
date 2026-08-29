
import CustomButton from "~/components/common/button";

export default function Section3() {
    const image = "https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const title = "Explore The elearning Institute";
    const subTitle1 = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure";
    const subTitle2 = " Anything embarrassing hidden in the middle of text.All the Lorem Ipsum generators on the Internet tend to repeat predefined.";
    const grid = [
        {
            title: "3.2K+",
            subTitle: "Online Course"
        },
        {
            title: "600+",
            subTitle: "Expert member"
        },
        {
            title: "1k+",
            subTitle: "Rating & Review"
        }
    ]

    return (
<section id="section-3" className="my-12">

  <div className="bg-[#F4F9FC] rounded overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">


    <div className="w-full h-64 sm:h-80 md:h-full">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

  
    <div className="p-6 sm:p-8 lg:py-30 lg:px-12 flex flex-col justify-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
        {title}
      </h1>

      <p className="line-clamp-3 md:line-clamp-4 lg:line-clamp-none text-muted text-sm lg:text-base leading-relaxed">
        {subTitle1}
      </p>

      <a
        href="#"
        className="text-blue font-medium lg:hidden inline-block mt-1 hover:underline"
      >
        ...See More
      </a>

      <p className="hidden lg:block text-muted text-sm lg:text-base leading-relaxed mt-4">
        {subTitle2}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-6 lg:my-8">
        {grid.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              {item.title}
            </h2>
            <p className="text-muted text-xs sm:text-sm font-medium mt-1">
              {item.subTitle}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-start">
        <CustomButton path={""}>
          <span>Read More</span>
        </CustomButton>
      </div>
    </div>

  </div>
</section>
    );
}