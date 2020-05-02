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

add a component to components lib
nx g @nrwl/react:component upload-dropzone --directory=dropzone --project=components
npm install uuid @types/uuid

to generate a general purpose library
nx generate @nrwl/workspace:library api

set up api debugger using <https://github.com/nrwl/nx/issues/1175>

need to install class-transformer and class-validator for validation

npm install react-final-form final-form
nx g @nestjs/schematics:module comment --source-root apps/api/src --path app
nx generate @nestjs/schematics:service comment --source-root apps/api/src --path app
nx generate @nestjs/schematics:controller comment --source-root apps/api/src --path app

Nest authentication with passport <https://docs.nestjs.com/techniques/authentication>
nx g @nestjs/schematics:module auth --source-root apps/api/src --path app
nx g @nestjs/schematics:module photos --source-root apps/api/src --path app
nx generate @nestjs/schematics:service auth --source-root apps/api/src --path app
nx g @nestjs/schematics:module users --source-root apps/api/src --path app
nx generate @nestjs/schematics:service users --source-root apps/api/src --path app
nx generate @nestjs/schematics:controller auth --source-root apps/api/src --path app
nx g @nestjs/schematics:module user-activity --source-root apps/api/src --path app
nx generate @nestjs/schematics:service
user-activity --source-root apps/api/src --path app
`curl -X POST http://localhost:3333/api/auth/create -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"`

`curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"`

Environment config management:
<https://docs.nestjs.com/techniques/configuration>

Got error Cannot find module '/Users/letheras/Desktop/Dev/repos/udemy/react-mobx-dotnet-core/reactivity/@nrwl/react/plugins/babel' when trying to run the frontend.

npm i -D @babel/core@^7.0.0-0

Cannot read property 'joinColumns' of undefined error usually the fix involves some stupid typo or incorrect join association

Pa$$w0rd

nx g @nrwl/nest:application users-api  to add a new nest app

<https://docs.nestjs.com/graphql/quick-start>

also npm i --save apollo-server-express


docker exec -it reactivity psql -U postgres -c "create database lyricalnest"
nx generate @nestjs/schematics:resolver lyrics --source-root apps/lyrical/src --path app
nx generate @nestjs/schematics:resolver songs --source-root apps/lyrical/src --path app
nx generate @nestjs/schematics:service lyrics --source-root apps/lyrical/src --path app
nx generate @nrwl/react:app lyrical-web-client
