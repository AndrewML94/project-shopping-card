const saveCartItems = (param) => localStorage.setItem('cacheKey', JSON.stringify(param));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
