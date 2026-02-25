import IdsKanji from "./components/IdsKanji.astro";

// 为 MDX 创建一个包装器
const IdsKanjiMDX = ({ children }) => {
  return IdsKanji({ content: String(children).trim() });
};

export const components = {
  "ids-kanji": IdsKanjiMDX,
};
