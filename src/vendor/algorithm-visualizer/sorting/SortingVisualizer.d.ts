import { SortAlgorithmId } from './algorithms';
export interface SortingVisualizerProps {
    /** Extra class names applied to the outer wrapper. */
    className?: string;
    /** Initial array size. Defaults to 40. */
    initialSize?: number;
    /** Initial algorithm. Defaults to 'bubble'. */
    initialAlgorithm?: SortAlgorithmId;
}
/**
 * Animated bar-chart visualization of sorting algorithms. Plays back a
 * generator-recorded sequence of real comparisons/swaps/overwrites one step
 * at a time, coloring bars currently being compared or swapped.
 */
export declare function SortingVisualizer({ className, initialSize, initialAlgorithm, }: SortingVisualizerProps): import('react').JSX.Element;
export default SortingVisualizer;
