require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se o retorno é o esperado.', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
});
