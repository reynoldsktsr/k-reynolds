import { JSX as JSX_2 } from 'react';

export declare interface Card {
    id: string;
    title: string;
    description?: string;
}

export declare interface Column {
    id: string;
    title: string;
    cards: Card[];
}

export declare function KanbanBoard({ columns, onChange, allowAddColumn, allowRenameColumn, className, }: KanbanBoardProps): JSX_2.Element;

export declare interface KanbanBoardProps {
    /** The columns to render. The board is a controlled component - it never mutates this array. */
    columns: Column[];
    /** Called with the next `columns` value whenever the board's structure changes (card added/moved/reordered/deleted, column added/renamed). */
    onChange: (columns: Column[]) => void;
    /** Allow adding new columns via a trailing "+ Add column" control. Defaults to `true`. */
    allowAddColumn?: boolean;
    /** Allow renaming a column by clicking its title. Defaults to `true`. */
    allowRenameColumn?: boolean;
    /** Extra class name applied to the board's outer wrapper. */
    className?: string;
}

export { }
