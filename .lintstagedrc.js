module.exports = {
  '{apps, libs}/**/*': [
    'npx nx affected -t check'
  ],
};
