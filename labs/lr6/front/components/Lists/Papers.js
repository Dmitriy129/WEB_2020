import React, { useContext, useEffect, useState } from 'react'
import { Grid, LinearProgress } from '@material-ui/core'
import { observer, inject } from 'mobx-react';
import PaperCard from '../Cards/PaperCard';
import ModalQuestion from './ModalQuestion'
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

    const [modal, setModal] = useState({ open: false, id: "", var: 1 })
    const { error: showError } = useContext(EmiterContext)
    useEffect(() => {
        loadList()

        ws.on("priceUpdated", loadList)
        return () => {
            ws.off("priceUpdated", loadList)
        }
    }, [])

    const openModalForCard = (id, v) => {
        debugger
        setModal({ open: true, id, var: v })
    }

    const handleAgree = (count, v) => {
        if (v === 1)
            tryBuy({ id: modal.id, count })
                .catch(error => showError("Не получилось купить", error))
        else if (v === 2)
            trySell({ id: modal.id, count })
                .catch(error => showError("Не получилось продать", error))
        else if (v === 3)
            tryAdd({ id: modal.id, count })
                .catch(error => showError("Не получилось добавить", error))
    }
    // const handleAgree2 = (count) => {
    //     trySell({ id: modal.id, count })
    //         .catch(error => showError("Не получилось продать", error))
    //     // ws.emit("tryBuyPapers", { id: modal.id, count })
    // }

    const list = elems.map(elem =>
        <Grid item key={elem.id} >
            <PaperCard data={elem} handleBuy={() => openModalForCard(elem.id, 1)} handleSell={() => openModalForCard(elem.id, 2)} handleAdd={() => openModalForCard(elem.id, 3)} />
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
            <ModalQuestion open={modal.open} handleAgree={count => handleAgree(count, modal.var)} handleClose={() => setModal({ open: false })}></ModalQuestion>
            {/* <ModalQuestion open={modal.open} handleAgree={handleAgree2} handleClose={() => setModal({ open: false })}></ModalQuestion> */}
        </>
    )
}

export default inject('papers')(observer(Papers))

