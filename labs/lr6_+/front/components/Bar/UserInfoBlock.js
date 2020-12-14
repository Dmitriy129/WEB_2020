import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { Typography, Button } from '@material-ui/core';
import { PlayCircleOutlineRounded as PlayCircleOutlineRoundedIcon, ExitToApp as ExitToAppIcon, Tune } from '@material-ui/icons';
import ws from '../../src/api/ws'
import http from '../../src/api/http'

const UserInfoBlock = (props) => {
    const router = useRouter()
    const {
        user: {
            login,
            name,
            surname,
            balance,
            balanceInPaper,
            role
        },
        signOut,
        checkAuth
    } = props.me

    const [started, setStarted] = useState(true)

    const handleSignOut = async () => {
        await router.push('/auth')
        await signOut()
    }

    useEffect(() => {
        const cb1 = () => checkAuth().catch(() => handleSignOut())
        ws.on("priceUpdated", cb1)
        ws.once("started", () => setStarted(true))
        http.get('/settings').then(({ started }) => setStarted(started))
        return () => {
            ws.off("priceUpdated", cb1)
        }
    }, [])
    const classes = useStyles();

    const handleStart = () => http.post("/settings/start")

    return (
        <>
            <Typography component="h1" variant="body1" color="inherit" noWrap className={classes.title}>
                {login}
            </Typography>
            {/* <Typography component="h1" variant="body2" color="inherit" noWrap className={classes.title}>
                {name} {surname}
            </Typography> */}
            <Typography component="h1" variant="body2" color="inherit" noWrap className={classes.title}>
                Деняк: {balance}
            </Typography>
            <Typography component="h1" variant="body2" color="inherit" noWrap className={classes.title}>
                В бумагах: {balanceInPaper}
            </Typography>
            {/* <Link href={{ pathname: `/users/${email}` }} >
                <Typography component="h1" variant="body1" color="inherit" noWrap className={classes.title}>
                    {email}
                </Typography>
            </Link> */}
            {role === "admin" && !started &&
                <Button color="inherit" onClick={handleStart}>
                    Начать аукцион
                </Button>}
            <Button color="inherit" onClick={handleSignOut}>
                Выход
            </Button>
        </>
    )
}


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        cursor: "pointer"
    },

}));

export default inject('me')(observer(UserInfoBlock))
