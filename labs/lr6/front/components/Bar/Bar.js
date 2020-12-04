import React from 'react'
import LeftBar from './LeftBar'
import TopBar from './TopBar'

export default function Bar() {

    const [opened, setOpened] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpened(true);
    };
    const handleDrawerClose = () => {
        setOpened(false);
    };

    return (
        <>
            <TopBar opened={opened} open={handleDrawerOpen} />
            <LeftBar opened={opened} close={handleDrawerClose} />
        </>
    )

}

