module.exports = {
  onPreBuild: async ({ utils }) => {
    console.log('Clearing Netlify cache...');
    await utils.cache.remove('.next/cache');
    console.log('Cache cleared.');
  },
}; 