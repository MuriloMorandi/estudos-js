module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', ['sentence-case', 'start-case']],
    'subject-empty': [2, 'never'], // Garantir que o assunto não esteja vazio
    'type-empty': [2, 'never'], // Garantir que o tipo não esteja vazio
    'type-case': [2, 'always', 'lower-case'], // Tipo em minúsculas
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w+: )?(\w+)(?:\(([^)]+)\))?: (.+)$/,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },
};
