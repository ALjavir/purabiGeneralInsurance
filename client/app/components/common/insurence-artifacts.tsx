
import React, { type ChangeEvent } from "react";


interface CustomTextFieldProps {
    label?: string;
    placeholder?: string;
    name: string;
    type?: "text" | "email" | "password" | "number" | "tel"; 
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CustomTextField({ 
    label, 
    placeholder, 
    name, 
    type = "text", 
    value, 
    onChange 
}: CustomTextFieldProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label htmlFor={name} className="text-gray-400 text-sm font-medium">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-[#F6F7F9] border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-[#C24127] focus:ring-1 focus:ring-[#C24127] transition-all placeholder-gray-500"
            />
        </div>
    );
}




export interface DropdownOption {
    label: string;
    value: string | number;
}


interface CustomDropdownProps {
    label?: string;
    placeholder?: string;
   
    name: string;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function CustomDropdown({ 
    label, 
    placeholder = "Select", 
   
    name, 
    value, 
    onChange 
}: CustomDropdownProps) {

    const options = [
    { label: "18-25 Years", value: "18-25" },
    { label: "26-40 Years", value: "26-40" },
    { label: "41-60 Years", value: "41-60" }
];
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label htmlFor={name} className="text-gray-400 text-sm font-medium">
                    {label}
                </label>
            )}
            
            <div className="relative w-full">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full appearance-none bg-[#F6F7F9] border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-[#C24127] focus:ring-1 focus:ring-[#C24127] transition-all cursor-pointer"
                >
                    <option value="" disabled hidden>{placeholder}</option>
                    
                    {options.map((opt, index) => (
                        <option key={index} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                
                {/* Custom SVG Chevron Arrow */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
}