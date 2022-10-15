const getSavedCartItems = () => JSON.parse(localStorage.getItem('cacheKey'));

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
