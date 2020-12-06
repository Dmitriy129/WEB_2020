import React, { useEffect } from 'react'
import { Grid, LinearProgress } from '@material-ui/core'
import { observer, inject } from 'mobx-react';
import UserCard from '../Cards/UserCard';

const Users = (props) => {
    const { loadList, elems, loading: { now: nowLoading } } = props.users
    useEffect(() => {
        loadList()
    }, [])


    const list = elems.map(elem =>
        <Grid
            item
            key={elem.id}
        >
            <UserCard data={elem} />
        </Grid>
    )
    // const list = elems.map(elem => <UserCard key={elem.id} data={elem} />)

    if (nowLoading) return (<LinearProgress />)
    console.log('list', list)
    return (

        <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="space-between"
            spacing={2}
        >
            {list}
            {list}
            {list}
            {list}
            {list}
            {list}
            {list}
            {list}
            {list}
            {list}
            {list}

        </Grid>
    )
}

export default inject('users')(observer(Users))

