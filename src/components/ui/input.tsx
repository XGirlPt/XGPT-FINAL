import * as React from "react";

import {cn} from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({className, type, ...props}, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"bg-[#1E2530] w-full text-white text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-md focus:outline-none border border-[#2D3748] hover:border-[#4A5568] transition-colors duration-200",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

export {Input};
