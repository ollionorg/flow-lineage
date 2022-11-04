import {
  LineageNode,
  LineageNodeSize,
  LineageNodeElement,
  LineageDirection,
} from "./../lineage-types";

export default function createNodeElements(
  data: LineageNode[],
  nodeSize: LineageNodeSize,
  padding: number,
  gap: number,
  direction: LineageDirection
) {
  /**
   * sub class to hold current pointers
   */
  class Pointer {
    x: number;
    y: number;

    static levelPointers: Record<number, Pointer> = {};

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    next(level: number) {
      if (Pointer.levelPointers[level]) {
        return Pointer.levelPointers[level];
      }
      if (direction === "horizontal") {
        Pointer.levelPointers[level] = new Pointer(
          this.x + nodeSize.width + gap,
          padding
        );
      } else {
        Pointer.levelPointers[level] = new Pointer(
          padding,
          this.y + nodeSize.height + gap
        );
      }

      return Pointer.levelPointers[level];
    }
  }
  /**
   * starting point of plotting
   */
  const pointer = new Pointer(padding, padding);
  const nodeElements: LineageNodeElement[] = [];

  /**
   *
   * @param node : of which x,y calculated
   * @param levelPointer : level pointer which x,y of last node
   */
  const getComputedElement = (
    node: LineageNode,
    levelPointer: Pointer
  ): LineageNodeElement => {
    const nodeElement: LineageNodeElement = {
      id: node.id,
      data: node.data,
      links: node.links,
      children: node.children,
      x: levelPointer.x,
      y: levelPointer.y,
    };

    if (direction === "horizontal") {
      levelPointer.y += nodeSize.height + gap;
    } else {
      levelPointer.x += nodeSize.width + gap;
    }

    return nodeElement;
  };

  /**
   * compute node elements with their respective co-ordib=nates based on heirarchy and relation
   * @param nodes :  list nodes given by user
   * @param levelPointer : pointer from where to start calculation
   * @param level :  level or heirarhcy in lineage
   */
  const computeElements = (
    nodes: LineageNode[],
    levelPointer: Pointer,
    level: number
  ) => {
    nodes.forEach((node) => {
      nodeElements.push(getComputedElement(node, levelPointer));

      if (node.to && node.to.length > 0) {
        computeElements(node.to, levelPointer.next(level + 1), level + 1);
      }
    });
  };

  computeElements(data, pointer, 0);

  return nodeElements;
}
