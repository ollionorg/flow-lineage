import { LineageNode } from "packages/@cldcvr/flow-lineage/src";

export default function (): LineageNode[] {
  const nodes = [];

  for (let index = 0; index < 24; index++) {
    nodes.push({
      id: `node-${index}`,
      to: [
        {
          id: `node-${index}-1`,
        },
        {
          id: `node-${index}-2`,
          to: [
            {
              id: `node-${index}-2-1`,
              to: [
                {
                  id: `node-${index}-2-1-1`,
                },
                {
                  id: `node-${index}-2-1-2`,
                  to: [
                    {
                      id: `node-${index}-2-1-2-1`,
                    },
                    {
                      id: `node-${index}-2-1-2-2`,
                      to: [
                        {
                          id: `node-${index}-2-1-2-1`,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      children: [
        {
          id: `n-${index}-c-1`,
        },
        {
          id: `n-${index}-c-2`,
        },
        {
          id: `n-${index}-c-3`,
        },
        {
          id: `n-${index}-c-4`,
        },
        {
          id: `n-${index}-c-5`,
        },
        {
          id: `n-${index}-c-6`,
        },
        {
          id: `n-${index}-c-7`,
        },
        {
          id: `n-${index}-c-8`,
        },
        {
          id: `n-${index}-c-9`,
        },
        {
          id: `n-${index}-c-10`,
        },
        {
          id: `n-${index}-c-11`,
        },
        {
          id: `n-${index}-c-12`,
        },
        {
          id: `n-${index}-c-13`,
        },
        {
          id: `n-${index}-c-14`,
        },
        {
          id: `n-${index}-c-15`,
        },
        {
          id: `n-${index}-c-16`,
        },
      ],
    });
  }
  return nodes;
}
