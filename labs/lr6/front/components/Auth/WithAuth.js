import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { observer, inject } from 'mobx-react';

const WithAuth = (props) => {
    const {
        children,
        me: {
            checkAuth,
            isAuthorized
        }
    } = props

    const [checking, setChecking] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (router.pathname !== '/auth')
            checkAuth()
                .catch(() => router.push('/auth'))
                .then(() => setChecking(false))
        else setChecking(false)
    }, [])

    return (
        <>
            {
                checking
                    ? "проверка авторизации"
                    : (router.asPath === '/auth' || isAuthorized)
                        ? children
                        : "не авторизован"
            }
        </>
    )
}

export default inject('me')(observer(WithAuth))