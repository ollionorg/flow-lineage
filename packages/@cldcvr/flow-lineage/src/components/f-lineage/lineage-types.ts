/* eslint-disable @typescript-eslint/no-explicit-any */

import { FLineage } from "./f-lineage";

export type LineageBaseNode = {
  id: string;
  links?: LineageNodeLink[];
  data?: Record<string, any>;
  nodeTemplate?: string;
  click?: (event: Event, node: LineageNodeElement) => void;
  rightClick?: (event: Event, node: LineageNodeElement) => void;
};
export type LineageNodeChildren = LineageBaseNode;
// Lineage node type
export type LineageNode = {
  to?: LineageNode[];
  hideChildren?: boolean;
  children?: Record<string, LineageNodeChildren>;
} & LineageBaseNode;

// Lineage Node children

export type LineageNodeLink = {
  nodeid: string;
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
  offset?: number;
  isVisible?: boolean;
  childrenToggle?: string;
  hideChildren?: boolean;
  click?: (event: Event, node: LineageNodeElement) => void;
} & Omit<LineageNode, "to">;

export type LineageGapElement = {
  x: number;
  y: number;
};

export type LineageLevelGaps = Record<number, LineageGapElement[]>;
export type Lineage = {
  nodes: LineageNodeElement[];
  links: LineageLinkElement[];
  gaps: LineageLevelGaps;
  levelPointers: LevelPointer;
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
  maxChildrenHeight: number;
  element: FLineage;
  levelsToPlot: number[];
  page: number;
  filter?: (link: LineageLinkElement) => boolean;
};

export type CreateLineageParams = {
  data: LineageNode[];
  nodeSize: LineageNodeSize;
  childrenNodeSize: LineageNodeSize;
  padding: number;
  gap: number;
  direction: LineageDirection;
  maxChildrenHeight: number;
  links: LineageNodeLinks;
  biDirectionalLinks: string[];
};

export type CreateLinkPathParams = {
  sx: number;
  sy: number;
  dx: number;
  dy: number;
  endArcRadius: number;
  startArcRadius: number;
  getLinkGap: (level: number, nodeid: string) => number;
  nodeSize: LineageNodeSize;
  gap: number;
  d: LineageLinkElement;
  lineage: Lineage;
};

export type HorizontalLinkPathParams = {
  midX: number;
} & CreateLinkPathParams;
export type VerticalLinkPathParams = {
  midY: number;
} & CreateLinkPathParams;

export type LevelPointer = Record<number, { x: number; y: number }>;

export type LineageNodeChildrens = Record<string, LineageNodeChildren>;
export type LineageNodePartial = Omit<LineageNode, "to" | "links" | "id"> & {
  children?: LineageNodeChildrens;
  click?: (event: Event, node: LineageNodeElement) => void;
};
export type LineageNodes = Record<string, LineageNodePartial>;

export type LineageNodeLinkSchema = {
  from: string;
  to: string;
  state?: "success" | "danger" | "warning" | "primary" | "default";
  type?: "solid" | "dotted" | "dashed";
};
export type LineageNodeLinks = LineageNodeLinkSchema[];
