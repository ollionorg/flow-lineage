import {
  LineageNode,
  LineageNodeSize,
  LineageNodeElement,
  LineageDirection,
  LineageBaseNode,
  LineageNodeChildren,
} from "./../lineage-types";

export default function createNodeElements(
  data: LineageNode[],
  nodeSize: LineageNodeSize,
  childrenNodeSize: LineageNodeSize,
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
    maxY?: number; // maxY due to childrens

    static levelPointers: Record<number, Pointer> = {}; // holds level pointers

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    next(level: number) {
      // return if exisiting pointer found
      if (Pointer.levelPointers[level]) {
        return Pointer.levelPointers[level];
      }
      if (direction === "horizontal") {
        /**
         * for horizontal direction calculate appropriate gap
         */
        Pointer.levelPointers[level] = new Pointer(
          this.x + nodeSize.width + gap,
          padding
        );
      } else {
        /**
         * for vertical direction calculate appropriate gap
         */
        const y = this.maxY ? this.maxY + gap : this.y + nodeSize.height + gap;
        Pointer.levelPointers[level] = new Pointer(padding, y);
      }

      return Pointer.levelPointers[level];
    }
  }
  /**
   * starting point of plotting
   */
  Pointer.levelPointers[1] = new Pointer(padding, padding);

  const nodeElements: LineageNodeElement[] = [];

  /**
   *
   * @param node : of which x,y calculated
   * @param levelPointer : level pointer which x,y of last node
   */
  const getComputedElement = (
    node: LineageNode,
    level: number,
    levelPointer: Pointer
  ): LineageNodeElement => {
    const nodeElement: LineageNodeElement = {
      id: node.id,
      data: node.data,
      links: node.links,
      children: node.children,
      level,
      x: levelPointer.x,
      y: levelPointer.y,
    };

    /**
     * Check if node has childrens
     */
    if (node.children && node.children.length > 0) {
      levelPointer.y += nodeSize.height;

      const totalChildNodeHeight =
        childrenNodeSize.height * node.children.length;
      if (totalChildNodeHeight > 256) {
        nodeElement.hasScrollbaleChildren = true;
      }
      /**
       * compute child node elements
       */
      computeElements(node.children, levelPointer, level, true, node.id);

      /**
       * storing last child co-ordinates
       */
      nodeElement.childrenYMax = levelPointer.y;
      nodeElement.childrenXMax = levelPointer.x + childrenNodeSize.width / 2;
      if (direction === "vertical") {
        /**
         * checking level max Y
         */
        const maxYWhenScrollBar = nodeElement.y + nodeSize.height + 256;
        if (
          nodeElement.hasScrollbaleChildren &&
          levelPointer.y > maxYWhenScrollBar
        ) {
          levelPointer.maxY = maxYWhenScrollBar;
          nodeElement.childrenYMax = maxYWhenScrollBar;
        } else if (levelPointer.y > (levelPointer.maxY ?? 0)) {
          levelPointer.maxY = levelPointer.y;
        }

        levelPointer.y = nodeElement.y;
      } else {
        levelPointer.y -= nodeSize.height;

        if (nodeElement.hasScrollbaleChildren) {
          levelPointer.y = nodeElement.y + 256;
        }
      }
    }

    /**
     * Increment pointer for next node
     */
    if (direction === "horizontal") {
      levelPointer.y += nodeSize.height + gap;
    } else {
      levelPointer.x += nodeSize.width + gap;
    }

    return nodeElement;
  };

  /**
   *
   * @param node : of which x,y calculated
   * @param levelPointer : level pointer which x,y of last node
   */
  const getComputedChildrenElement = (
    node: LineageNodeChildren,
    level: number,
    levelPointer: Pointer,
    parentId: string | undefined
  ): LineageNodeElement => {
    /**
     * add child node co-ordinates based on current pointer
     */
    const nodeElement: LineageNodeElement = {
      id: node.id,
      data: node.data,
      links: node.links,
      level,
      x: levelPointer.x,
      y: levelPointer.y,
      isChildren: true,
      parentId,
    };
    /**
     * Increment child node pointer
     */
    levelPointer.y += childrenNodeSize.height;

    return nodeElement;
  };

  /**
   * compute node elements with their respective co-ordib=nates based on heirarchy and relation
   * @param nodes :  list nodes given by user
   * @param levelPointer : pointer from where to start calculation
   * @param level :  level or heirarhcy in lineage
   */
  const computeElements = async (
    nodes: LineageBaseNode[],
    levelPointer: Pointer,
    level: number,
    isChildren?: boolean,
    parentId?: string
  ) => {
    /**
     * Interate through nodes and calculate co-ordinates
     */
    nodes.forEach((node) => {
      if (isChildren) {
        nodeElements.push(
          getComputedChildrenElement(node, level, levelPointer, parentId)
        );
      } else {
        nodeElements.push(getComputedElement(node, level, levelPointer));
      }

      const parentNode = node as LineageNode;
      if (parentNode.to && parentNode.to.length > 0) {
        computeElements(parentNode.to, levelPointer.next(level + 1), level + 1);
      }
    });
  };
  const pointer = Pointer.levelPointers[1];
  computeElements(data, pointer, 1);

  /**
   * Adjusting vertical gaps
   */
  if (direction === "vertical") {
    Object.keys(Pointer.levelPointers).forEach((key) => {
      const level = Number(key);
      /**
       * check if any level has maxY
       */
      const maxY = Pointer.levelPointers[level].maxY;
      if (maxY !== undefined) {
        /**
         * check if any node has inconsistent gap
         */
        const nodeToCompare = nodeElements.find((node) => {
          return (
            node.level === level + 1 &&
            node.y - maxY !== gap &&
            !node.isChildren
          );
        });
        /**
         * Inconsistent node found , now update y for those nodes
         */
        if (nodeToCompare) {
          const diff = maxY + gap - nodeToCompare?.y;
          nodeElements
            .filter((node) => node.level >= level + 1)
            .forEach((node) => {
              node.y += diff;
            });
        }
      }
    });
  }
  return nodeElements;
}
