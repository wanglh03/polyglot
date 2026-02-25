export const IDS_LAYOUTS = {
  "\u2ff0": {
    parts: 2,
    style: [
      { transform: "scale(0.5, 1)", top: "0", left: "0" },
      { transform: "scale(0.5, 1)", top: "0", left: "0.5em" },
    ],
  },
  "\u2ff1": {
    parts: 2,
    style: [
      { transform: "scale(1, 0.5)", top: "0", left: "0" },
      { transform: "scale(1, 0.5)", top: "0.5em", left: "0" },
    ],
  },
  "\u2ff2": {
    parts: 3,
    style: [
      { transform: "scale(0.4, 1)", top: "0", left: "0" },
      { transform: "scale(0.4, 1)", top: "0", left: "0.3em" },
      { transform: "scale(0.4, 1)", top: "0", left: "0.6em" },
    ],
  },
  "\u2ff3": {
    parts: 3,
    style: [
      { transform: "scale(1, 0.4)", top: "0", left: "0" },
      { transform: "scale(1, 0.4)", top: "0.3em", left: "0" },
      { transform: "scale(1, 0.4)", top: "0.6em", left: "0" },
    ],
  },
  "\u2ff4": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.6)", top: "0.2em", left: "0.2em" },
    ],
  },
  "\u2ff5": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.8)", top: "0.2em", left: "0.2em" },
    ],
  },
  "\u2ff6": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.8)", top: "0", left: "0.2em" },
    ],
  },
  "\u2ff7": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.8)", top: "0.2em", left: "0.2em" },
    ],
  },
  "\u2ff8": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.8, 0.8)", top: "0.2em", left: "0.2em" },
    ],
  },
  "\u2ff9": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.8, 0.8)", top: "0.2em", left: "0" },
    ],
  },
  "\u2ffa": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.8, 0.8)", top: "0", left: "0.2em" },
    ],
  },
  "\u2ffb": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(1, 1)", top: "0", left: "0" },
    ],
  },
};

export interface IdsNode {
  type: "container" | "text";
  classList: string[];
  children?: IdsNode[];
  text?: string;
  style?: {
    position: string;
    transform: string;
    top: string;
    left: string;
  };
}

function applyStyles(node: IdsNode, styles: Record<string, string>) {
  node.style = {
    position: "absolute",
    transform: styles.transform,
    top: styles.top,
    left: styles.left,
  };
}

function next(nodes: IdsNode[]): IdsNode {
  let node = nodes.shift();
  if (node === undefined) {
    node = {
      type: "container",
      classList: ["ids", "empty"],
      children: [],
      text: "",
    };
  }
  return node;
}

export function parseIds(input: string): IdsNode[] {
  let tokens = Array.from(input);

  function parse(tokens: string[]): IdsNode[] {
    let head = tokens.shift();
    if (head === undefined) return [];
    let children = parse(tokens);

    const layout = IDS_LAYOUTS[head as keyof typeof IDS_LAYOUTS];

    if (layout) {
      let node: IdsNode = {
        type: "container",
        classList: ["ids"],
        children: [],
      };

      for (let i = 0; i < layout.parts; i++) {
        let part = next(children);
        applyStyles(part, layout.style[i]);
        node.children!.push(part);
      }

      return [node, ...children];
    } else {
      let node: IdsNode = {
        type: "text",
        classList: ["ids"],
        text: head,
      };
      return [node, ...children];
    }
  }

  return parse(tokens);
}
