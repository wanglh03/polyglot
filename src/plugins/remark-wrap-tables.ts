import { visit } from "unist-util-visit";
import type { Plugin } from "unified";

export default function remarkWrapTables(): Plugin {
  return () => (tree: any) => {
    visit(
      tree,
      "table",
      (node: any, index: number | undefined, parent: any) => {
        if (!parent || typeof index !== "number") return;
        parent.children[index] = {
          type: "mdxJsxFlowElement",
          name: "Fullwidth",
          attributes: [],
          children: [node],
        };
      },
    );
  };
}
