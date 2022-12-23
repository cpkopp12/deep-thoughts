import React from 'react';
//DECLARATIONS: useQuery, QUERY_THOUGHTS, thought list ---------------------------
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  //useQuery hook for query req
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thoughts(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
