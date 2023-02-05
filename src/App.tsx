import {
  Outlet,
  RouterProvider,
  ReactRouter,
  Route,
  RootRoute,
} from '@tanstack/react-router'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'

import MenuIcon from '@mui/icons-material/Menu'

import { useState } from 'react'

import SideBar from './SideBar'

import Store from './pages/Store'
import Category from './pages/Category'
import Product from './pages/Product'

const drawerWidth = 300

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}))

function Root() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container = window.document.body

  return (
    <Box sx={{ height: '100vh' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#463B24',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <h1 className="flex-grow self-end text-3xl font-bold text-white">
            Admin Panel
          </h1>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ p: 0, ml: 2 }}>
            <Avatar alt="Mazyar Farhad" src="/avatar.png" />
          </IconButton>
        </StyledToolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="side navigation"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Store,
})
const categoryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/category',
  component: Category,
})
const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: Product,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  productRoute,
])
const router = new ReactRouter({ routeTree })

function App() {
  return <RouterProvider router={router} />
}

export default App
