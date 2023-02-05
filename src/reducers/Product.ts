/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://phplaravel-934788-3246945.cloudwaysapps.com/api'
const ROUTE_NAME = 'products'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    all: null as any,
    byId: null as any,
  },
  reducers: {
    all: (state, action) => {
      state.all = action.payload
    },
    byId: (state, action) => {
      state.byId = action.payload
    },
  },
})

export const getAll = (page: any, categoryId: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/${ROUTE_NAME}?page=${page}${
        categoryId ? `&categoryId=${categoryId}` : ''
      }`
    )
    dispatch(all(response.data))
  } catch (err: any) {
    throw new Error(err)
  }
}

export const getById = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${API_URL}/${ROUTE_NAME}/${id}`)
    dispatch(byId(response.data))
  } catch (err: any) {
    throw new Error(err)
  }
}

export const post = (data: any, page: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${API_URL}/${ROUTE_NAME}`, data)
    // dispatch(post(response.data))
    // getAll(page)
    window.location.reload()
  } catch (err: any) {
    throw new Error(err)
  }
}

export const update =
  (id: any, data: any, page: any) => async (dispatch: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/${ROUTE_NAME}/${id}?_method=PUT`,
        data
      )
      // dispatch(update(response.data))

      window.location.reload()
    } catch (err: any) {
      throw new Error(err)
    }
  }

export const destroy = (id: any, page: any) => async (dispatch: any) => {
  try {
    await axios.delete(`${API_URL}/${ROUTE_NAME}/${id}`)
    // dispatch(destroy(response.data))
    // dispatch(reload(true))
    window.location.reload()
  } catch (err: any) {
    throw new Error(err)
  }
}

// Action creators are generated for each case reducer function
export const { all, byId } = productSlice.actions

export default productSlice.reducer
