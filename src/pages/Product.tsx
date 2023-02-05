/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Drawer from '@mui/material/Drawer'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'

import { useSearch } from '@tanstack/react-router'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../Store'
import { getAll, getById, post, update, destroy } from '../reducers/Product'

import Pagination from '../components/Pagination'

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

function Store() {
  const [formDrawerState, setFormDrawerState] = useState(false)
  const [editFormDrawerState, setEditFormDrawerState] = useState(false)
  const [deleteDialogState, setDeleteDialogState] = useState(false)
  const [selectedId, setSelectedId] = useState(0)

  const Store = useAppSelector((state) => state.Product.all)

  const dispatch = useAppDispatch()

  const { page }: any = useSearch()

  useEffect(() => {
    dispatch(getAll(page ? page : 1))
  }, [page])

  const handleFormDrawerToggle = () => {
    setFormDrawerState(!formDrawerState)
  }

  const handleEditFormDrawerToggle = (id: any) => {
    dispatch(getById(id))
    setSelectedId(id)
    setEditFormDrawerState(!editFormDrawerState)
  }

  const handleDeleteDialogOpen = (id: any) => {
    setSelectedId(id)
    setDeleteDialogState(true)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogState(false)
  }

  const handleDeleteDialogConfirm = () => {
    dispatch(destroy(selectedId, page ? page : 1))
    setDeleteDialogState(false)
  }

  const handlePost = (data: any) => {
    dispatch(post(data, page ? page : 1))
    setFormDrawerState(!formDrawerState)
  }

  const handleUpdate = (data: any) => {
    setEditFormDrawerState(!editFormDrawerState)
    dispatch(update(selectedId, data, page ? page : 1))
  }

  return (
    <div className="h-full w-full rounded-3xl border border-primary/30 bg-white py-8 drop-shadow-2xl ">
      <div className="flex flex-row-reverse px-8">
        <Button
          variant="contained"
          onClick={handleFormDrawerToggle}
          sx={{
            backgroundColor: '#463B24',
          }}
        >
          + add Product
        </Button>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full border-b text-left text-sm text-gray-500">
          <thead className="bg-primary/10 text-xs uppercase text-primary ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Store?.data &&
              Store?.data.map((item: any) => (
                <tr key={item.id} className="border-b bg-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-primary"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.imagePath}
                      alt="product"
                      className="h-44 w-44 object-contain"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <IconButton
                      onClick={() => handleEditFormDrawerToggle(item.id)}
                      color="inherit"
                    >
                      <EditOutlinedIcon className="text-primary" />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDeleteDialogOpen(item.id)}
                      color="inherit"
                    >
                      <DeleteOutlineOutlinedIcon className="text-primary" />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="mt-4 px-8">
          <Pagination meta={Store?.meta} />
        </div>
      </div>

      <Drawer
        anchor="right"
        open={formDrawerState}
        onClose={handleFormDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 500,
          },
        }}
      >
        <StoreForm action={handlePost} />
      </Drawer>

      <Drawer
        anchor="right"
        open={editFormDrawerState}
        onClose={handleEditFormDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 500,
          },
        }}
      >
        <StoreFormEdit action={handleUpdate} />
      </Drawer>

      <Dialog
        open={deleteDialogState}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this item?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>No</Button>
          <Button onClick={handleDeleteDialogConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function StoreForm({ action }: any) {
  function handleSubmit(e: any) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    action(formData)
  }

  return (
    <div className="h-full w-full border-primary/30  bg-white py-8 drop-shadow-2xl">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-8"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            name="name"
            placeholder="Name"
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            name="price"
            placeholder="price"
          />
        </div>

        <div>
          <label htmlFor="Category">Category id:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            name="category_id"
            placeholder="category_id"
          />
        </div>

        <div>
          <label>Image:</label>
          <ImageUpload />
        </div>

        <Button type="submit" variant="contained" className="bg-primary">
          Submit
        </Button>
      </form>
    </div>
  )
}

function StoreFormEdit({ action }: any) {
  function handleSubmit(e: any) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    action(formData)
  }

  return (
    <div className="h-full w-full border-primary/30  bg-white py-8 drop-shadow-2xl">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-8"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            name="name"
            placeholder="Name"
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            name="price"
            placeholder="price"
          />
        </div>

        <div>
          <label htmlFor="Category">Category id:</label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            name="category_id"
            placeholder="category_id"
          />
        </div>

        <div>
          <label>Image:</label>
          <ImageUpload />
        </div>

        <Button type="submit" variant="contained" className="bg-primary">
          Submit
        </Button>
      </form>
    </div>
  )
}

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return undefined
    }

    const objectUrl = URL.createObjectURL(selectedFile) as any
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <div>
      <input
        type="file"
        name="image"
        onChange={onSelectFile}
        accept="image/*"
      />
      {selectedFile && (
        <img src={preview} alt="preview" className="h-60 w-full object-cover" />
      )}
    </div>
  )
}

export default Store
