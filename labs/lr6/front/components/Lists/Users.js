import React, { useEffect, useState, useContext } from 'react'
import { Grid, LinearProgress } from '@material-ui/core'
import { observer, inject } from 'mobx-react';
import UserCard from '../Cards/UserCard';
import PapersOfUsers from '../CurrentList/PapersOfUser'
import EmiterContext from '../Emiter/EmiterContext'
import ws from '../../src/api/ws'

const Users = (props) => {
    const { loadList, elems, loading: { now: nowLoading } } = props.users
    const [modalPapers, setModalPapers] = useState({ open: false, id: 0, })
    const { error: showError, warn: showWarning } = useContext(EmiterContext)


    useEffect(() => {
        loadList()

        ws.on("priceUpdated", loadList)
        return () => {
            ws.off("priceUpdated", loadList)
        }
    }, [])

    const handleOpen = (idx) => {
        if (elems[idx]?.papers?.length > 0)
            setModalPapers({ open: true, id: idx })
        else showWarning("Еще не участвовал в торгах")
    }

    const list = elems.map((elem, idx) =>
        <Grid
            item
            key={elem.id}
        >
            <UserCard
                data={elem}
                handleOpen={() => handleOpen(idx)}
            />
        </Grid>
    )
    // const list = elems.map(elem => <UserCard key={elem.id} data={elem} />)

    if (nowLoading) return (<LinearProgress />)
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="space-between"
            spacing={2}
        >
            {list}
            <PapersOfUsers
                open={modalPapers.open}
                user={elems[modalPapers.id]}
                onClose={() => setModalPapers({ open: false })} />
        </Grid>
    )
}

export default inject('users')(observer(Users))

