import { PathAlgorithmId } from './algorithms';
export interface PathfindingVisualizerProps {
    /** Extra class names applied to the outer wrapper. */
    className?: string;
    /** Initial grid size (rows and columns). Defaults to 20. */
    initialGridSize?: number;
    /** Initial algorithm. Defaults to 'bfs'. */
    initialAlgorithm?: PathAlgorithmId;
}
/**
 * Animated grid visualization of pathfinding algorithms. Draw walls by
 * clicking and dragging over empty cells; drag the start/end markers to
 * relocate them; run BFS, Dijkstra, or A* to watch the search explore the
 * grid and reveal the shortest path.
 */
export declare function PathfindingVisualizer({ className, initialGridSize, initialAlgorithm, }: PathfindingVisualizerProps): import('react').JSX.Element;
export default PathfindingVisualizer;
