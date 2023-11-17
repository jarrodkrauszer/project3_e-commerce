import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

const initialState = {
  user: null
}

export function StoreProvider(props) {
  const [state, setState] = useState(initialState)

  return (
    <StoreContext.Provider value={{
      ...state,
      setState
    }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)