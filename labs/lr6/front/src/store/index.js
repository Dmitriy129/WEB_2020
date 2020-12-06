import React from "react";
import Me from './Me'
import Users from './Users'
import Papers from './Papers'
// import tables from './tables'
// import currentEntity from './currentEntity'


const mainStore = {
    me: new Me(),
    users: new Users(),
    papers: new Papers(),
    // ...tables,
    // ...currentEntity
}

export default mainStore;


const StoreContext = React.createContext();

export const StoreProvider = ({ children, stores }) => <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>

export const useStore = () => React.useContext(StoreContext);

// eslint-disable-next-line react/jsx-props-no-spreading
export const withStore = (Component) => (props) => <Component {...props} stores={useStore()} />
