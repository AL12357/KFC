import {legacy_createStore,applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import { reducer } from "./reducer";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
        // other store enhancers if any
      );


   export const store = legacy_createStore(reducer,enhancer)

   store.subscribe(() => {
     try {
       localStorage.setItem("kfc-cart", JSON.stringify(store.getState().cart));
     } catch (error) {
       console.error("Unable to save the cart in this browser:", error);
     }
   });
