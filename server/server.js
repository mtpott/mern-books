const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// const path = require('path');
// const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT} :)`);
      console.log(`use graphql at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};


// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

startApolloServer(typeDefs, resolvers);