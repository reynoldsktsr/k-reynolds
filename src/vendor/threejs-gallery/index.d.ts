import { JSX as JSX_2 } from 'react';

/**
 * A procedurally-shaded primitive the visitor can drag to orbit and scroll
 * to zoom, auto-rotating slowly whenever they aren't interacting with it.
 * Renders its own `<Canvas>`.
 */
export declare function ObjectViewer({ shape, color, wireframe, autoRotateSpeed, className, }: ObjectViewerProps): JSX_2.Element;

export declare interface ObjectViewerProps {
    /** Which procedural primitive to display. */
    shape?: ObjectViewerShape;
    /** Base color of the object's material. */
    color?: string;
    /** Render the geometry as a wireframe instead of a shaded solid. */
    wireframe?: boolean;
    /** Degrees/second-ish speed used for the slow idle auto-rotation. */
    autoRotateSpeed?: number;
    /** Extra classes applied to the canvas element. */
    className?: string;
}

export declare type ObjectViewerShape = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere';

/**
 * A dense field of GPU-animated particles that gently drifts and reacts to
 * the pointer position. Renders its own `<Canvas>`, so it can be dropped
 * into any React tree as-is.
 */
export declare function ParticleField({ count, color, secondaryColor, size, pointerInfluence, className, }: ParticleFieldProps): JSX_2.Element;

export declare interface ParticleFieldProps {
    /** Number of particles to render. */
    count?: number;
    /** Color at one end of the particle gradient. */
    color?: string;
    /** Color at the other end of the particle gradient. */
    secondaryColor?: string;
    /** Base on-screen point size in pixels. */
    size?: number;
    /** How strongly the field drifts toward the pointer (0 disables it). */
    pointerInfluence?: number;
    /** Extra classes / inline styling target applied to the canvas element. */
    className?: string;
}

/**
 * A full-viewport animated background driven by a custom GLSL shader
 * (an animated gradient/wave/noise blend). Renders its own `<Canvas>` and
 * is meant to sit behind other content (e.g. `position: absolute; inset: 0`).
 */
export declare function ShaderBackground({ colorA, colorB, speed, className, }: ShaderBackgroundProps): JSX_2.Element;

export declare interface ShaderBackgroundProps {
    /** Color used for the low/dark end of the gradient. */
    colorA?: string;
    /** Color used for the high/bright end of the gradient. */
    colorB?: string;
    /** Animation speed multiplier. */
    speed?: number;
    /** Extra classes applied to the canvas element. */
    className?: string;
}

export { }
