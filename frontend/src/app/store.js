import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { authApi } from "@/features/api/authApi"
import { listingApi } from "@/features/api/listingApi"
import { hostApi } from "@/features/api/hostApi"
import { bookApi } from "@/features/api/bookApi"

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddlewere) => defaultMiddlewere().concat(authApi.middleware, listingApi.middleware, hostApi.middleware, bookApi.middleware)
})

const initializeApp = async() => {
   await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch:true}))
}

initializeApp()