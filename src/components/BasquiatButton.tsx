import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface BasquiatButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "danger" | "scrap";
}

export function BasquiatButton({ variant = "primary", children, className = "", ...props }: BasquiatButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return "bg-[#FF3B30] text-white hover:bg-stone-900 shadow-[6px_6px_0px_0px_#1A1A1A] hover:shadow-none translate-x-0 translate-y-0 hover:translate-x-1 hover:translate-y-1";
      case "scrap":
        return "bg-white text-[#1A1A1A] hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-none translate-x-0 translate-y-0 hover:translate-x-1 hover:translate-y-1";
      case "primary":
      default:
        return "bg-[#FF3B30] text-white shadow-[6px_6px_0px_0px_#000] border-black border-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none";
    }
  };

  return (
    <motion.button
      whileHover={{ rotate: variant === "primary" ? 0 : -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        px-8 py-3 
        font-marker text-xl 
        uppercase tracking-tighter
        transition-all duration-200
        cursor-pointer
        relative
        ${getVariantStyles()}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 italic">{children}</span>
    </motion.button>
  );
}
