import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayGround from 'graphql-playground-middleware-express';
//Port
const port = 5200;
//Server
const server = new ApolloServer({ schema, introspection: true });
const app = express();
app.use('*', cors());
app.use(compression());

server.start().then(res => {
 server.applyMiddleware({ app });
 app.get('/', expressPlayGround({
    endpoint: '/graphql'
 }))
 app.listen({ port }, () =>
    console.log(`GraphQL API with host http://localhost:${port}/graphql`)
 )
});