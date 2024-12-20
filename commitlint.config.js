module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [ 2, 'always',
      ['feat', 'fix', 'WIP', 'test', 'refactor','chore', 'docs', 'CI', 'new package', 'style'],
    ],
    'scope-enum': [ 2, 'always', ['core', 'api', 'web', 'utils', 'database', 'ci'], ],
    'scope-case': [2, 'always', 'lower-case'],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', ['sentence-case', 'start-case']],
    'header-max-length': [2, 'always', 72],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w+: )?(\w+)(?:\(([^)]+)\))?: (.+)$/,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },
};
