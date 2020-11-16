/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const user = useSelector((state) => state.user)
        const dispatch = useDispatch()

        useEffect(() => {
            // To know my current status, send Auth request
            console.log('user', user)
            dispatch(auth())
                .then((response) => {
                    console.log('auth response', response)
                    console.log('auth response isAuth', response.payload.isAuth)
                    // Not Loggined in Status
                    if (!response.payload.isAuth) {
                        console.log('option', option)
                        if (option) {
                            console.log('login')
                            props.history.push('/login')
                        }
                    // Loggined in Status
                    } else {
                    // supposed to be Admin page, but not admin person wants to go inside
                        if (adminRoute && !response.payload.isAdmin) {
                            props.history.push('/')
                        } else if (option === false) { // Logged in Status, but Try to go into log in page
                            props.history.push('/')
                        }
                    }
                })
        }, [])
        console.log('user2', user)
        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    return AuthenticationCheck
}
