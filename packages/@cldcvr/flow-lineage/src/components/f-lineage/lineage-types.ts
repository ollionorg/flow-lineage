/* eslint-disable @typescript-eslint/no-explicit-any */
// Lineage node type
export type LineageNode = {
  id: string;
  to?: LineageNode[];
  links?: LineageNodeLink[];
  children?: LineageNodeChildren[];
  data?: Record<string, any>;
};

// Lineage Node children
export type LineageNodeChildren = {
  id: string;
  links?: LineageNodeLink[];
  data?: Record<string, any>;
};
export type LineageNodeLink = {
  nodeid: string;
  type?: "incoming" | "outgoing";
};

export type LineageNodeSize = {
  width: number;
  height: number;
};
export type LineageNodeElement = { x: number; y: number } & Omit<
  LineageNode,
  "to"
>;

export type Lineage = {
  nodes: LineageNodeElement[];
  links: LineageLinkElement[];
};

export type LineageLinkElement = {
  id: string;
  source: LineageNodeElement;
  target: LineageNodeElement;
  level: number;
};
