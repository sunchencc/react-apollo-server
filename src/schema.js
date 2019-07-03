import { makeExecutableSchema } from 'graphql-tools'

const persons =
  [
    {
      id:    0,
      age:   23,
      name: 'Tom Holland'
    },
    {
      id:    1,
      age:   54,
      name: 'Robert Downey Jr.'
    },
    {
      id:    2,
      age:   43,
      name: 'Ryan Reynolds'
    },
  ];

const definitions =
  `
    type person
    {
      id:   ID
      age:  Int
      name: String
    }
    
    type Query
    {
      get_persons: [person]
    }
  `;

const resolvers =
  {
    Query:
      {
        get_persons: ()=>
        {
          return persons;
        }
      }
  };

const schema = makeExecutableSchema({ typeDefs: definitions, resolvers: resolvers });

export default schema;

