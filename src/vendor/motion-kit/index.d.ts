import { CSSProperties } from 'react';
import { JSX as JSX_2 } from 'react';
import { ReactNode } from 'react';

/**
 * Counts up (or down) to `value` once scrolled into view, using a simple
 * eased `requestAnimationFrame` tween over a fixed `duration`.
 */
export declare function AnimatedCounter({ value, startValue, duration, formatter, once, threshold, className, style, }: AnimatedCounterProps): JSX_2.Element;

export declare interface AnimatedCounterProps {
    /** The number to count up (or down) to. */
    value: number;
    /** Value the counter starts from. */
    startValue?: number;
    /** Duration of the count animation, in ms. */
    duration?: number;
    /** Formats the (possibly fractional) interpolated value for display. */
    formatter?: (value: number) => string;
    once?: boolean;
    threshold?: number;
    className?: string;
    style?: CSSProperties;
}

/**
 * An infinite horizontal ticker. Renders two copies of `children` side by
 * side and translates them with `requestAnimationFrame`, wrapping the
 * offset seamlessly so the loop never visibly resets.
 */
export declare function Marquee({ children, speed, direction, pauseOnHover, gap, className, style, }: MarqueeProps): JSX_2.Element;

export declare interface MarqueeProps {
    children: ReactNode;
    /** Speed in pixels per second. */
    speed?: number;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
    /** Gap between repeated copies of the content, in px. */
    gap?: number;
    className?: string;
    style?: CSSProperties;
}

/**
 * Moves its children vertically at a configurable fraction of scroll speed,
 * driven by a scroll listener throttled to `requestAnimationFrame`.
 */
export declare function Parallax({ children, speed, className, style }: ParallaxProps): JSX_2.Element;

export declare interface ParallaxProps {
    children: ReactNode;
    /**
     * How fast the element moves relative to normal scroll. `0` is static,
     * `1` roughly tracks the scroll, negative values move the opposite way.
     */
    speed?: number;
    className?: string;
    style?: CSSProperties;
}

/**
 * Fades and slides its children in the first time they scroll into view,
 * using a plain `IntersectionObserver` + CSS transition — no animation
 * library involved.
 */
export declare function Reveal({ children, direction, delay, duration, once, distance, threshold, rootMargin, className, style, }: RevealProps): JSX_2.Element;

export declare type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export declare interface RevealProps {
    children: ReactNode;
    /** Direction the content travels in from as it enters. */
    direction?: RevealDirection;
    /** Delay before the animation starts, in ms. */
    delay?: number;
    /** Animation duration, in ms. */
    duration?: number;
    /** Only animate the first time the element enters the viewport. */
    once?: boolean;
    /** Distance travelled during the entrance, in px. */
    distance?: number;
    /** IntersectionObserver threshold (0–1). */
    threshold?: number;
    /** Root margin passed to the IntersectionObserver, e.g. to trigger early. */
    rootMargin?: string;
    className?: string;
    style?: CSSProperties;
}

export declare interface SpringConfig {
    /** Mass of the animated value. Higher = slower to accelerate. */
    mass?: number;
    /** Spring stiffness. Higher = snappier. */
    stiffness?: number;
    /** Damping. Higher = less oscillation. */
    damping?: number;
    /** Velocity/displacement threshold below which the spring is considered at rest. */
    precision?: number;
}

/**
 * Wraps a list of children and staggers each one's entrance animation,
 * delegating the actual per-child fade/slide to `Reveal`.
 */
export declare function Stagger({ children, staggerMs, direction, duration, once, distance, threshold, className, style, itemClassName, }: StaggerProps): JSX_2.Element;

export declare interface StaggerProps {
    /** Each direct child is revealed independently, offset by `staggerMs`. */
    children: ReactNode;
    /** Delay added between each child's entrance, in ms. */
    staggerMs?: number;
    /** Direction each child travels in from — delegated to `Reveal`. */
    direction?: RevealDirection;
    duration?: number;
    once?: boolean;
    distance?: number;
    threshold?: number;
    className?: string;
    style?: CSSProperties;
    /** Class applied to each per-child `Reveal` wrapper. */
    itemClassName?: string;
}

/**
 * Animates a numeric value toward `target` using simple spring physics,
 * stepped every frame via `requestAnimationFrame`. No dependencies beyond
 * React itself — this is the physics primitive the other components in
 * this library build on (e.g. `AnimatedCounter`).
 *
 * @param target The value the spring should settle on.
 * @param config Optional mass/stiffness/damping/precision overrides.
 * @returns The current interpolated value, updated every animation frame.
 */
export declare function useSpring(target: number, config?: SpringConfig): number;

export { }
