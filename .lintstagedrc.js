import path from 'path';

export default {
  '*.{ts,tsx}': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map((file) => path.relative(cwd, file));
    return `eslint --max-warnings=0 ${relativePaths.join(' ')}`;
  },
};
