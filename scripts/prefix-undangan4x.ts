#!/usr/bin/env tsx
import fs from 'node:fs/promises';
import path from 'node:path';
import postcss, { type PluginCreator, type Root } from 'postcss';

const SOURCE = path.resolve('public/themes/undangan-4x/css/undangan4x.css');
const TARGET = path.resolve('public/themes/undangan-4x/css/undangan4x.scoped.css');
const PREFIX = '#undangan4x';

function transformSelector(selector: string) {
  const trimmed = selector.trim();
  if (!trimmed) {
    return trimmed;
  }
  if (trimmed.startsWith(PREFIX)) {
    return trimmed;
  }

  if (trimmed.startsWith('html')) {
    const match = trimmed.match(/^(html[^\s]*?)(\s+.+)?$/);
    if (match) {
      const [, htmlPart, rest] = match;
      if (!rest) {
        return `${htmlPart} ${PREFIX}`;
      }
      const scoped = rest.trim();
      return `${htmlPart} ${PREFIX} :where(${scoped})`;
    }
  }

  if (trimmed.startsWith('body')) {
    const match = trimmed.match(/^(body[^\s]*?)(\s+.+)?$/);
    if (match) {
      const [, , rest] = match;
      if (!rest) {
        return PREFIX;
      }
      const scoped = rest.trim();
      return `${PREFIX} :where(${scoped})`;
    }
  }

  return `${PREFIX} :where(${trimmed})`;
}

const plugin: PluginCreator<void> = () => {
  return {
    postcssPlugin: 'prefix-undangan4x',
    Once(root: Root) {
      root.walkRules((rule) => {
        const parent = rule.parent;
        if (parent && parent.type === 'atrule') {
          const name = parent.name?.toLowerCase();
          if (name === 'keyframes' || name === 'font-face') {
            return;
          }
        }

        if (!rule.selectors) {
          return;
        }

        rule.selectors = rule.selectors.map(transformSelector);
      });
    },
  };
};
plugin.postcss = true;

async function main() {
  const css = await fs.readFile(SOURCE, 'utf8');
  const result = await postcss([plugin()]).process(css, {
    from: SOURCE,
    to: TARGET,
  });

  await fs.mkdir(path.dirname(TARGET), { recursive: true });
  await fs.writeFile(TARGET, result.css, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
