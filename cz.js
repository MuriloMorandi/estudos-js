module.exports = {
  prompter(cz, commit) {
    console.log('Por favor, responda as perguntas abaixo para criar uma mensagem de commit');    
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Selecione o tipo de alteração que você está fazendo:',
        choices: [
            {
                name: 'feat: Adicionado uma nova funcionalidade',
                value: ':sparkles: feat'
            },
            { 
                name: 'fix: Correção de um bug',
                value: ':bug: fix'
            },
            {
                name: 'WIP: Trabalho em progresso',
                value: ':construction: WIP'
            },
            {
                name: 'test: Adicionando ou corrigindo testes',
                value: ':test_tube: test'
            },
            {
                name: 'refactor: Mudanças no código que não corrigem bug ou adicionam feature',
                value: ':recycle: refactor'
            },
            {
                name: 'chore: Atualizações em tarefas de build ou configurações',
                value: ':wrench: chore'
            },
            {
                name: 'docs: Atualização de docs( README, CHANGELOG, etc)',
                value: ':books: docs:'
            },
            {
                name: 'CI: Mudanças em configurações de CI',
                value: ':bricks: CI '
            },
            {
                name: 'new package: Criação de um novo projeto no workspace',
                value: ':package: new package'
            },
            {
                name: 'style: Mudanças no estilo (formatação do código, etc)',
                value: ':ok_hand: style'
            }
        ]
    },
    {
        type: 'list',
        name: 'scope',
        message: 'Qual escopo da alteração:',
        choices: [
            {
                name: 'core: Alterações no projeto raiz (core)',
                value: 'core'
            },
            {
                name: 'api: Alterações no projeto de api',
                value: 'api'
            },
            {
                name: 'web: Alterações no projeto de web',
                value: 'web'
            },
            {
                name: 'utils: Alterações no projeto de utils',
                value: 'utils'
            },
            {
                name: 'database: Alterações no projeto de database',
                value: 'database'
            },
            {
                name: 'ci: Alterações nos arquivos de configuração de CI',
                value: 'ci'
            },
            {
                name: 'empty: Alterações que não se encaixam em nenhum escopo específico',
                value: ''
            },
        ]  
    },
    {
        type: 'input',
        name: 'subject',
        message: 'Escreva uma mensagem curta e objetiva:\n'
    },
    {
        type: 'input',
        name: 'body',
        message: 'Forneça uma descrição mais detalhada da mudança (opcional):\n'
    },
    
    ]).then((answers) => {
        let commitMessage = `${answers.type}`;
        commitMessage += `${answers.scope ? `(${answers.scope})` : ''}`;
        commitMessage += `: ${ answers.subject } \n\n${ answers.body }`;
        
        commit(commitMessage);
    });
  }
};