export const IDS_LAYOUTS = {
  "⿰": {
    parts: 2,
    style: [
      { transform: "scale(0.55, 1)", top: "0", left: "0" },
      { transform: "scale(0.55, 1)", top: "0", left: "0.5em" },
    ],
  },
  "⿱": {
    parts: 2,
    style: [
      { transform: "scale(1, 0.55)", top: "0", left: "0" },
      { transform: "scale(1, 0.55)", top: "0.5em", left: "0" },
    ],
  },
  "⿲": {
    parts: 3,
    style: [
      { transform: "scale(0.35, 1)", top: "0", left: "0" },
      { transform: "scale(0.35, 1)", top: "0", left: "0.33em" },
      { transform: "scale(0.35, 1)", top: "0", left: "0.66em" },
    ],
  },
  "⿳": {
    parts: 3,
    style: [
      { transform: "scale(1, 0.35)", top: "0", left: "0" },
      { transform: "scale(1, 0.35)", top: "0.33em", left: "0" },
      { transform: "scale(1, 0.35)", top: "0.66em", left: "0" },
    ],
  },
  "⿴": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.6)", top: "0.2em", left: "0.2em" },
    ],
  },
  "⿵": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.7)", top: "0.15em", left: "0.2em" },
    ],
  },
  "⿶": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.6, 0.7)", top: "0.1em", left: "0.2em" },
    ],
  },
  "⿷": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.7, 0.6)", top: "0.2em", left: "0.2em" },
    ],
  },
  "⿸": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.7, 0.8)", top: "0.2em", left: "0.2em" },
    ],
  },
  "⿹": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.7, 0.8)", top: "0.2em", left: "0" },
    ],
  },
  "⿺": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(0.7, 0.83)", top: "0", left: "0.28em" },
    ],
  },
  "⿻": {
    parts: 2,
    style: [
      { transform: "scale(1, 1)", top: "0", left: "0" },
      { transform: "scale(1, 1)", top: "0", left: "0" },
    ],
  },
};

// Common style overrides for reuse
const RIGHT_WIDE = { transform: "scale(0.7, 1)", left: "0.33em" };
const LEFT_NARROW = { transform: "scale(0.4, 1)" };
const LEFT_NARROW_SHORT = { transform: "scale(0.4, 0.9)" };
const BOTTOM_BIG = { transform: "scale(1, 0.7)", top: "0.35em" };
const BOTTOM_INNER = {
  transform: "scale(0.8, 0.7)",
  top: "0.25em",
  left: "0.05em",
};
const MID_WIDE = { transform: "scale(0.4, 1)", left: "0.33em" };

export const IDS_PART_OVERRIDES = {
  "⿰": {
    扌: { second: RIGHT_WIDE },
    亻: { second: RIGHT_WIDE },
    氵: { second: RIGHT_WIDE },
    冫: { second: RIGHT_WIDE },
    礻: { second: RIGHT_WIDE },
    饣: { second: RIGHT_WIDE },
    飠: { second: RIGHT_WIDE },
    女: { first: LEFT_NARROW, second: RIGHT_WIDE },
    言: { first: LEFT_NARROW, second: RIGHT_WIDE },
    爿: { first: LEFT_NARROW, second: RIGHT_WIDE },
    土: { first: LEFT_NARROW_SHORT, second: RIGHT_WIDE },
    山: { first: LEFT_NARROW_SHORT, second: RIGHT_WIDE },
  },
  "⿱": {
    艹: { second: BOTTOM_BIG },
    宀: { second: BOTTOM_INNER },
  },
  "⿲": {
    扌: { second: MID_WIDE },
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

      let firstPartText: string | null = null;

      for (let i = 0; i < layout.parts; i++) {
        let part = next(children);
        let style = layout.style[i];

        if (i === 0 && part.type === "text") {
          firstPartText = part.text ?? null;
        }

        if (firstPartText) {
          const overridesByFirst =
            IDS_PART_OVERRIDES[head as keyof typeof IDS_PART_OVERRIDES];
          const override = overridesByFirst && overridesByFirst[firstPartText];
          if (override) {
            if (i === 0 && override.first) {
              style = { ...style, ...override.first };
            }
            if (i === 1 && override.second) {
              style = { ...style, ...override.second };
            }
          }
        }

        applyStyles(part, style);
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
