import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children, 
  className,
  hover = false,
  onClick,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
className={cn(
        "bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-200",
        hover && "hover:shadow-md hover:scale-[1.01]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;