export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,module.css}': ['stylelint --fix', 'prettier --write'],
  '*.{json,md,html}': ['prettier --write'],
};
