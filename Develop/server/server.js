const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const typeDefs = require('./models/typeDefs'); 
const resolvers = require('./models/resolvers');

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start(); // Await the server start

  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`)
    );
  });
};

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
