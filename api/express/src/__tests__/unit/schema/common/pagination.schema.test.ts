import paginationSchema from '@schemas/common/pagination.schema';

describe('Schema de paginação', () => {
  it('deve validar um objeto de paginação válido', () => {
    const validInput = {
      perPage: '10',
      page: '1',
      sortBy: 'name',
      sortDesc: 'true',
    };

    const result = paginationSchema.parse(validInput);

    expect(result).toEqual({
      perPage: 10,
      page: 1,
      sortBy: 'name',
      sortDesc: true,
    });
  });

  it('deve falhar quando perPage não for um inteiro positivo', () => {
    const invalidInput = {
      perPage: '-5',
      page: '1',
      sortBy: 'name',
      sortDesc: 'true',
    };

    expect(() => paginationSchema.parse(invalidInput)).toThrow(
      'O número de itens por página deve ser maior que 0.'
    );
  });

  it('deve falhar quando pagina não for um inteiro positivo', () => {
    const invalidInput = {
      perPage: '10',
      page: '-2',
      sortBy: 'name',
      sortDesc: 'true',
    };

    expect(() => paginationSchema.parse(invalidInput)).toThrow(
      'O número da página deve ser maior que 0.'
    );
  });

  it('deve falhar quando ordenarPor tiver menos de 2 caracteres', () => {
    const invalidInput = {
      perPage: '10',
      page: '1',
      sortBy: 'a',
      sortDesc: 'true',
    };

    expect(() => paginationSchema.parse(invalidInput)).toThrow(
      'A string deve conter pelo menos 2 caracteres.'
    );
  });

  it('deve falhar quando sortDesc não for "true" ou "false"', () => {
    const invalidInput = {
      perPage: '10',
      page: '1',
      sortBy: 'name',
      sortDesc: 'invalid',
    };
    
    expect(() => paginationSchema.parse(invalidInput)).toThrow(
     'O valor de sortDesc deve ser um booleano.'
    );
  });

  it('deve remover espaços extras em ordenarPor', () => {
    const input = {
      perPage: '10',
      page: '1',
      sortBy: '   name   ',
      sortDesc: 'true',
    };

    const result = paginationSchema.parse(input);

    expect(result.sortBy).toBe('name');
  });
    
  it('deve a string sortDesc em um Boolean ', () => {
    const input = {
      perPage: '10',
      page: '1',
      sortBy: '   name   ',
      sortDesc: 'true',
    };

    const result = paginationSchema.parse(input);

    expect(result.sortDesc).toBe(true);
  });
});
