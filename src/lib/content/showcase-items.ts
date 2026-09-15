/**
 * Smaller builds and experiments, lighter than a full case study.
 * Each one is a standalone, importable React component with a live demo
 * on GitHub Pages, from a series of small tech demos.
 */
export type ShowcaseItem = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  repoUrl: string;
  status: "live" | "in-progress";
};

export const showcaseItems: ShowcaseItem[] = [
  {
    slug: "wordle-kit",
    title: "Wordle Kit",
    description:
      "A fully customizable Wordle clone, packaged as a drop-in React component. Word length, word list, guess count, and color theme all configurable.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/wordle-kit/",
    repoUrl: "https://github.com/reynoldsktsr/wordle-kit",
    status: "live",
  },
  {
    slug: "command-palette",
    title: "Command Palette",
    description:
      "A fuzzy-searchable Cmd+K command palette as a drop-in React component and hook. Grouping, keyboard navigation, and a zero-dependency fuzzy matcher.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/command-palette/",
    repoUrl: "https://github.com/reynoldsktsr/command-palette",
    status: "live",
  },
  {
    slug: "minesweeper-kit",
    title: "Minesweeper Kit",
    description:
      "A configurable Minesweeper as a drop-in React component: flood-fill reveal, flag-to-mark, a safe first click, and four built-in themes.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/minesweeper-kit/",
    repoUrl: "https://github.com/reynoldsktsr/minesweeper-kit",
    status: "live",
  },
  {
    slug: "game-2048",
    title: "2048",
    description:
      "A drop-in 2048 component with smooth slide and merge animations, arrow-key and swipe controls, and a configurable board size.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/game-2048/",
    repoUrl: "https://github.com/reynoldsktsr/game-2048",
    status: "live",
  },
  {
    slug: "tic-tac-toe-ai",
    title: "Tic-Tac-Toe AI",
    description:
      "Tic-Tac-Toe as a React component with a minimax-powered AI opponent, tunable from easy to genuinely unbeatable.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/tic-tac-toe-ai/",
    repoUrl: "https://github.com/reynoldsktsr/tic-tac-toe-ai",
    status: "live",
  },
  {
    slug: "markdown-widget",
    title: "Markdown Widget",
    description:
      "A split-pane markdown editor with live preview and a formatting toolbar, packaged as a standalone React component.",
    tech: ["React", "TypeScript", "Tailwind CSS", "marked", "DOMPurify"],
    demoUrl: "https://reynoldsktsr.github.io/markdown-widget/",
    repoUrl: "https://github.com/reynoldsktsr/markdown-widget",
    status: "live",
  },
  {
    slug: "form-ui-kit",
    title: "Form UI Kit",
    description:
      "Accessible form primitives with validation states: text fields, selects, toggles, and a three-step multi-step form built from the same pieces.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/form-ui-kit/",
    repoUrl: "https://github.com/reynoldsktsr/form-ui-kit",
    status: "live",
  },
  {
    slug: "hover-button-lab",
    title: "Hover Button Lab",
    description:
      "A gallery of button hover and animation effects for React: magnetic pull, click ripples, glow borders, 3D tilt, no animation library required.",
    tech: ["React", "TypeScript", "CSS"],
    demoUrl: "https://reynoldsktsr.github.io/hover-button-lab/",
    repoUrl: "https://github.com/reynoldsktsr/hover-button-lab",
    status: "live",
  },
  {
    slug: "admin-ui-kit",
    title: "Admin Dashboard Kit",
    description:
      "A clonable admin dashboard starter: sidebar layout, data tables, charts, a mock auth flow, and a settings page. A template to fork, not a drop-in component like the rest of these.",
    tech: ["React", "TypeScript", "Tailwind CSS", "react-router-dom", "recharts"],
    demoUrl: "https://reynoldsktsr.github.io/admin-ui-kit/",
    repoUrl: "https://github.com/reynoldsktsr/admin-ui-kit",
    status: "live",
  },
];
