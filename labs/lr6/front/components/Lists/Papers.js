import React, { useContext, useEffect, useState } from 'react'
import { Grid, LinearProgress } from '@material-ui/core'
import { observer, inject } from 'mobx-react';
import PaperCard from '../Cards/PaperCard';
import ModalQuestion from './ModalQuestion'
import OwnersOfPaper from '../CurrentList/OwnersOfPaper'
import EmiterContext from '../Emiter/EmiterContext'
import ws from '../../src/api/ws'
const Papers = (props) => {
    const {
        loadList,
        elems,
        loading: { now: nowLoading },
        // tryBuyPapers
        tryBuy,
        trySell,
        tryAdd
    } = props.papers

    const { me: { user: { role } } } = props

    const [modalQ, setModalQ] = useState({ open: false, id: "", var: 1 })
    const [modalUsers, setModalUsers] = useState({ open: false, id: 0, })
    const { error: showError, warn: showWarning } = useContext(EmiterContext)
    useEffect(() => {
        loadList()

        ws.on("priceUpdated", loadList)
        return () => {
            ws.off("priceUpdated", loadList)
        }
    }, [])

    const openModalForCard = (id, v) => {
        debugger
        setModalQ({ open: true, id, var: v })
    }

    const handleAgree = (count, v) => {
        if (v === 1)
            tryBuy({ id: modalQ.id, count })
                .catch(error => showError("Не получилось купить", error))
        else if (v === 2)
            trySell({ id: modalQ.id, count })
                .catch(error => showError("Не получилось продать", error))
        else if (v === 3)
            tryAdd({ id: modalQ.id, count })
                .catch(error => showError("Не получилось добавить", error))
    }
    // const handleAgree2 = (count) => {
    //     trySell({ id: modalQ.id, count })
    //         .catch(error => showError("Не получилось продать", error))
    //     // ws.emit("tryBuyPapers", { id: modalQ.id, count })
    // }

    const handleOpen = (idx) => {
        if (elems[idx]?.owners?.length > 0)
            setModalUsers({ open: true, id: idx })
        else showWarning("Эти акции еще никто не купил")
    }

    const list = elems.map((elem, idx) =>
        <Grid item key={elem.id} >
            <PaperCard
                data={elem}
                handleBuy={() => openModalForCard(elem.id, 1)}
                handleSell={() => openModalForCard(elem.id, 2)}
                handleAdd={role === "admin" && (() => openModalForCard(elem.id, 3))}
                handleOpen={() => handleOpen(idx)}
            />
        </Grid>
    )

    if (nowLoading) return (<LinearProgress />)

    return (
        <>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignContent="space-between"
                spacing={2}
            >
                {list}
            </Grid>
            <ModalQuestion open={modalQ.open} handleAgree={count => handleAgree(count, modalQ.var)} handleClose={() => setModalQ({ open: false })}></ModalQuestion>
            <OwnersOfPaper
                open={modalUsers.open}
                paper={elems[modalUsers.id]}
                onClose={() => setModalUsers({ open: false })}
            />
            {/* <ModalQuestion open={modalQ.open} handleAgree={handleAgree2} handleClose={() => setModalQ({ open: false })}></ModalQuestion> */}
        </>
    )
}

export default inject('papers', 'me')(observer(Papers))

