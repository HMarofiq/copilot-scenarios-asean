export function formatKitTree({ root, entries }, descriptions = new Map()) {
  if (typeof root !== 'string' || !root || /[\\/\r\n]/.test(root) || !Array.isArray(entries)) {
    throw new Error('Invalid demo kit manifest');
  }
  const tree = new Map();
  for (const path of entries) {
    if (typeof path !== 'string' || /[\\\r\n]/.test(path)) throw new Error('Invalid demo kit entry');
    const directory = path.endsWith('/');
    const parts = (directory ? path.slice(0, -1) : path).split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) throw new Error(`Invalid demo kit path: ${path}`);
    let children = tree;
    for (const [index, name] of parts.entries()) {
      const isDirectory = index < parts.length - 1 || directory;
      if (!children.has(name)) children.set(name, { name, directory: isDirectory, children: new Map(), path: parts.slice(0, index + 1).join('/') });
      const node = children.get(name);
      if (node.directory !== isDirectory) throw new Error(`Conflicting demo kit path: ${path}`);
      children = node.children;
    }
  }
  const lines = [{ text: `${root}/` }];
  const walk = (children, prefix = '') => {
    const nodes = [...children.values()].sort((a, b) => Number(b.directory) - Number(a.directory) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    nodes.forEach((node, index) => {
      const last = index === nodes.length - 1;
      lines.push({ text: `${prefix}${last ? '└── ' : '├── '}${node.name}${node.directory ? '/' : ''}`, description: descriptions.get(node.path) });
      if (node.directory) walk(node.children, `${prefix}${last ? '    ' : '│   '}`);
    });
  };
  walk(tree);
  const width = Math.max(...lines.slice(1).map((line) => line.text.length), 0);
  return lines.map(({ text, description }) => description ? `${text.padEnd(width + 3)}# ${description.replace(/\s+/g, ' ')}` : text).join('\n');
}
