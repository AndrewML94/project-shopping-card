require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se o retorno é o esperado.', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
});
