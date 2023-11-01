module.exports = function (plop) {
  plop.setGenerator('FC', {
    description: 'Generate React Functional Component',
    prompts: [
      {
        type: 'input',
        name: 'component',
        message: 'Enter Component Name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'tmp/{{kebabCase component}}/{{kebabCase component}}.tsx',
        templateFile: '.plop/react-func-component.hbs',
      },
      {
        type: 'add',
        path: 'tmp/{{kebabCase component}}/index.ts',
        templateFile: '.plop/public-api.hbs',
      },
      {
        type: 'add',
        path:
          'tmp/{{kebabCase component}}/{{kebabCase' +
          ' component}}.module.scss',
        templateFile: '.plop/styles.hbs',
      },
      {
        type: 'add',
        path:
          'tmp/{{kebabCase component}}/{{kebabCase' +
          ' component}}.stories.tsx',
        templateFile: '.plop/stories.hbs',
      },
    ],
  })
}
