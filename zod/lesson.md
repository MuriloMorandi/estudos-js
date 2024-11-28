# Exercícios com a biblioteca Zod

## 1. Validação de string
Crie um esquema que valide uma string:
- Deve ser uma string
- Não pode ser uma string vazia
- Deve ter no máximo 25 caracteres

[Schema de validação](src/lesson_001.ts)

[Test do Schema](src/__test__/lesson_001.test.ts)

---

## 2. Validação de objeto
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

---

## 6. Validação encadeada
Crie um esquema para validar um formulário de cadastro de desenvolvedor com validações condicionais:
- `nome` (string com pelo menos 5 caracteres)
- `email` (string, email válido)
- `linguagemDeProgramacaoPrincipal` (string com pelo menos 2 caracteres)
- `nivel` (enum, [`junior`, `pleno` , `senior`])
- `experienciaEmAnos` (número, mínimo 1 e máximo 30)
- `tecnologias` (array de string com pelo menos um item ) 

- Se for `senior`, precisa ter:
    - Tempo de experiência (mínimo 5 anos)
    - Pelo menos 2 tecnologias avançadas

- Se for `pleno`, precisa ter:
    - Tempo de experiência (mínimo 2 anos)
    - Pelo menos 1 tecnologias avançadas


(Realizar fazendo uso do `.refine()` para validações condicionais)

[Schema de validação](src/lesson_006.ts)

[Test do Schema](src/__test__/lesson_006.test.ts)

---

## 7. Validação aninhada
Crie um esquema que valide um objeto com as propriedades:
- `usuario` :
    - `id` (UUID)
    - `nome` (string)
- `endereco` :
    - `rua` (string)
    - `numero` (número inteiro positivo)
    - `bairro` (string)
    - `cidade` (string)
    - `cep` (string, válido no formato `00000-000` ou `00000000`)

[Schema de validação](src/lesson_007.ts)

[Test do Schema](src/__test__/lesson_007.test.ts)

---

