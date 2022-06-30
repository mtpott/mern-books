const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const path = require('path');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(routes);

// await server.start();
const startApolloServer = async (typeDefs, resolvers) => {
  

  server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT} :)`);
      console.log(`use graphql at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};


  


startApolloServer(typeDefs, resolvers);