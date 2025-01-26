import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface CommonInputProps {
	label?: string;
	value: string;
	onChange: (e: any) => void;
	placeholder: string;
	type?: string;
	required?: boolean;
	className?: string;
	id?: string;
}

const CommonInput = ({label, value, onChange, placeholder, type, required = false, className = "", id}: CommonInputProps) => {
	return (
		<div>
			<Label className='text-pink-500 text-sm font-medium mb-1.5'>
				{label}
				{required && <span className='text-pink-500 ml-1'>*</span>}
			</Label>
			<Input type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} />
		</div>
	);
};

export default CommonInput;
