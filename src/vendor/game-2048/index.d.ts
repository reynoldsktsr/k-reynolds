import { ReactElement } from 'react';

/**
 * A configurable, drop-in 2048 game. Supports arrow-key and swipe controls,
 * animated sliding/merging tiles, a "keep playing" win state, and game-over
 * detection with a restart button.
 */
declare function Game2048({ gridSize, theme, onWin, onGameOver, className }: Game2048Props): ReactElement;
export { Game2048 }
export default Game2048;

export declare interface Game2048Props {
    /** Number of columns/rows in the board. Defaults to 4. */
    gridSize?: number;
    /** Optional theme overrides. */
    theme?: Game2048Theme;
    /** Called once, the first time a tile reaches the winning value. */
    onWin?: () => void;
    /** Called once when no more moves are possible, with the final score. */
    onGameOver?: (finalScore: number) => void;
    /** Extra class name applied to the outer wrapper. */
    className?: string;
}

/** Theme overrides for the board. Any field you omit falls back to the classic palette. */
export declare interface Game2048Theme {
    /** Background color of the board frame. */
    boardBackground?: string;
    /** Background color of each empty cell. */
    cellBackground?: string;
    /** Accent color used for buttons, headings and score chips. */
    accent?: string;
    /** Per-value tile colors, keyed by the tile's numeric value (2, 4, 8, ...). */
    tileColors?: Record<number, Game2048TileColor>;
}

/** A single tile color pair. */
export declare interface Game2048TileColor {
    background: string;
    text: string;
}

export { }
