import React from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Mail} from "lucide-react";
import {cn} from "@/lib/utils";

interface InputWithIconProps {
	label?: string;
	required?: boolean;
	placeholder?: string;
	value: string;
	onChange: (e: any) => void;
	error?: string;
	className?: string;
	disabled?: boolean;
	hideLabel?: boolean;
	showAsterisk?: boolean;
	iconClassName?: string;
	inputClassName?: string;
	labelClassName?: string;
	size?: "small" | "default" | "large";
	id?: string;
	type?: string;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconPosition?: "left" | "right";
}

const InputWithIcon = ({
	label = "Input",
	required = true,
	placeholder = "Enter text",
	value,
	onChange,
	error,
	className,
	disabled = false,
	hideLabel = false,
	showAsterisk = true,
	iconClassName,
	inputClassName,
	labelClassName,
	size = "default",
	id = "input",
	type = "text",
	icon: Icon = Mail,
	iconPosition = "left",
}: InputWithIconProps) => {
	const sizeClasses = {
		small: "h-8 text-sm",
		default: "h-10",
		large: "h-12 text-lg",
	};

	const iconPositionClasses = {
		left: "left-3 pl-10",
		right: "right-3 pr-10",
	};

	const getIconWrapperClass = () => {
		const baseClass = "w-4 h-4 absolute top-1/2 -translate-y-1/2 text-gray-800 dark:text-gray-400 ";
		return cn(baseClass, iconPosition === "left" ? "left-3" : "right-3", iconClassName);
	};

	return (
		<div className={cn("space-y-2", className)}>
			{!hideLabel && (
				<Label htmlFor={id} className={cn("text-pink-500 text-sm font-medium mb-1.5", labelClassName)}>
					{label}
					{showAsterisk && required && "*"}
				</Label>
			)}
			<div className='relative'>
				{Icon && <Icon className={getIconWrapperClass()} />}
				<Input
					id={id}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					disabled={disabled}
					required={required}
					className={cn(
						"text-pink-500 text-sm font-medium mb-1.5 bg-gray-200 dark:bg-gray-600",

						sizeClasses[size],
						iconPositionClasses[iconPosition],
						inputClassName
					)}
				/>
				{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
			</div>
		</div>
	);
};

export default InputWithIcon;
