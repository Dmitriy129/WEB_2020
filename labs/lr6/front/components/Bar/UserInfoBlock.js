import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { Typography, IconButton } from '@material-ui/core';
import { Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';

const UserInfoBlock = (props) => {
    const router = useRouter()
    const {
        user: {
            login,
            name,
            surname,
            balance
        },
        signOut
    } = props.user

    const handleSignOut = async () => {
        await router.push('/auth')
        await signOut()
    }

    const classes = useStyles();

    return (
        <>
            <Typography component="h1" variant="body1" color="inherit" noWrap className={classes.title}>
                {login}
            </Typography>
            <Typography component="h1" variant="body2" color="inherit" noWrap className={classes.title}>
                {name} {surname}
            </Typography>
            <Typography component="h1" variant="body2" color="inherit" noWrap className={classes.title}>
                Баланс: {balance}
            </Typography>
            {/* <Link href={{ pathname: `/users/${email}` }} >
                <Typography component="h1" variant="body1" color="inherit" noWrap className={classes.title}>
                    {email}
                </Typography>
            </Link> */}
            <IconButton color="inherit">
                <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleSignOut}>
                <ExitToAppIcon />
            </IconButton>
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

export default inject('user')(observer(UserInfoBlock))
