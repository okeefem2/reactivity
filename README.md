# Reactivity

Adding a react feature library:
`nx generate @nrwl/react:library home`
Adding a general purpose ts library
`nx g @nrwl/workspace:library activity-store`
TODO would like at the end of the course to combine all the apis with graphql
nx g @nrwl/workspace:library user-store
Adding a new React component
By default this will create a functional component
and will create style and test files, the style extension will follow the project standard
`nx g @nrwl/react:component activity-detail --directory=detail --project=activity`
`nx g @nrwl/react:component loading --project=components`
nx g @nrwl/react:component activity-detail-header --directory=detail-header --project=activity
nx g @nrwl/react:component activity-detail-info --directory=detail-info --project=activity
nx g @nrwl/react:component activity-detail-chat --directory=detail-chat --project=activity
nx g @nrwl/react:component activity-detail-sidebar --directory=detail-sidebar --project=activity
nx g @nrwl/react:component not-found --directory=not-found --project=components
to generate a uuid client side
npm install uuid @types/uuid

to generate a general purpose library
nx generate @nrwl/workspace:library api

set up api debugger using <https://github.com/nrwl/nx/issues/1175>

need to install class-transformer and class-validator for validation

npm install react-final-form final-form

Nest authentication with passport <https://docs.nestjs.com/techniques/authentication>
nx g @nestjs/schematics:module auth --source-root apps/api/src --path app
nx generate @nestjs/schematics:service auth --source-root apps/api/src --path app
nx g @nestjs/schematics:module users --source-root apps/api/src --path app
nx generate @nestjs/schematics:service users --source-root apps/api/src --path app
nx generate @nestjs/schematics:controller auth --source-root apps/api/src --path app
nx g @nestjs/schematics:module user-activity --source-root apps/api/src --path app
nx generate @nestjs/schematics:service
user-activity --source-root apps/api/src --path app
`curl -X POST http://localhost:3333/api/auth/create -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"`

`curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"`
