import { ButtonHTMLAttributes } from 'react';
import { JSX as JSX_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { ReactNode } from 'react';

/**
 * A button with a soft, animated gradient border that glows in on hover.
 */
export declare function GlowBorderButton({ gradient, className, children, style, ...props }: GlowBorderButtonProps): JSX_2.Element;

export declare interface GlowBorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** CSS gradient used for the glowing border on hover. */
    gradient?: string;
}

/**
 * A button whose icon slides in from off-canvas on hover, with the
 * label nudging over to make room.
 */
export declare function IconSlideButton({ icon, iconPosition, className, children, ...props }: IconSlideButtonProps): JSX_2.Element;

export declare interface IconSlideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Icon element rendered after the label, e.g. an arrow glyph or SVG. */
    icon?: ReactNode;
    /** Which side the icon slides in from / sits on. Defaults to "right". */
    iconPosition?: 'left' | 'right';
}

/**
 * A button that gently pulls toward the cursor while hovered, then
 * springs back to rest when the pointer leaves.
 */
export declare function MagneticButton({ strength, className, children, onMouseMove, onMouseLeave, ...props }: MagneticButtonProps): JSX_2.Element;

export declare interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** How far the button is allowed to travel toward the cursor, in pixels. */
    strength?: number;
}

/**
 * A button that morphs into a circular spinner while its action is in
 * flight, then briefly shows a checkmark before returning to its
 * resting label.
 */
export declare function MorphLoadingButton({ className, children, onClick, loadingDuration, successDuration, disabled, ...props }: MorphLoadingButtonProps): JSX_2.Element;

export declare interface MorphLoadingButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /**
     * Click handler. Return (or await) a Promise to keep the button in its
     * loading state until it resolves; a synchronous handler falls back to
     * a fixed `loadingDuration`.
     */
    onClick?: (event: MouseEvent_2<HTMLButtonElement>) => void | Promise<void>;
    /** How long to stay in the loading state when onClick isn't async, in ms. */
    loadingDuration?: number;
    /** How long to show the success check before reverting, in ms. */
    successDuration?: number;
}

/**
 * A button that emits an expanding circular ripple from the click point,
 * similar to Material Design's touch feedback.
 */
export declare function RippleButton({ rippleColor, className, children, onClick, style, ...props }: RippleButtonProps): JSX_2.Element;

export declare interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Ripple color. Defaults to a soft white, which reads well on dark buttons. */
    rippleColor?: string;
}

/**
 * A button that pops up in scale with a growing shadow on hover, and
 * settles back down on click, for tactile feedback.
 */
export declare function ScalePopButton({ className, children, ...props }: ScalePopButtonProps): JSX_2.Element;

export declare type ScalePopButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A button that tilts in 3D following the cursor position, giving a
 * lightweight "card tilt" feel without a physics library.
 */
export declare function TiltButton({ maxTilt, className, children, onMouseMove, onMouseLeave, style, ...props }: TiltButtonProps): JSX_2.Element;

export declare interface TiltButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Maximum tilt angle in degrees. */
    maxTilt?: number;
}

/**
 * A minimal, text-style button whose underline draws in from the left
 * on hover/focus.
 */
export declare function UnderlineDrawButton({ underlineColor, className, children, style, ...props }: UnderlineDrawButtonProps): JSX_2.Element;

export declare interface UnderlineDrawButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Underline color. Defaults to currentColor. */
    underlineColor?: string;
}

export { }
