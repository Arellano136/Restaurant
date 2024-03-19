import React, { useState, useEffect } from "react";
import Loading from '../../../../kernel/component/Loading'
import Profile  from './Profile'
import UserGuest from './UserGuest'

import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default function UserLogged(props) {
  const {navigation} = props;
  const [session,setSession] = useState(null);
  const auth = getAuth();
      useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          
          if (user) {
              setSession(true);
          } else {
              setSession(false);
          }
        });
  },[])
  if (session == null) return(<Loading visible={true} title='Cargando'/>);
  return (session ? <Profile navigation={navigation}/> : <UserGuest navigation={navigation}/>);
  
}