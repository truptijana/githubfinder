//!fetch method
// import React, { useEffect, useState } from 'react'

// const Home = () => {
//     let [state, setState] = useState([]);

//     useEffect( () => {
//         window.fetch("https://api.github.com/users", {
//             method: 'GET',
//             headers: {
//                 "content-type": "application/json",
//             },
//         })
//             .then(data => {
//                 data.json().then(value => {
//                     setState(value);
//                 });
//             })
//             .catch(err => console.log(err));
//     }, []);
//     console.log(state);
//     return <div>Home</div>
  
// };

// export default Home

//!Ajax method
// import React, { Fragment, useEffect, useState } from "react";

// const Home = () => {
//   let [state, setState] = useState([]);

//   useEffect(() => {
//       let xhr = new XMLHttpRequest();
//       //?assign api end points
//       xhr.open("GET", "https://api.github.com/users")
//       xhr.onload = () => {
//           let users = JSON.parse(xhr.response);
//           setState(users);
//       };
//       xhr.send();
//   }, []);
    
//   console.log(state);
//     return <div>
//         {state.length == 0
//             ? "loading"
//             : state.map(user => {
//                 return (
//                     <Fragment key={user.id}>
//                         <li>
//                             <img src={user.avatar_url} alt={user.login} />
                            
//                         </li>
//                         <li>{ user.login}</li>
//                     </Fragment>
//                 )
//             })
    
//         }
//         </div>;
// };

// export default Home;

//!axios method
// import React, { Fragment,useEffect, useState } from 'react'
// import axios from "axios";
// const Home = () => {
//     let [state, setState] = useState([]);

//     useEffect(() => {
//         axios
//             .get("https://api.github.com/users")
//             .then(data => {
//                 let payload = data.data;
//                 setState(payload)
//             })
//             .catch(err => console.log(err));
    
            
//     }, []);
//     console.log(state);
//     return (<div>
//        {state.length == 0
//             ? "loading"
//             : state.map(user => {
//                  return (
//                      <Fragment key={user.id}>
//                          <li>
//                             <img src={user.avatar_url} alt={user.login} />
//                             </li>
//                          <li>{user.login}</li>
//                      </Fragment>
//                  )
//              })
    
//         }
//          </div>
//     )};


// export default Home



//!async and await method recommended its faster
// import React, { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// const Home = () => {
//   let [state, setState] = useState([]);

//   useEffect(() => {
//       let fetchData = async () => {
//           try {
//               let users = await axios.get("https://api.github.com/users");
//               setState(users.data);
//           } catch (error) {
//               console.log(error);
//           }
//       };
//       fetchData();
//   }, []);
//   console.log(state);
//   return (
//     <div>
//       {state.length == 0
//         ? "loading"
//         : state.map(user => {
//             return (
//               <Fragment key={user.id}>
//                 <li>
//                   <img src={user.avatar_url} alt={user.login} />
//                 </li>
//                 <li>{user.login}</li>
//               </Fragment>
//             );
//           })}
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import Search from "./Search";
import MainContent from "./MainContent";
import Axios from "../apis/Axios";
const Home = () => {
  let [user, setUser] = useState("");
  let [repos, setRepos] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let client_id = "Iv1.8fab848122a7e6c5";
        let client_secret = "68ed8f7c00786dfb861b1cf63668e047b33392cf";
        let users = await Axios.get(
          `/users/truptijana?Client_id${client_id}&Client_secret${client_secret}`
        );

        let ReposData = await Axios.get(
          `/users/truptijana/repos?Client_id${client_id}&Client_secret${client_secret}`
        );
        setLoading(true);
        setUser(users.data);
        setRepos(ReposData.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  let onTermSubmit = async term => {
    try {
      let client_id = "Iv1.8fab848122a7e6c5";
      let client_secret = "68ed8f7c00786dfb861b1cf63668e047b33392cf";
      let users = await Axios.get(
        `/users/${term}?Client_id${client_id}&Client_secret${client_secret}`
      );

      let ReposData = await Axios.get(
        `/users/${term}/repos?Client_id${client_id}&Client_secret${client_secret}`
      );
      setLoading(true);
      setUser(users.data);
      setRepos(ReposData.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <section id="mainBlock">
      <article>
        <Search onTermSubmit={onTermSubmit} user={user} loading={loading} />
        <MainContent user={user} loading={loading} repos={repos} />
      </article>
    </section>
  );
};

export default Home;