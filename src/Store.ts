import { configureStore } from '@reduxjs/toolkit'

import StoreReducer from './reducers/Store'
import CategoryReducer from './reducers/Category'
import ProductReducer from './reducers/Product'

const store = configureStore({
  reducer: {
    Store: StoreReducer,
    Category: CategoryReducer,
    Product: ProductReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
