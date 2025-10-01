import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-2.5 bg-white border rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        "placeholder:text-slate-400 resize-vertical",
        error ? "border-red-500" : "border-slate-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;