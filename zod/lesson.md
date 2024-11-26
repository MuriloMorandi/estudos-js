# Exercícios com a biblioteca Zod

## 1. Validação de string
Crie um esquema que valide uma string:
- Deve ser uma string
- Não pode ser uma string vazia
- Deve ter no máximo 25 caracteres

[Schema de validação](src/lesson_001.ts)

[Test do Schema](src/__test__/lesson_001.test.ts)

---

## 2. Validação de Objeto
Crie um esquema que valide um objeto com as propriedades:
- `nome` (string, obrigatório)
- `idade` (número, maior ou igual a 18)
- `email` (deve ser um email válido)
- `apelido` (opcional, mas se fornecido deve ser uma string com no mínimo 2 caracteres)

[Schema de validação](src/lesson_002.ts)

[Test do Schema](src/__test__/lesson_002.test.ts)

---

## 3. Validação de array
Crie um esquema que valide um array de strings contendo no mínimo 3 itens e no máximo 5.  
Teste com arrays que não atendem ao limite ou que possuem valores não-string.

[Schema de validação](src/lesson_003.ts)

[Test do Schema](src/__test__/lesson_003.test.ts)

---

## 4. Validação de array de Objetos
Crie um esquema para validar uma lista de produtos. Cada produto deve ter:

- `nome` (string com pelo menos 3 caracteres)
- `preco` (número, positivo maior que zero)
- `quantidade`: (número, inteiro positivo)
- `categoria`: (array de string  contendo no mínimo 1 item)

[Schema de validação](src/lesson_004.ts)

[Test do Schema](src/__test__/lesson_004.test.ts)

---

## 5. Validação enums
Defina um enum de funções (`Admin`, `User`, `Guest`).  
Crie um esquema para validar um objeto com:
- `username` (string)
- `role` (valores válidos do enum)

Teste com dados válidos e inválidos.

[Schema de validação](src/lesson_005.ts)

[Test do Schema](src/__test__/lesson_005.test.ts)


