# Reactivity

Adding a feature library:
`nx generate lib --name=activity --no-interactive --framework=react`

TODO would like at the end of the course to combine all the apis with graphql

Adding a new React component
By default this will create a functional component
and will create style and test files, the style extension will follow the project standard
`nx g @nrwl/react:component activity-detail --directory=detail --project=activity`
`nx g @nrwl/react:component loading --project=components`

to generate a uuid client side
npm install uuid @types/uuid

to generate a gerneral purpose library
nx generate @nrwl/workspace:library api
