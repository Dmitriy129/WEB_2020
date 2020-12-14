import React from 'react'
const BarContext = React.createContext({ title: "Панель админимстратора" })
export const BarProvider = BarContext.Provider
export default BarContext
