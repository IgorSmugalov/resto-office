module.exports = function (plop) {
  plop.setGenerator('FC', {
    description: 'Generate React Functional Component',
    prompts: [
      {
        type: 'list',
        name: 'layer',
        message: 'Choose Feature-Sliced Design Layer',
        choices: ['global', 'app', 'widgets', 'features', 'entities', 'shared'],
      },
      {
        type: 'input',
        name: 'slice',
        message: 'Enter Slice name or skip',
      },
      {
        type: 'input',
        name: 'segment',
        message: 'Enter Segment name or or skip',
      },
      {
        type: 'input',
        name: 'component',
        message: 'Enter Component Name',
      },
    ],
    actions: [
      {
        type: 'add',
        path:
          'src/{{kebabCase layer}}/{{kebabCase slice}}/{{kebabCase' +
          ' segment}}/{{kebabCase component}}/{{kebabCase component}}.tsx',
        templateFile: '.plop/react-func-component.hbs',
      },
      {
        type: 'add',
        path:
          'src/{{kebabCase layer}}/{{kebabCase slice}}/{{kebabCase' +
          ' segment}}/{{kebabCase component}}/index.ts',
        templateFile: '.plop/public-api.hbs',
      },
      {
        type: 'add',
        path:
          'src/{{kebabCase layer}}/{{kebabCase slice}}/{{kebabCase' +
          ' segment}}/{{kebabCase component}}/{{kebabCase' +
          ' component}}.module.scss',
        templateFile: '.plop/styles.hbs',
      },
      {
        type: 'add',
        path:
          'src/{{kebabCase layer}}/{{kebabCase slice}}/{{kebabCase' +
          ' segment}}/{{kebabCase component}}/{{kebabCase' +
          ' component}}.stories.tsx',
        templateFile: '.plop/stories.hbs',
      },
    ],
  })
}
