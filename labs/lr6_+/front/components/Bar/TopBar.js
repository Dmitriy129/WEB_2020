import React, { useContext } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@material-ui/core';
import { Menu as MenuIcon, Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import BarContext from './BarContext'



const UserInfoBlock = dynamic(
    () => import('./UserInfoBlock'),
    { ssr: false }
)

export default function TopBar(props) {
    const { title } = useContext(BarContext)
    const classes = useStyles();
    const {
        opened,
        open,
    } = props
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, opened && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                {/* <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={open}
                    className={clsx(classes.menuButton, opened && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton> */}
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {title}
                </Typography>
                <UserInfoBlock />
            </Toolbar>
        </AppBar >
    )
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginBottom: theme.spacing(6),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },

}));