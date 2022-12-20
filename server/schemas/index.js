//DECLARATIONS: typeDefs, resolvers --------------
const typeDefs = require ('./typeDefs');
const resolvers = require('./resolvers');

//EXPORT: Apollo server ---------------------------
module.exports = { typeDefs, resolvers };