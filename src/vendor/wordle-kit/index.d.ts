import { JSX as JSX_2 } from 'react';

/** The classic 5-letter word list, used when no `wordList` prop is supplied. */
export declare const DEFAULT_WORD_LIST: string[];

/** Returns the bundled word list for a given word length, if one exists. */
export declare function getBundledWordList(length: number): string[] | undefined;

/** Per-letter evaluation result, mirroring classic Wordle semantics. */
export declare type LetterState = 'correct' | 'present' | 'absent';

/** Bundled default word lists, keyed by word length. */
export declare const WORD_LISTS: Record<number, string[]>;

/**
 * A fully self-contained, configurable Wordle clone.
 *
 * Supports physical keyboard input, a clickable on-screen keyboard,
 * per-letter state coloring, row-by-row reveal animation, a win/lose
 * end screen, and an emoji "share result" grid copyable to clipboard.
 */
declare function Wordle({ wordLength, wordList, maxGuesses, theme, colors, onWin, onLose, className, }: WordleProps): JSX_2.Element;
export { Wordle }
export default Wordle;

/** Full set of color tokens the board and keyboard render with. */
export declare interface WordleColors {
    /** Page/board background. */
    background: string;
    /** Background for secondary surfaces (keyboard, modal). */
    surface: string;
    /** Default text color. */
    text: string;
    /** Tile/key color for a correctly placed letter. */
    correct: string;
    /** Tile/key color for a letter present but misplaced. */
    present: string;
    /** Tile/key color for a letter not in the word. */
    absent: string;
    /** Border color for empty/unfilled tiles. */
    tileBorder: string;
    /** Border color for filled-but-unsubmitted tiles. */
    tileFilledBorder: string;
    /** Background color for on-screen keys with no guess yet. */
    keyBackground: string;
    /** Text color for on-screen keys with no guess yet. */
    keyText: string;
    /** Text color used on correct/present/absent tiles and keys. */
    onStateText: string;
}

export declare interface WordleProps {
    /** Length of the secret word. Defaults to 5. */
    wordLength?: number;
    /**
     * Custom pool of answer/valid-guess words. Case-insensitive; words whose
     * length doesn't match `wordLength` are ignored. Falls back to a bundled
     * default list for the given `wordLength` when omitted.
     */
    wordList?: string[];
    /** Number of guesses allowed before the game is lost. Defaults to 6. */
    maxGuesses?: number;
    /** Built-in color scheme. Defaults to 'classic'. */
    theme?: WordleThemeName;
    /** Individual color token overrides, layered on top of `theme`. */
    colors?: Partial<WordleColors>;
    /** Called once, when the player guesses the word correctly. */
    onWin?: (word: string, guesses: string[]) => void;
    /** Called once, when the player runs out of guesses. */
    onLose?: (word: string, guesses: string[]) => void;
    /** Optional extra class name applied to the root element. */
    className?: string;
}

/** Named built-in color schemes. Pass `colors` to override individual tokens on top of either. */
export declare type WordleThemeName = 'classic' | 'dark' | 'custom';

export { }
