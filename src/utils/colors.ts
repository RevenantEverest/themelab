import * as regex from './regex';

export type RGB = Record<"r" | "g" | "b", number>;

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

export function hexToRgb(hexColor: string): RGB | null {
    const parsedHex = regex.hexColor.exec(hexColor);

    function parseValue(str: string) {
        return parseInt(str, 16);
    }

    if(parsedHex) {
        return {
            r: parseValue(parsedHex[1]),
            g: parseValue(parsedHex[2]),
            b: parseValue(parsedHex[3])
        };
    }

    return null;
};

export function rgbStringToHex(rgb: string): string | null {
    const match = rgb.match(regex.rgbColor);
    
    if (!match) return null;
    
    const [_, r, g, b] = match.map(Number); // eslint-disable-line @typescript-eslint/no-unused-vars
    
    if (r > 255 || g > 255 || b > 255) return null;

    return rgbToHex({ r, g, b });
};

export function rgbToHex({ r, g, b }: RGB): string {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
};

export function luminance({ r, g, b }: RGB): number {
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
    });

    const value = a[0] * RED + a[1] * GREEN + a[2] * BLUE;

    return value;
};

export function contrast(rgb1: RGB | null, rgb2: RGB | null): number {
    if(!rgb1 || !rgb2) {
        return 0;
    }

    const lum1 = luminance(rgb1);
    const lum2 = luminance(rgb2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    const contrast = (brightest + 0.05) / (darkest + 0.05);

    return contrast;
};

export function hexToContrast(hex1: string, hex2: string): number {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const contrastRes = contrast(rgb1, rgb2);

    return contrastRes;
};

export function hexToRgba(hex: string, alpha = 1): string {
    // Remove the hash if it's there
    hex = hex.replace(/^#/, "");

    // Parse shorthand hex (e.g., #123 -> #112233)
    if (hex.length === 3) {
        hex = hex.split("").map((char) => char + char).join("");
    }

    // Check if it's a valid hex color
    if (hex.length !== 6 && hex.length !== 8) {
        throw new Error("Invalid hex color format. Must be 3, 6, or 8 characters.");
    }

    // Extract RGB values
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // If 8-digit hex, use alpha from hex (or override with provided alpha)
    let a = alpha;
    if (hex.length === 8) {
        a = parseInt(hex.slice(6, 8), 16) / 255;
    }

    // Return the RGBA string
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export function isHighContrast(hexColorA: string, hexColorB: string): boolean {
    const contrastValue = hexToContrast(hexColorA, hexColorB);
    
    return Boolean(contrastValue > 2);
};