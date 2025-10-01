import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-2.5 bg-white border rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        "placeholder:text-slate-400",
        error ? "border-red-500" : "border-slate-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;