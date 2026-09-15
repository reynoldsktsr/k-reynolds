import { JSX as JSX_2 } from 'react';

export declare type Board = Cell[];

export declare type Cell = Player | null;

export declare type Difficulty = "easy" | "medium" | "unbeatable";

/**
 * Pure, framework-free Tic-Tac-Toe game logic and AI.
 *
 * The AI is implemented with the minimax algorithm (alpha-beta pruned for
 * speed). Minimax explores every possible sequence of future moves from the
 * current board, scoring terminal states from the AI's perspective:
 *
 *   +10 minus the number of moves it took to win  (win sooner is better)
 *   -10 plus the number of moves it took to lose   (lose later is better)
 *     0 for a draw
 *
 * On the AI's turn it picks the move that maximizes that score, assuming
 * the human will always reply with the move that minimizes it (i.e. plays
 * perfectly too). Because the search is exhaustive over a board this small
 * (at most 9! = 362,880 states, far fewer once wins are pruned), the AI
 * always finds the game-theoretically optimal move -- it can never lose,
 * only win or draw. Alpha-beta pruning cuts branches that can't change the
 * outcome, so the search stays fast without changing the result.
 */
export declare type Player = "X" | "O";

export declare function TicTacToe({ difficulty, firstPlayer, onGameEnd, className, }: TicTacToeProps): JSX_2.Element;

export declare type TicTacToeDifficulty = Difficulty;

export declare type TicTacToeFirstPlayer = "human" | "ai";

export declare interface TicTacToeGameEndResult {
    /** Who won this round, or 'draw'. */
    outcome: TicTacToeOutcome;
    /** The symbol the human played this round ('X' or 'O'). */
    humanMark: Player;
    /** Running score across all rounds played by this component instance. */
    score: TicTacToeScore;
}

export declare type TicTacToeOutcome = "human" | "ai" | "draw";

export declare interface TicTacToeProps {
    /** How strong the AI opponent plays. Defaults to 'unbeatable'. */
    difficulty?: TicTacToeDifficulty;
    /** Who makes the first move of each round. Defaults to 'human'. */
    firstPlayer?: TicTacToeFirstPlayer;
    /** Called whenever a round ends in a win, loss, or draw. */
    onGameEnd?: (result: TicTacToeGameEndResult) => void;
    /** Optional extra class names for the root element. */
    className?: string;
}

export declare interface TicTacToeScore {
    wins: number;
    losses: number;
    draws: number;
}

export declare interface WinResult {
    winner: Player;
    line: [number, number, number];
}

export { }
