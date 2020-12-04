import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { observer, inject } from 'mobx-react';

const WithAuth = (props) => {
    const {
        children,
        user: {
            checkAuth,
            isAuthorized
        }
    } = props

    const [checking, setChecking] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
            .catch(() => router.asPath !== '/auth' && router.push('/auth'))
            .then(() => setChecking(false))
    })

    return (
        <>

            {
                checking
                    ? "проверка авторизации"
                    :
                    (
                        (router.asPath === '/auth' || isAuthorized)
                            ? children
                            : "не авторизован"
                    )
            }
        </>
    )
}

export default inject('user')(observer(WithAuth))