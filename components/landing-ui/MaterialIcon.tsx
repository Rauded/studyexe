"use client";

import { cn } from "@/lib/utils";

interface MaterialIconProps {
    name: string;
    className?: string;
    filled?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "text-[18px]",
    md: "text-[24px]",
    lg: "text-[32px]",
    xl: "text-[48px]",
};

export function MaterialIcon({
    name,
    className,
    filled = false,
    size = "md"
}: MaterialIconProps) {
    return (
        <span
            className={cn(
                "material-symbols-outlined select-none",
                sizeClasses[size],
                className
            )}
            style={{
                fontVariationSettings: filled
                    ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24"
            }}
        >
            {name}
        </span>
    );
}
