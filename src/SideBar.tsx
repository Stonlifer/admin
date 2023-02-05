import { Link } from '@tanstack/react-router'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import StorefrontIcon from '@mui/icons-material/Storefront'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import CheckroomIcon from '@mui/icons-material/Checkroom'

function SideBar() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-white py-8">
      <div className="flex flex-col gap-8">
        <img className="mx-auto w-32 object-cover" src="/logo.png" alt="logo" />

        <List>
          <Link to="/">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Stores" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/category">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Categories" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/product">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <CheckroomIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Products" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </div>

      <p>FOR MEDICAL IT TEST ® 2023</p>
    </div>
  )
}

export default SideBar
