require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função.', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se a função fetch foi chamada.', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527.', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });
  it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Testa se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    expect.assertions(1);
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
