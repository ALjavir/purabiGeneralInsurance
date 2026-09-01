import { useState } from "react";
import { HiPlus, HiX } from "react-icons/hi";

export default function Section3() {
    const [openIndex, setOpenIndex] = useState(-1);


    const title = "Frequently asked questions"
    const secData = [
        {
            q: "What is Health Insurance?",
            a: "Health Insurance is a type of insurance that provides financial protection against medical expenses, accidents, and other unforeseen events that may occur during the course of your life."
        },
        {
            q: "What is the coverage?",
            a: "The coverage provided by Health Insurance varies depending on the plan you choose. Generally, Health Insurance covers medical expenses such as doctor visits, hospital stays, and prescription drugs."
        },
        {
            q: "What is the cost?",
            a: "The cost of Health Insurance varies depending on the plan you choose. Generally, Health Insurance plans have a fixed monthly premium that you pay upfront, and then pay a percentage of your income each month."
        },
        {
            q: "What is the deductible?",
            a: "The deductible is the amount you have to pay out of your income before you can get coverage. Generally, the deductible is set at a certain percentage of your income, such as 10% or 20%."
        },
        {
            q: "What is the maximum?",
            a: "The maximum amount you can get coverage for is set by the plan you choose. Generally, the maximum amount is set at a certain percentage of your income, such as 100% or 150%."
        },
        {
            q: "What is the waiting period?",
            a: "The waiting period is the time you have to wait before you can get coverage after you have paid the deductible. Generally, the waiting period is set at a certain number of months, such as 12 months or 24 months."
        },
        {
            q: "What is the annual premium?",
            a: "The annual premium is the monthly premium you pay upfront for the plan. Generally, the annual premium is set at a certain percentage of your income, such as 10% or 20%."
        }
    ]
    return (
        <section className="w-full max-w-4xl mx-auto px-5 lg:px-20 py-15">
            
           
            <h1 className="text-3xl  lg:text-5xl font-semibold text-center mb-15">
                {title}
            </h1>
            
          
            <div className="flex flex-col gap-4">
                {secData.map((item, index) => {
                    const isOpen = openIndex === index;
                    
                    return (
                        <div 
                            key={index} 
                            className="bg-[#F6F6F7] rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300"
                        >
                         
                            <button
                                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                className="w-full flex items-center justify-between p-4  text-left focus:outline-none"
                            >
                                <h2 className="text-black text-base md:text-lg font-medium">
                                    {item.q}
                                </h2>
                                
                             
                                <div className="shrink-0 text-black">
                                    {isOpen ? (
                                        <HiX className="w-5 h-5" strokeWidth={1} />
                                    ) : (
                                        <HiPlus className="w-5 h-5" strokeWidth={1} />
                                    )}
                                </div>
                            </button>

                          
                            {isOpen && (
                                <div className="px-5 md:px-6 pb-5 md:pb-6">
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
        </section>
    )
}