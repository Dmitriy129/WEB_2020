import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    pre: {
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/img/github-logo.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    github: {
        border: "1px solid black",
        borderRadius: 8,
        color: "black",
        padding: 16,
        margin: "auto",
        width: "fit-content",
        height: "fit-content",
        position: "absolute",
        top: "50%",
        bottom: "50%",
        left: "0%",
        right: "0%",
        zIndex: 2,
        overflow: "hidden",
        textDecoration: "none",
        textAlign: "center",
        display: "table",
        transition: "0.25s",

        "&:hover": {
            transform: "scale(1.1)",
            borderRadius: 16,
            "& .octocat": {
                transform: "scale(1.1)",
            }
        },

        "& span": {
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 8,
        },
    },
    octocat: {
        height: 30,
        transition: "0.25s",
    }

}))


const index = () => {
    const classes = useStyles()
    
    return (
        <div>
            {/* <p>auth works!</p> */}
            <div className={classes.pre}>
                <a href="/api/gitapi" className={classes.github}>
                    <span>Вход через GitHub</span>
                    <img className={classes.octocat} src="/img/Octocat.jpg" alt="OctoCat" />
                    {/* <Image */}
                </a>
            </div>
        </div>
    )
}

export default index
