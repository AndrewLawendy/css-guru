# CSS Guru

A platform that helps developers to better understand CSS through
declaration interpretation and code smelling.

## Motivation

I'm a front end engineer who was self taught through multiple online learning
platforms, and I understand how challenging the code is
for someone who has no prior knowledge of it.

My sister started her own path as well and sometimes she struggles
with the frustration of writing code that doesn't do as expected for her,
so I thought that I can build a tool that can help her translating her code
into a human comprehensible language so she can easily spot the mistake
in her logic, and I like to share this tool with the world.

## Highlights

- Support experimental and not supported features,
  selectors with params and `nth` selectors interpretations.
- We evaluate obsolete and contradictory declarations.

More on that in our [How It Works](./src/articles/how-it-works.md) page.

## Stack

- Library: ReactJs
- Language: TypeScript
- Styling: CSS Modules and SCSS
- UI Framework: [Semantic UI React](https://react.semantic-ui.com/)
- Code Editor: [ACE](https://www.npmjs.com/package/react-ace)
- CSS Parser: [CSS Tree](https://www.npmjs.com/package/css-tree)
- CSS Validator: [CSS Tree Validator](https://www.npmjs.com/package/csstree-validator)
- Linter: ESLint
- Formatter: Prettier
- Precommits: Husky and Lint staged
- Transpiler: Babel
- Bundler: [ParcelJs](https://parceljs.org/)

## Scripts

- yarn dev
- yarn build
- yarn format
- yarn lint
- yarn clear-build-cache
