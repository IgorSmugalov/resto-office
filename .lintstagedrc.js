const path = require('path')

const prettierFormat = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const stylelintFormat = (filenames) =>
  `stylelint ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} --fix`

const tscLintCommand = (filenames) => 'tsc --noEmit'

module.exports = {
  '**/*.(ts|tsx)': [tscLintCommand],
  '**/*.(js|jsx|ts|tsx)': [eslintCommand, prettierFormat],
  '**/*.(css|scss)': [stylelintFormat, prettierFormat],
  '**/*.(md|mdx)': [prettierFormat],
}
