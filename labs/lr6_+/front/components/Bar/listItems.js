import React from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import Link from 'next/link'
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Receipt as ReceiptIcon,

} from '@material-ui/icons';


export const mainListItems = (
    <div>
        {/* <Link href="/" >
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Главная" />
            </ListItem>
        </Link> */}
        {/* <Link href="/tours" >
            <ListItem button>
                <ListItemIcon>
                    <DirectionsWalkIcon />
                </ListItemIcon>
                <ListItemText primary="Туры" />
            </ListItem>
        </Link> */}
        <Link href="/users" >
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Пользователи" />
            </ListItem>
        </Link>
        <Link href="/papers" >
            <ListItem button>
                <ListItemIcon>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Жалкие бумажки" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Тест таблиц</ListSubheader>
        <Link href="/tce" >
            <ListItem button>
                <ListItemIcon>
                    <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="TourCalendarEvent" />
            </ListItem>
        </Link>
        <Link href="/et" >
            <ListItem button>
                <ListItemIcon>
                    <AccessAlarmsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="EventTime" />
            </ListItem>
        </Link>
        <Link href="/tl" >
            <ListItem button>
                <ListItemIcon>
                    <RoomIcon />
                </ListItemIcon>
                <ListItemText primary="TourLocality" />
            </ListItem>
        </Link>
        <Link href="/utl" >
            <ListItem button>
                <ListItemIcon>
                    <PersonPinCircleIcon />
                </ListItemIcon>
                <ListItemText primary="UserTourLocality" />
            </ListItem>
        </Link> */}
    </div>
);