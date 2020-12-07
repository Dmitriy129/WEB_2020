import React, { useEffect, useState } from 'react'
import ShowMsg from './CustomizedSnackbars'
import ws from '../../src/api/ws'

const EmiterContext = React.createContext({})
// const ErrorProvider = EmiterContext.Provider
export default EmiterContext

export const EmiterProvider = props => {
    const { children } = props
    const [msg, setMsg] = useState({})
    // const showMsg = (title, msg) => {
    //     setMsg({
    //         show: true,
    //         title,
    //         msg
    //     })
    // }
    const newMsg = (type, title, msg) => {
        // setMsg({ show: false })
        setMsg({
            type,
            show: true,
            title,
            msg,
            time: 4000
        })
    }
    const error = (title, msg) => {
        newMsg("error", title, msg)
    }
    const info = (title, msg) => {
        newMsg("info", title, msg)
    }
    const warn = (title, msg) => {
        newMsg("warning", title, msg)
    }
    const success = (title, msg) => {
        newMsg("success", title, msg)
    }


    useEffect(() => {
        const cb1 = (data) => info("Баланс обновлен")
        const cb2 = (data) => info("Цена акций поменялась")
        const cb3 = (data) => info("Не хватает денег")
        const cb4 = (data) => info("Нет столько акций")
        // const cb5 = (data) => info("Не хватает денег")

        ws.on("balanceChanged", cb1)
        ws.on("priceUpdated", cb2)
        ws.on("notEnoughMoney", cb3)
        ws.on("notEnoughPapers", cb4)

        ws.once("started", () => info("Начался"))
        ws.once("ended", () => warn("Кончился"))

        return () => {
            ws.off("balanceChanged", cb1)
            ws.off("priceUpdated", cb2)
        }
    }, [])


    return (
        <EmiterContext.Provider value={{ error, info, warn, success, }} >
            {children}
            <ShowMsg
                msg={msg}
                // error={error}
                // info={info}
                // warn={warn}
                // success={success}
                onClose={() => setMsg({ ...msg, show: false })}
            />
        </EmiterContext.Provider>
    )
}

