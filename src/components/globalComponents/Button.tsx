import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "../../../lib/utils";


export interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  children: React.ReactNode;
  buttonTextClassName?: string;
  bgColor?: string;
}

export default function Button({
  children,
  buttonTextClassName,
  bgColor = "#252628",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      className={cn(
        "w-[98%] self-center h-14 justify-center items-center rounded-xl  border border-[#3a3a3a] shadow-lg",
        props.className
      )}
      style={{ backgroundColor: bgColor }}
    >
     

      {/* Button Text */}
      <Text
        className={cn(
          "text-white text-sm text-center",
          buttonTextClassName
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}