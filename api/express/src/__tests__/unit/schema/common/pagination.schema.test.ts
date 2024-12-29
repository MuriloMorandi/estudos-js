import paginationSchema from '@schemas/common/pagination.schema';

describe('Schema de Paginação', () => {
  it('deve validar um objeto de paginação válido', () => {
    const validInput = {
      porPagina: '10',
      pagina: '1',
      ordenarPor: 'nome',
      ordenarAsc: 'true',
    };

    const result = paginationSchema.parse(validInput);

    expect(result).toEqual({
      porPagina: 10,
      pagina: 1,
      ordenarPor: 'nome',
      ordenarAsc: true,
    });
  });

  it('deve falhar quando porPagina não for um inteiro positivo', () => {
    const invalidInput = {
      porPagina: '-5',
      pagina: '1',
      ordenarPor: 'nome',
      ordenarAsc: 'true',
    };

    expect(() => paginationSchema.parse(invalidInput)).toThrow(
      'O número de itens por página deve ser maior que 0.'
    );
  });

  it('deve falhar quando pagina não for um inteiro positivo', () => {
    const invalidInput = {
      porPagina: '10',
      pagina: '-2',
      ordenarPor: 'nome',
      ordenarAsc: 'true',
    };

    expect(() => paginationSchema.parse(invalidInput)).toThrow(
      'O número da página deve ser maior que 0.'
    );
  });

  it('deve falhar quando ordenarPor tiver menos de 2 caracteres', () => {
    const invalidInput = {
      porPagina: '10',
      pagina: '1',
      ordenarPor: 'a',
      ordenarAsc: 'true',
    };

    expect(() => paginationSchema.parse(invalidInput)).toThrow(
      'A string deve conter pelo menos 2 caracteres.'
    );
  });

  it('deve falhar quando ordenarAsc não for "true" ou "false"', () => {
    const invalidInput = {
      porPagina: '10',
      pagina: '1',
      ordenarPor: 'nome',
      ordenarAsc: 'invalid',
    };
    
    expect(() => paginationSchema.parse(invalidInput)).toThrow(
     'O valor de ordenarAsc deve ser um booleano.'
    );
  });

  it('deve remover espaços extras em ordenarPor', () => {
    const input = {
      porPagina: '10',
      pagina: '1',
      ordenarPor: '   nome   ',
      ordenarAsc: 'true',
    };

    const result = paginationSchema.parse(input);

    expect(result.ordenarPor).toBe('nome');
  });
    
  it('deve a string ordenarAsc em um Boolean ', () => {
    const input = {
      porPagina: '10',
      pagina: '1',
      ordenarPor: '   nome   ',
      ordenarAsc: 'true',
    };

    const result = paginationSchema.parse(input);

    expect(result.ordenarAsc).toBe(true);
  });
});
