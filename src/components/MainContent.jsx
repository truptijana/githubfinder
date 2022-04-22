import React, { Fragment } from 'react'
import Spinner from './Spinner'
import Repo from './Repo';

const MainContent = props => {
  return (
    <div className='mainBlock'>
      <main className='repo_block'>
        {props.loading === true ? (
          <Spinner />
        ) : (
          props.repos.map(rep => {
            return (
              <Fragment key={rep.id}>
                <Repo {...rep} />
              </Fragment>
        
            );
          })
        )
        }

            
      </main>
    </div>
  );
};

export default MainContent