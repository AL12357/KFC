import { ADDBEVERAGES, ADDBIRYANI, ADDBOX, ADDBURGER, ADDCART, ADDCHICKEN, ADDLAUNCH, ADDROLLS, ADDSNACKS, ADDSTAYHOME, CARTCOUNT, DELETECART, GETCART } from "./action";


const initialState={
    chicken:[],
    launch:[],
    rolls:[],
    biryani:[],
    box:[],
    burger:[],
    stayhome:[],
    snacks:[],
    beverages:[],
    cart: loadSavedCart()
}

function loadSavedCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("kfc-cart") || "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch (error) {
    console.error("Unable to read the saved cart:", error);
    return [];
  }
}

export const reducer= (state=initialState,{type,payload})=>{

switch(type){
    case ADDCHICKEN:{
      return{
        ...state,chicken:payload
      }
    }
    case ADDLAUNCH:{
        return{
          ...state,launch:payload
        }
      }
      case ADDROLLS:{
        return{
          ...state,rolls:payload
        }
      }
      case ADDBIRYANI:{
        return{
          ...state,biryani:payload
        }
      }
      case ADDBOX:{
        return{
          ...state,box:payload
        }
      }
      case ADDBURGER:{
        return{
          ...state,burger:payload
        }
      }
      case ADDSTAYHOME:{
        return{
          ...state,stayhome:payload
        }
      }
      case ADDSNACKS:{
        return{
          ...state,snacks:payload
        }
      }
      case ADDBEVERAGES:{
        return{
          ...state,beverages:payload
        }
      }
      case ADDCART:{
        const existingItem = state.cart.find((item) => item.id === payload.id);
        const cart = existingItem
          ? state.cart.map((item) =>
              item.id === payload.id
                ? { ...item, qty: item.qty + payload.qty }
                : item
            )
          : [...state.cart, payload];
        return{
          ...state,cart
        }
      }
      case CARTCOUNT:{
        const cart = state.cart
          .map((item) =>
            item.id === payload.id ? { ...item, qty: payload.qty } : item
          )
          .filter((item) => item.qty > 0);
        return{
          ...state,cart
        }
      }
      case GETCART:{
          return{
            ...state,cart:payload
          }
      }
      case DELETECART:{
        const cart = state.cart.filter((item) => item.id !== payload);
          return{
            ...state,cart
          }
      }
    default :return state;
}
}
