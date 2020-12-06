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
    const error = (title, msg) => {
        setMsg({
            type: "error",
            show: true,
            title,
            msg
        })
    }
    const info = (title, msg) => {
        setMsg({
            type: "info",
            show: true,
            title,
            msg
        })
    }
    const warn = (title, msg) => {
        setMsg({
            type: "warning",
            show: true,
            title,
            msg
        })
    }
    const success = (title, msg) => {
        setMsg({
            type: "success",
            show: true,
            title,
            msg
        })
    }


    useEffect(() => {
        const cb1 = (data) => info("Баланс обновлен")
        const cb2 = (data) => info("Цена акций поменялась")
        ws.on("balanceChanged", cb1)
        ws.on("priceUpdated", cb2)

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
