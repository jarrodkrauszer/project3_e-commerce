import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}

export const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    user: null,
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => {
  return useContext(StoreContext);
};
