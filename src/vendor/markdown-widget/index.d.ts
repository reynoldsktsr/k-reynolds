import { JSX as JSX_2 } from 'react';

export declare function MarkdownEditor({ initialValue, onChange, toolbar, previewMode, className, placeholder, }: MarkdownEditorProps): JSX_2.Element;

export declare interface MarkdownEditorProps {
    /** Markdown the editor starts with. Uncontrolled after mount. */
    initialValue?: string;
    /** Called with the full markdown string whenever it changes. */
    onChange?: (value: string) => void;
    /**
     * Show the default toolbar (`true`/`false`), or pass an array of keys to
     * show only those buttons, in the order given.
     */
    toolbar?: boolean | ToolbarKey[];
    /**
     * `'live'` shows editor + preview side by side (stacked on mobile),
     * `'tab'` shows a Write/Preview toggle, `'none'` hides the preview.
     */
    previewMode?: PreviewMode;
    /** Extra class names applied to the root element. */
    className?: string;
    /** Placeholder text for the empty textarea. */
    placeholder?: string;
}

export declare type PreviewMode = 'live' | 'tab' | 'none';

export declare type ToolbarKey = 'bold' | 'italic' | 'h1' | 'h2' | 'link' | 'ul' | 'ol' | 'code' | 'quote';

export { }
