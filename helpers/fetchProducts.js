const fetchProducts = async (id) => {
  try {
    const promise = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${id}`);
    const data = await promise.json();
    return data;
  } catch (error) {
    throw new Error(`Algo não está funcionando como deveria :( ${error}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
