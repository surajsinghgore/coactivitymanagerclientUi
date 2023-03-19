import React from 'react'
import UserContext from './UserContext'

const UserState=(props)=>{

// updateUser
const updateUser=()=>{

}
return(
<UserContext.Provider value={{updateUser}}>
{props.children}

</UserContext.Provider>
)
}



export default UserState;