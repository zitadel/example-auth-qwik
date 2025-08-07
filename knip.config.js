// noinspection JSUnresolvedReference
module.exports = {
  entry: [
    'src/entry.*.tsx',
    'src/root.tsx',
    'src/routes/**/*.tsx',
    'src/routes/**/*.ts',
  ],
  ignoreDependencies: ['tailwindcss', '@qwik-city-plan'],
};
