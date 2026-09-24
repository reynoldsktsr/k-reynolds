/**
 * Grid pathfinding algorithms (BFS, Dijkstra, A*) on an unweighted grid
 * (every open cell costs 1 to enter; walls are impassable). Each function
 * returns the order in which cells were visited/settled (for animating the
 * search) and the final shortest path from start to end, if one exists.
 */
export interface Cell {
    row: number;
    col: number;
}
export interface PathResult {
    /** Cells in the order they were visited/settled by the algorithm. */
    visitedOrder: Cell[];
    /** The shortest path from start to end, inclusive. Empty if unreachable. */
    path: Cell[];
}
export type PathAlgorithmId = 'bfs' | 'dijkstra' | 'astar';
export interface PathAlgorithmInfo {
    id: PathAlgorithmId;
    label: string;
}
export declare const PATH_ALGORITHMS: PathAlgorithmInfo[];
export declare function bfs(rows: number, cols: number, walls: Set<string>, start: Cell, end: Cell): PathResult;
export declare function dijkstra(rows: number, cols: number, walls: Set<string>, start: Cell, end: Cell): PathResult;
export declare function aStar(rows: number, cols: number, walls: Set<string>, start: Cell, end: Cell): PathResult;
export declare const PATH_FUNCTIONS: Record<PathAlgorithmId, (rows: number, cols: number, walls: Set<string>, start: Cell, end: Cell) => PathResult>;
export declare function cellKey(cell: Cell): string;
