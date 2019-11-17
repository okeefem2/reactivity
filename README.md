# Reactivity

Adding a react feature library:
`nx generate @nrwl/react:library home`

Adding a general purpose ts library
`nx generate @nrwl/workspace:library activity-store`

TODO would like at the end of the course to combine all the apis with graphql

Adding a new React component
By default this will create a functional component
and will create style and test files, the style extension will follow the project standard
`nx g @nrwl/react:component activity-detail --directory=detail --project=activity`
`nx g @nrwl/react:component loading --project=components`
nx g @nrwl/react:component activity-detail-header --directory=detail-header --project=activity
nx g @nrwl/react:component activity-detail-info --directory=detail-info --project=activity
nx g @nrwl/react:component activity-detail-chat --directory=detail-chat --project=activity
nx g @nrwl/react:component activity-detail-sidebar --directory=detail-sidebar --project=activity
to generate a uuid client side
npm install uuid @types/uuid

to generate a gerneral purpose library
nx generate @nrwl/workspace:library api
