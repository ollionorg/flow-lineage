/* eslint-disable @typescript-eslint/no-explicit-any */

export type LineageBaseNode = {
  id: string;
  links?: LineageNodeLink[];
  data?: Record<string, any>;
};
export type LineageNodeChildren = LineageBaseNode;
// Lineage node type
export type LineageNode = {
  to?: LineageNode[];
  children?: LineageNodeChildren[];
} & LineageBaseNode;

// Lineage Node children

export type LineageNodeLink = {
  nodeid: string;
  type?: "incoming" | "outgoing";
};

export type LineageNodeSize = {
  width: number;
  height: number;
};
export type LineageNodeElement = {
  x: number;
  y: number;
  level: number;
  isChildren?: boolean;
  childrenYMax?: number;
  childrenXMax?: number;
  hasScrollbaleChildren?: boolean;
  parentId?: string;
} & Omit<LineageNode, "to">;

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

export type LineageDirection = "horizontal" | "vertical";

export type LevelLinkGap = Record<
  number,
  { linkgap: number; nodeLinkGap: Record<string, number> }
>;

export type LineageData = LineageNode[];

export type DrawLineageParams = {
  lineage: Lineage;
  svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodeSize: LineageNodeSize;
  childrenNodeSize: LineageNodeSize;
  gap: number;
  direction: LineageDirection;
};

export type CreateLineageParams = {
  data: LineageNode[];
  nodeSize: LineageNodeSize;
  childrenNodeSize: LineageNodeSize;
  padding: number;
  gap: number;
  direction: LineageDirection;
};
