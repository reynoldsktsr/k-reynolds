export type GravityDirection = 'down' | 'up' | 'off';
export type ShapeKind = 'circle' | 'box' | 'polygon';
export interface PhysicsPlaygroundProps {
    /** Extra class names applied to the outer wrapper. */
    className?: string;
    /** Height of the canvas area. Accepts any CSS size (defaults to `100%`). */
    height?: number | string;
    /** Canvas background color. Defaults to a value based on `prefers-color-scheme`. */
    background?: string;
    /** Starting gravity direction. Defaults to `'down'`. */
    initialGravity?: GravityDirection;
    /** Starting restitution ("bounciness") applied to newly spawned bodies, 0–1. Defaults to `0.6`. */
    initialRestitution?: number;
    /** Number of shapes to spawn automatically on mount so the canvas isn't empty. Defaults to `10`. */
    initialBodyCount?: number;
    /** Whether to render the built-in toolbar. Defaults to `true`. */
    showToolbar?: boolean;
}
/**
 * A self-contained, draggable 2D physics sandbox built on matter-js.
 * Renders to a `<canvas>` that fills its container; drop it anywhere with a
 * defined height.
 */
export declare function PhysicsPlayground({ className, height, background, initialGravity, initialRestitution, initialBodyCount, showToolbar, }: PhysicsPlaygroundProps): import('react').JSX.Element;
export default PhysicsPlayground;
