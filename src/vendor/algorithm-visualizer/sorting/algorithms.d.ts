/**
 * Sorting algorithms implemented as generator functions that yield one
 * "step" per meaningful operation (comparison, swap, or overwrite). Each
 * generator mutates its own private copy of the input array as it runs, so
 * the sequence of yielded steps is a faithful, replayable trace of the real
 * algorithm — a consumer that starts from the same input and applies the
 * steps in order will reproduce the exact same array at every point.
 */
export type SortStep = 
/** Two indices are being compared; no mutation happens on this step. */
{
    kind: 'compare';
    indices: [number, number];
}
/** The values at two indices were swapped in place. */
 | {
    kind: 'swap';
    indices: [number, number];
}
/** The value at a single index was overwritten (used by merge sort, which
 * writes through a temporary buffer rather than swapping in place). */
 | {
    kind: 'overwrite';
    index: number;
    value: number;
}
/** One or more indices have reached their final sorted position. */
 | {
    kind: 'sorted';
    indices: number[];
};
export type SortGenerator = Generator<SortStep, void, unknown>;
export type SortAlgorithmId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';
export interface SortAlgorithmInfo {
    id: SortAlgorithmId;
    label: string;
}
export declare const SORT_ALGORITHMS: SortAlgorithmInfo[];
export declare function bubbleSort(input: number[]): SortGenerator;
export declare function selectionSort(input: number[]): SortGenerator;
export declare function insertionSort(input: number[]): SortGenerator;
export declare function mergeSort(input: number[]): SortGenerator;
export declare function quickSort(input: number[]): SortGenerator;
export declare const SORT_FUNCTIONS: Record<SortAlgorithmId, (input: number[]) => SortGenerator>;
