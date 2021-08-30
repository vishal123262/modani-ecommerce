import React, { useEffect } from "react"
import { Route , Redirect } from "react-router"
import {isAuthenticated} from './index'
useEffect
const AdminRoute = ({ component: Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute