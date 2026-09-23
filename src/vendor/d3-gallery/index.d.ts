import { JSX as JSX_2 } from 'react';

/**
 * "Bar chart race": bars reorder and resize smoothly as you step or play
 * through `data.frames`. Ships its own play/pause button and scrubber.
 */
declare function AnimatedBarRace({ data, topN, frameDuration, width, height, className, }: AnimatedBarRaceProps): JSX_2.Element;
export { AnimatedBarRace }
export { AnimatedBarRace as BarRace }

export declare interface AnimatedBarRaceProps {
    /** Time series to animate through. Falls back to a bundled sample dataset. */
    data?: BarRaceData;
    /** How many of the top-ranked series to show at once. */
    topN?: number;
    /** Milliseconds spent transitioning between two frames (also the autoplay step interval). */
    frameDuration?: number;
    width?: number;
    height?: number;
    className?: string;
}

export declare interface BarRaceData {
    frames: BarRaceFrame[];
}

/** One time step (e.g. a year or a quarter) of the bar race. */
export declare interface BarRaceFrame {
    /** Label for this time step, e.g. "2015" or "Q1 2020". */
    date: string;
    values: BarRaceValue[];
}

/** A single frame's worth of values for the animated bar race, keyed by series name. */
export declare interface BarRaceValue {
    name: string;
    value: number;
}

/**
 * Chord diagram built with d3-chord. Hovering a group's arc or a ribbon
 * highlights that group's connections and dims everything else.
 */
declare function ChordDiagram({ data, labels, width, height, className, }: ChordDiagramProps): JSX_2.Element;
export { ChordDiagram as Chord }
export { ChordDiagram }

export declare interface ChordDiagramProps {
    /** Square adjacency matrix; `data[i][j]` is the flow from group i to group j. */
    data?: ChordMatrix;
    /** Names for each row/column of `data`, in the same order. */
    labels?: string[];
    /** SVG viewBox width in px (the diagram is drawn centered, square). */
    width?: number;
    /** SVG viewBox height in px. */
    height?: number;
    className?: string;
}

/** Adjacency matrix input for the chord diagram: `data[i][j]` is the flow from i to j. */
export declare type ChordMatrix = number[][];

/**
 * Force-directed node-link graph built with d3-force. Nodes are draggable,
 * colored by `group`, and show their label on hover.
 */
declare function ForceGraphChart({ data, width, height, className, }: ForceGraphChartProps): JSX_2.Element;
export { ForceGraphChart as ForceGraph }
export { ForceGraphChart }

export declare interface ForceGraphChartProps {
    /** Nodes + links to render. Falls back to a bundled sample dataset. */
    data?: ForceGraphData;
    /** SVG viewBox width in px. The chart scales to fill its container. */
    width?: number;
    /** SVG viewBox height in px. */
    height?: number;
    className?: string;
}

export declare interface ForceGraphData {
    nodes: ForceGraphNode[];
    links: ForceGraphLink[];
}

/** A single edge in a force-directed graph. */
export declare interface ForceGraphLink {
    /** id of the source node. */
    source: string;
    /** id of the target node. */
    target: string;
    /** Relative strength/weight, used to scale the link's stroke width. */
    value?: number;
}

/** A single node in a force-directed graph. */
export declare interface ForceGraphNode {
    /** Unique identifier, referenced by ForceGraphLink.source/target. */
    id: string;
    /** Category used to color the node and (optionally) group it in a legend. */
    group: string | number;
    /** Label shown on hover. Falls back to `id` when omitted. */
    label?: string;
    /** Relative size hint (radius scales from this). Defaults to 1. */
    value?: number;
}

/**
 * Mock "top languages by developer survey mentions (thousands)" over time -
 * the classic bar-chart-race shape: same series names across every frame,
 * ranks and values shifting from one time step to the next.
 */
export declare const sampleBarRaceData: BarRaceData;

/**
 * A mock import/export matrix between five regions, in $B/year.
 * `sampleChordLabels[i]` names row/column `i`; `sampleChordMatrix[i][j]`
 * is the flow of goods from region i to region j.
 */
export declare const sampleChordLabels: string[];

export declare const sampleChordMatrix: ChordMatrix;

/**
 * A small social-network-style graph: people clustered into teams, with
 * friendship/collaboration links between them. `group` drives node color.
 */
export declare const sampleForceGraphData: ForceGraphData;

/** A file-system-style hierarchy: a small project directory tree, sized by file bytes. */
export declare const sampleSunburstData: SunburstNode;

/**
 * Zoomable sunburst built with d3-hierarchy + d3.partition. Click a segment
 * to zoom into it (click the center to zoom back out); hover shows a
 * tooltip with the segment's name and value.
 */
declare function SunburstChart({ data, width, height, className, }: SunburstChartProps): JSX_2.Element;
export { SunburstChart as Sunburst }
export { SunburstChart }

export declare interface SunburstChartProps {
    /** Hierarchical data to render. Falls back to a bundled sample dataset. */
    data?: SunburstNode;
    /** SVG viewBox width in px (the sunburst is drawn centered, square). */
    width?: number;
    /** SVG viewBox height in px. */
    height?: number;
    className?: string;
}

/** A node in the hierarchy fed to the sunburst chart. */
export declare interface SunburstNode {
    name: string;
    /** Leaf value. Omit on non-leaf nodes - it is derived from `children`. */
    value?: number;
    children?: SunburstNode[];
}

export { }
