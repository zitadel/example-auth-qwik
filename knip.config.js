module.exports = {
  ignore: ['commitlint.config.js'],
  entry: [
    'src/entry.*.tsx',
    'src/root.tsx',
    'src/routes/**/*.tsx',
    'src/routes/**/*.ts',
  ],
  ignoreDependencies: ['@commitlint/config-conventional', '@qwik-city-plan'],
};
