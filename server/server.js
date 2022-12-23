//DECLArATIONS: express, mongo config, apollo, path ------------
const express = require('express');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const path = require('path')

const PORT = process.env.PORT || 3001;

//set apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//set express app----------------------------------------
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

//create instance of Apollo with graphQL schema -------------------------
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer(typeDefs, resolvers);

