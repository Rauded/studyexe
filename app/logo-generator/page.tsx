"use client";

import React, { useState } from "react";
import { LogoPreview } from "@/components/branding/LogoPreview";
import { BrandingControl, BrandingSlider, BrandingToggle } from "@/components/branding/BrandingSections";
import { MaterialIcon } from "@/components/landing-ui/MaterialIcon";
import Link from "next/link";

export default function LogoGeneratorPage() {
    const [rotation, setRotation] = useState(0);
    const [size, setSize] = useState(160);
    const [primaryColor, setPrimaryColor] = useState("#30D158");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [shape, setShape] = useState<"circle" | "square" | "squircle">("circle");
    const [showText, setShowText] = useState(true);
    const [showIcon, setShowIcon] = useState(true);
    const [borderThickness, setBorderThickness] = useState(0);
    const [glow, setGlow] = useState(true);

    const handleDownloadSVG = () => {
        const svgElement = document.querySelector("#logo-export-area");
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "studyexe-logo.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link href="/" className="text-muted-foreground hover:text-white transition-colors text-sm flex items-center gap-2 mb-4">
                            <MaterialIcon name="arrow_back" size="sm" />
                            Back to Landing
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                            Logo<span className="text-gradient"> Generator</span>
                        </h1>
                        <p className="text-muted-foreground mt-2">Design and export the study.exe brand assets.</p>
                    </div>

                    <button
                        onClick={handleDownloadSVG}
                        className="btn-premium bg-white text-black px-8 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:scale-105 transition-transform"
                    >
                        <MaterialIcon name="download" />
                        Export SVG
                    </button>
                </div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                    {/* Preview Area */}
                    <LogoPreview
                        rotation={rotation}
                        size={size}
                        primaryColor={primaryColor}
                        bgColor={bgColor}
                        shape={shape}
                        showText={showText}
                        showIcon={showIcon}
                        borderThickness={borderThickness}
                        glow={glow}
                    />

                    {/* Controls Area */}
                    <div className="glass p-8 rounded-3xl border border-white/5 space-y-8 overflow-y-auto max-h-[700px] custom-scrollbar">
                        <BrandingControl label="Logo Components">
                            <div className="grid grid-cols-2 gap-3">
                                <BrandingToggle
                                    label="Icon"
                                    active={showIcon}
                                    onClick={() => setShowIcon(!showIcon)}
                                />
                                <BrandingToggle
                                    label="Text"
                                    active={showText}
                                    onClick={() => setShowText(!showText)}
                                />
                            </div>
                        </BrandingControl>

                        <BrandingControl label="Frame Shape">
                            <div className="grid grid-cols-3 gap-3">
                                <BrandingToggle
                                    label="Circle"
                                    active={shape === "circle"}
                                    onClick={() => setShape("circle")}
                                />
                                <BrandingToggle
                                    label="Squircle"
                                    active={shape === "squircle"}
                                    onClick={() => setShape("squircle")}
                                />
                                <BrandingToggle
                                    label="Square"
                                    active={shape === "square"}
                                    onClick={() => setShape("square")}
                                />
                            </div>
                        </BrandingControl>

                        <BrandingControl label={`Size (${size}px)`}>
                            <BrandingSlider
                                min={64}
                                max={320}
                                value={size}
                                onChange={setSize}
                            />
                        </BrandingControl>

                        <BrandingControl label={`Rotation (${rotation}°)`}>
                            <BrandingSlider
                                min={0}
                                max={360}
                                value={rotation}
                                onChange={setRotation}
                            />
                        </BrandingControl>

                        <BrandingControl label="Colors">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Primary (Green)</span>
                                    <input
                                        type="color"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                        className="bg-transparent border-none w-10 h-10 cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Frame Background</span>
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="bg-transparent border-none w-10 h-10 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </BrandingControl>

                        <BrandingControl label="Effects">
                            <div className="space-y-4">
                                <BrandingToggle
                                    label="Glow Effect"
                                    active={glow}
                                    onClick={() => setGlow(!glow)}
                                />
                                <div className="pt-2">
                                    <span className="text-xs text-muted-foreground block mb-2">Border Thickness</span>
                                    <BrandingSlider
                                        min={0}
                                        max={20}
                                        value={borderThickness}
                                        onChange={setBorderThickness}
                                    />
                                </div>
                            </div>
                        </BrandingControl>
                    </div>
                </div>
            </div>
        </div>
    );
}
