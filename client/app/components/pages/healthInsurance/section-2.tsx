import amico from "~/assets/image/page/insurance/amico.png";
import self from "~/assets/image/icons/single.svg?react";
import couple from "~/assets/image/icons/emply.svg?react";
import famely from "~/assets/image/icons/family (2).svg?react";
import parents from "~/assets/image/icons/parents.svg?react";
import { act, useState } from "react";
import { CustomDropdown, CustomTextField } from "~/components/common/insurence-artifacts";



export default function DynamicInsuranceForm() {
 const [activeTab, setActiveTab] = useState("self");
    const [parentTarget, setParentTarget] = useState<"both" | "father" | "mother">("both");
    const [childCount, setChildCount] = useState<"1" | "2">("1");
    const [coverage, setCoverage] = useState<string>("");
    const [agreed, setAgreed] = useState<boolean>(true);


    const categories = [
        { name: "For Self", Icon: self, active: "self" },
        { name: "For Couple", Icon: couple, active: "couple" },
        { name: "For Family", Icon: famely, active: "family" },
        { name: "For Parents", Icon: parents, active: "parents" },
    ];

    const coverages = [
        { id: "show_all", name: "Show all plan" },
        { id: "up_to_1_lac", name: "Up to 1 lac" },
        { id: "1_to_5_lac", name: "1 Lac to 5 Lac" },
        { id: "5_to_10_lac", name: "5 lac to 10 lac" },
    ];

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

            <div className="grid grid-cols-3 md:grid-cols-4 lg:flex gap-4 md:gap-8 lg:gap-12 justify-items-center lg:justify-center items-start lg:items-center pb-4 w-full">
                {categories.map((cat) => {
                    const isActive = activeTab === cat.active;

                    return (
                        <div
                            key={cat.active}
                            onClick={() => setActiveTab(cat.active)}

                            className="flex flex-col items-center gap-3 cursor-pointer group"
                        >
                            <div
                                className={`w-16 h-16 md:w-20 md:h-20 xl:w-25 xl:h-25 flex items-center justify-center rounded-full transition-colors duration-300 ${isActive
                                    ? "bg-p text-white"
                                    : "bg-[#AC3E251A] text-p hover:bg-[#AC3E2533]"
                                    }`}
                            >
                                <cat.Icon
                                    className={`w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 transition-colors ${isActive ? "text-white" : "text-p"
                                        }`}
                                />
                            </div>

                            <span
                                className={`text-sm md:text-lg transition-colors text-center ${isActive ? "text-p font-medium" : "text-gray-500 group-hover:text-p"
                                    }`}
                            >
                                {cat.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            <form className="flex flex-col gap-6 md:gap-8" onSubmit={(e) => e.preventDefault()}>
                
                {/* 1. Shared Fields (Always Visible) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomTextField label="Name" placeholder="Enter Your Full Name" name="name" type="text" />
                    <CustomTextField label="Mobile Number" placeholder="Enter Your Phone Number" name="mobile" type="tel" />
                </div>

                {/* 2. DYNAMIC FIELD LOGIC */}

                {/* A. SELF (1 Column Dropdown) */}
                {activeTab === "self" && (
                    <div className="w-full">
                        <CustomDropdown label="Your Age" name="yourAge" />
                    </div>
                )}

                {/* B. COUPLE & FAMILY (2 Column Dropdowns) */}
                {(activeTab === "couple" || activeTab === "family") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomDropdown label="Your Age" name="yourAge" />
                        <CustomDropdown label="Spouse's Age" name="spouseAge" />
                    </div>
                )}

                {/* C. FAMILY (Additional Child Selection) */}
                {activeTab === "family" && (
                    <div className="flex flex-col gap-3">
                        <label className="text-gray-500 text-sm font-medium">Number of Child (Below 18 years)</label>
                        <div className="flex flex-wrap gap-4">
                            {["1", "2"].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setChildCount(num as any)}
                                    className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
                                        childCount === num 
                                        ? "bg-[#F9E7E4] text-[#B1432A] border border-[#F9E7E4]" 
                                        : "bg-[#F6F7F9] text-gray-700 border border-transparent"
                                    }`}
                                >
                                    {num} Child
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* D. PARENTS (Complex Conditional Logic) */}
                {activeTab === "parents" && (
                    <div className="flex flex-col gap-6 md:gap-8">
                        {/* Parent Target Buttons */}
                        <div className="flex flex-col gap-3">
                            <label className="text-gray-500 text-sm font-medium">Insurance For</label>
                            <div className="flex flex-wrap gap-4">
                                {["both", "father", "mother"].map((target) => (
                                    <button
                                        key={target}
                                        type="button"
                                        onClick={() => setParentTarget(target as any)}
                                        className={`px-8 py-3 rounded-lg text-sm font-medium capitalize transition-all min-w-[100px] ${
                                            parentTarget === target 
                                            ? "bg-[#F9E7E4] text-[#B1432A] border border-[#F9E7E4]" 
                                            : "bg-[#F6F7F9] text-gray-700 border border-transparent"
                                        }`}
                                    >
                                        {target}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Age Dropdowns based on target */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(parentTarget === "both" || parentTarget === "father") && (
                                <CustomDropdown label="Fathers Age" name="fatherAge" />
                            )}
                            {(parentTarget === "both" || parentTarget === "mother") && (
                                <CustomDropdown label="Mothers Age" name="motherAge" />
                            )}
                        </div>
                    </div>
                )}

                {/* 3. Health Coverage Amount (Always Visible) */}
                <div className="flex flex-col gap-3 mt-2">
                    <label className="text-gray-500 text-sm font-medium">Health Coverage Amount (৳)</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {coverages.map((cov) => (
                            <button
                                key={cov.id}
                                type="button"
                                onClick={() => setCoverage(cov.id)}
                                className={`px-4 py-3.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                                    coverage === cov.id
                                    ? "bg-[#F9E7E4] text-[#B1432A] border border-[#F9E7E4]"
                                    : "bg-[#F6F7F9] text-gray-700 border border-transparent hover:bg-gray-100"
                                }`}
                            >
                                {cov.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. Terms Checkbox & Submit */}
                <div className="mt-4 flex flex-col gap-6 md:gap-8">
                    
                    {/* Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer w-fit">
                        <div 
                            onClick={() => setAgreed(!agreed)}
                            className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                                agreed ? "bg-[#B1432A]" : "bg-gray-200"
                            }`}
                        >
                            {agreed && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            )}
                        </div>
                        <span className="text-gray-800 text-sm md:text-base font-medium">
                            I agree with the <span className="text-[#B1432A] underline font-bold underline-offset-2">Terms of Service</span>
                        </span>
                    </label>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-[#B1432A] hover:bg-[#9a3821] transition-colors text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium text-lg">
                        See Plans 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </button>
                </div>

            </form>
        </div>
    );
}