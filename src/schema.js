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
    
    type Mutation
    {
      remove_person(id: ID!): String
      add_person(id: ID!, age: Int!, name: String!): String
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
      },
    Mutation:
      {
        remove_person: (_, { id })=>
        {
          let index;
          
          persons.filter((d, i)=>
          {
            if (d.id === id)
            {
              index = i;
            }
          });
          
          persons.splice(index, 1);
          
          return 'success';
        },
        
        add_person: (_, { id, age, name })=>
        {
          const person =
            {
              id:   id,
              age:  age,
              name: name
            };
          
          console.log(person);
          
          persons.push(person);
          
          return 'success';
        }
      }
  };

const schema = makeExecutableSchema({ typeDefs: definitions, resolvers: resolvers });

export default schema;

