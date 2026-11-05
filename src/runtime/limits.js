// Input files and generated displays have separate budgets. A display limit
// must never turn an already valid physical-source reading into a failure.
export const MAX_EXPANDED_CHARACTERS = 40000;

export class ExpandedViewLimitError extends Error {
  constructor() {
    super('マクロ展開後の表示は文字数の上限を超えたため省略しました。原文側の翻訳は表示できます。');
    this.name = 'ExpandedViewLimitError';
    this.code = 'expanded-output-limit';
  }
}
