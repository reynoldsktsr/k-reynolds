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
  {
    slug: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    description:
      "Step-by-step animated sorting and pathfinding visualizations as drop-in React components: real comparisons and swaps played back one step at a time, plus BFS, Dijkstra, and A* exploring a grid you can draw walls on.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/algorithm-visualizer/",
    repoUrl: "https://github.com/reynoldsktsr/algorithm-visualizer",
    status: "live",
  },
  {
    slug: "d3-gallery",
    title: "D3 Gallery",
    description:
      "A gallery of interactive D3.js visualizations packaged as typed React components: a force-directed graph, a zoomable sunburst, a chord diagram, and an animated bar chart race.",
    tech: ["React", "TypeScript", "D3.js"],
    demoUrl: "https://reynoldsktsr.github.io/d3-gallery/",
    repoUrl: "https://github.com/reynoldsktsr/d3-gallery",
    status: "live",
  },
  {
    slug: "schema-visualizer",
    title: "Schema Visualizer",
    description:
      "An interactive, draggable entity-relationship diagram as a drop-in React component. Hand it a schema and get a canvas of draggable table cards connected by live-updating relationship lines, with pan and zoom built in.",
    tech: ["React", "TypeScript"],
    demoUrl: "https://reynoldsktsr.github.io/schema-visualizer/",
    repoUrl: "https://github.com/reynoldsktsr/schema-visualizer",
    status: "live",
  },
  {
    slug: "threejs-gallery",
    title: "Three.js Gallery",
    description:
      "A small gallery of interactive Three.js/WebGL scenes as drop-in React components: a reactive particle field, an orbit-controlled object viewer, and a custom shader background.",
    tech: ["React", "TypeScript", "Three.js", "react-three-fiber"],
    demoUrl: "https://reynoldsktsr.github.io/threejs-gallery/",
    repoUrl: "https://github.com/reynoldsktsr/threejs-gallery",
    status: "live",
  },
  {
    slug: "kanban-board",
    title: "Kanban Board",
    description:
      "A drag-and-drop Kanban board as a drop-in React component, built entirely on the native HTML5 Drag and Drop API. Reorder cards, move them between columns, and add or rename columns, with no drag-and-drop library dependency.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/kanban-board/",
    repoUrl: "https://github.com/reynoldsktsr/kanban-board",
    status: "live",
  },
  {
    slug: "motion-kit",
    title: "Motion Kit",
    description:
      "Zero-dependency scroll and spring animation primitives for React: reveal-on-scroll, stagger, parallax, spring values, count-up, and an infinite marquee. Built entirely on native browser APIs, no framer-motion or gsap.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://reynoldsktsr.github.io/motion-kit/",
    repoUrl: "https://github.com/reynoldsktsr/motion-kit",
    status: "live",
  },
  {
    slug: "physics-playground",
    title: "Physics Playground",
    description:
      "An interactive 2D physics sandbox as a drop-in React component: drag, throw, and stack bodies with real gravity and collisions, powered by matter-js.",
    tech: ["React", "TypeScript", "matter-js"],
    demoUrl: "https://reynoldsktsr.github.io/physics-playground/",
    repoUrl: "https://github.com/reynoldsktsr/physics-playground",
    status: "live",
  },
];
