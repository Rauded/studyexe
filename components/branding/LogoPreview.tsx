"use client";

import React from "react";

interface LogoPreviewProps {
    rotation: number;
    size: number;
    primaryColor: string;
    bgColor: string;
    shape: "circle" | "square" | "squircle";
    showText: boolean;
    showIcon: boolean;
    borderThickness: number;
    glow: boolean;
    contentType: "icon" | "text";
}

export const LogoPreview = ({
    rotation,
    size,
    primaryColor,
    bgColor,
    shape,
    showText,
    showIcon,
    borderThickness,
    glow,
    contentType
}: LogoPreviewProps) => {
    const getShapeRadius = () => {
        if (shape === "circle") return "50%";
        if (shape === "squircle") return "25%";
        return "0%";
    };

    return (
        <div
            className="flex items-center justify-center p-12 bg-zinc-950 rounded-3xl border border-white/5 relative overflow-hidden"
            style={{ minHeight: "400px" }}
        >
            {/* Background Grid for context */}
            <div className="absolute inset-0 bg-matrix-grid opacity-20 pointer-events-none" />

            <div
                id="logo-export-area"
                className="relative transition-all duration-500 ease-out flex flex-col items-center gap-6"
                style={{
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                <div
                    className="relative flex items-center justify-center transition-all duration-300"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: bgColor,
                        borderRadius: getShapeRadius(),
                        border: borderThickness > 0 ? `${borderThickness}px solid ${primaryColor}44` : "none",
                        boxShadow: glow ? `0 0 40px ${primaryColor}33` : "none",
                    }}
                >
                    {contentType === "icon" ? (
                        showIcon && (
                            <svg
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "60%", height: "60%" }}
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                    fill={primaryColor}
                                />
                            </svg>
                        )
                    ) : (
                        <div
                            className="font-black tracking-tighter select-none"
                            style={{
                                fontSize: `${size * 0.25}px`,
                                color: primaryColor,
                                lineHeight: 1
                            }}
                        >
                            study
                        </div>
                    )}
                </div>

                {showText && (
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: "white" }}>
                        study<span style={{ color: primaryColor }}>.exe</span>
                    </h1>
                )}
            </div>
        </div>
    );
};
