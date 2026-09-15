/** Named color themes shipped with the component. */
export type MinesweeperTheme = 'classic' | 'midnight' | 'ocean' | 'forest';
export interface MinesweeperProps {
    /** Number of rows in the grid. Defaults to 9. */
    rows?: number;
    /** Number of columns in the grid. Defaults to 9. */
    cols?: number;
    /** Number of mines placed on the grid. Defaults to 10. */
    mineCount?: number;
    /** Visual theme. Defaults to 'classic'. */
    theme?: MinesweeperTheme;
    /** Extra class names applied to the outer wrapper. */
    className?: string;
    /** Called once when the player wins the game. */
    onWin?: () => void;
    /** Called once when the player loses the game. */
    onLose?: () => void;
}
/**
 * A self-contained, configurable Minesweeper game.
 *
 * Drop it into any React app: `<Minesweeper rows={9} cols={9} mineCount={10} />`.
 */
export declare function Minesweeper({ rows, cols, mineCount, theme, className, onWin, onLose, }: MinesweeperProps): import("react").JSX.Element;
export default Minesweeper;
