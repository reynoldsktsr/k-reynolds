"use client";

import type { ComponentType } from "react";
import { SchemaVisualizer as SchemaVisualizerRaw } from "@/vendor/schema-visualizer/schema-visualizer";
import type { Schema, SchemaVisualizerProps } from "@/vendor/schema-visualizer/index";
import "@/vendor/schema-visualizer/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored value import resolves to a looser structural type (it's
// a forwardRef component with no matching same-name .d.ts); the real
// index.d.ts has the correct props shape.
const SchemaVisualizer = SchemaVisualizerRaw as ComponentType<SchemaVisualizerProps>;

// A small e-commerce schema, the same shape a real audit or migration
// tool would hand this component: users placing orders made up of line
// items, for products organized into categories.
const sampleSchema: Schema = {
  tables: [
    {
      name: "users",
      columns: [
        { name: "id", type: "uuid", isPrimaryKey: true },
        { name: "email", type: "varchar(255)" },
        { name: "full_name", type: "varchar(255)" },
      ],
    },
    {
      name: "products",
      columns: [
        { name: "id", type: "uuid", isPrimaryKey: true },
        { name: "category_id", type: "uuid", isForeignKey: true },
        { name: "name", type: "varchar(255)" },
        { name: "sku", type: "varchar(64)" },
      ],
    },
    {
      name: "categories",
      columns: [
        { name: "id", type: "uuid", isPrimaryKey: true },
        { name: "name", type: "varchar(120)" },
      ],
    },
    {
      name: "orders",
      columns: [
        { name: "id", type: "uuid", isPrimaryKey: true },
        { name: "user_id", type: "uuid", isForeignKey: true },
        { name: "status", type: "varchar(32)" },
      ],
    },
    {
      name: "order_items",
      columns: [
        { name: "id", type: "uuid", isPrimaryKey: true },
        { name: "order_id", type: "uuid", isForeignKey: true },
        { name: "product_id", type: "uuid", isForeignKey: true },
        { name: "quantity", type: "integer" },
      ],
    },
  ],
  relationships: [
    { from: { table: "products", column: "category_id" }, to: { table: "categories", column: "id" }, cardinality: "one-to-many" },
    { from: { table: "orders", column: "user_id" }, to: { table: "users", column: "id" }, cardinality: "one-to-many" },
    { from: { table: "order_items", column: "order_id" }, to: { table: "orders", column: "id" }, cardinality: "one-to-many" },
    { from: { table: "order_items", column: "product_id" }, to: { table: "products", column: "id" }, cardinality: "one-to-many" },
  ],
};

export function SchemaVisualizerDemo() {
  return (
    <DemoFrame caption="Schema Visualizer">
      {/* The component's own root uses h-full internally, so the real
          height has to come from a sized parent, not its className. */}
      <div className="h-80 w-full">
        <SchemaVisualizer schema={sampleSchema} className="h-full w-full" />
      </div>
    </DemoFrame>
  );
}
