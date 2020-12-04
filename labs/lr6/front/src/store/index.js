import React from "react";
import User from './User'
// import tables from './tables'
// import currentEntity from './currentEntity'


const mainStore = {
    user: new User(),
    // ...tables,
    // ...currentEntity
}

export default mainStore;


const StoreContext = React.createContext();

export const StoreProvider = ({ children, stores }) => <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>

export const useStore = () => React.useContext(StoreContext);

// eslint-disable-next-line react/jsx-props-no-spreading
export const withStore = (Component) => (props) => <Component {...props} stores={useStore()} />
