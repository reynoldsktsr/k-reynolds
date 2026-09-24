import { ForwardRefExoticComponent } from 'react';
import { RefAttributes } from 'react';

export declare type Cardinality = "one-to-one" | "one-to-many" | "many-to-many";

/**
 * Data model for SchemaVisualizer.
 *
 * A `Schema` is just plain, serializable data — it has no rendering or
 * layout information baked in. That makes it trivial to hand-author, load
 * from a JSON file, or generate from an introspected database.
 */
/** A single column within a table. */
export declare interface Column {
    /** Column name, e.g. "id" or "user_id". */
    name: string;
    /** Display type label, e.g. "uuid", "varchar(255)", "integer". */
    type: string;
    /** Whether this column is (part of) the table's primary key. */
    isPrimaryKey?: boolean;
    /** Whether this column is a foreign key referencing another table. */
    isForeignKey?: boolean;
    /** Whether the column allows NULL values. Purely informational. */
    nullable?: boolean;
}

export declare type LayoutMap = Record<string, TablePosition>;

/** A foreign-key relationship connecting two table columns. */
export declare interface Relationship {
    from: RelationshipEndpoint;
    to: RelationshipEndpoint;
    /** Defaults to "one-to-many" (the common FK -> PK shape) when omitted. */
    cardinality?: Cardinality;
}

/** One endpoint of a relationship: a specific column on a specific table. */
export declare interface RelationshipEndpoint {
    table: string;
    column: string;
}

/** The full schema handed to <SchemaVisualizer schema={...} />. */
export declare interface Schema {
    tables: Table[];
    relationships: Relationship[];
}

/**
 * Interactive, draggable entity-relationship diagram rendered from a plain
 * `Schema` object. Tables are absolutely-positioned HTML cards; relationships
 * are SVG curves that recompute their endpoints from the same position state
 * on every render, so they track cards live while dragging. The canvas
 * itself supports panning (drag empty space) and zooming (wheel / pinch).
 */
export declare const SchemaVisualizer: ForwardRefExoticComponent<SchemaVisualizerProps & RefAttributes<SchemaVisualizerHandle>>;

/** Imperative controls exposed via a ref on <SchemaVisualizer />. */
export declare interface SchemaVisualizerHandle {
    /** Re-run the auto-layout and reset pan/zoom to their defaults. */
    resetLayout: () => void;
}

export declare interface SchemaVisualizerProps {
    /** The tables + relationships to render. */
    schema: Schema;
    /** Extra classes applied to the root element (e.g. to control height). */
    className?: string;
}

/** A single table (entity) in the schema. */
export declare interface Table {
    /** Unique table name, used to reference it from relationships. */
    name: string;
    /** Ordered list of columns rendered as rows in the table card. */
    columns: Column[];
}

/** Optional per-table layout position, keyed by table name. */
export declare interface TablePosition {
    x: number;
    y: number;
}

export { }
