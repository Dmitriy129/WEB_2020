import React, { useState, useEffect } from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import clsx from 'clsx'


const useStyles = makeStyles(theme => ({
    pre: {
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/img/github-logo.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    loader: {
        top: "51% !important",
    },
    center: {
        margin: "auto",
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        top: "50%",
        bottom: "50%",
        left: "0%",
        right: "0%",
    },
    github: {
        border: "1px solid black",
        borderRadius: theme.spacing(1),
        color: "black",
        padding: theme.spacing(2),

        zIndex: 2,
        overflow: "hidden",
        textDecoration: "none",
        textAlign: "center",
        display: "table",
        transition: "0.25s",

        "&:hover": {
            transform: "scale(1.1)",
            borderRadius: theme.spacing(2),
            "& .octocat": {
                transform: "scale(1.1)",
            }
        },

        "& span": {
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: theme.spacing(1),
        },
    },
    octocat: {
        height: 30,
        transition: "0.25s",
    }

}))


const AuthManager = (props) => {
    const { signIn } = props.me
    const classes = useStyles()
    const router = useRouter()
    const [tryingSignIn, setTryingSignIn] = useState(true)
    useEffect(() => {
        if (router.query.code) {
            setTryingSignIn(true)
            signIn(router.query.code)
                .then((user) => router.push("/"))
                .catch((error) => {
                    alert("пока входить не надо")
                })
                .then(() => setTryingSignIn(false))
        }
        else setTryingSignIn(false)
    }, [router]);

    return (
        <div>
            {/* <p>auth works!</p> */}
            {/* {process.env.GIT_REDIRECT_URL} */}
            <div className={classes.pre}>
                {tryingSignIn
                    ? <CircularProgress className={clsx(classes.center, classes.loader)} size={523} />
                    : <a
                        href={`https://github.com/login/oauth/authorize?response_type=code&client_id=${process.env.GIT_CLIENT_ID}&redirect_uri=${process.env.GIT_REDIRECT_URL}`}
                        className={clsx(classes.github, classes.center)}
                    >
                        {/* <a href="/api/gitapi" className={classes.github}> */}
                        <span>Вход через GitHub</span>
                        <img className={classes.octocat} src="/img/Octocat.jpg" alt="OctoCat" />
                        {/* <Image */}
                    </a>
                }
            </div>
        </div>
    )
}

export default inject('me')(observer(AuthManager))

