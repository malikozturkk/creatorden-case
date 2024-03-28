import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { AddCircle, Edit, RemoveCircle } from "@mui/icons-material";

const iconStyle = "w-5 h-5";

const pages = [
  { href: "/", name: "Home", icon: <HomeIcon className={iconStyle} /> },
  {
    href: "/create",
    name: "Influencer Ekle",
    icon: <AddCircle className={iconStyle} />,
  },
  {
    href: "/edit",
    name: "Influencer Düzenle",
    icon: <Edit className={iconStyle} />,
  },
  {
    href: "/remove",
    name: "Influencer Sil",
    icon: <RemoveCircle className={iconStyle} />,
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="bg-[#111418]">
      <Toolbar>
        <div className="flex gap-3">
          <img
            className="hidden md:block"
            src="https://creatorden.com/wp-content/uploads/2017/04/cropped-creatorden_logo-e1507569533402-32x32.png"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="mr-2 hidden font-bold md:flex tracking-widest"
          >
            CreatorDen
          </Typography>
        </div>

        <Box className="flex flex-grow md:hidden">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            className="block md:hidden"
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  className="my-2 normal-case flex items-center justify-center gap-2"
                >
                  {page.icon}
                  {page.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <div className="flex gap-3 flex-grow md:flex-grow-0">
          <img
            className="block md:hidden"
            src="https://creatorden.com/wp-content/uploads/2017/04/cropped-creatorden_logo-e1507569533402-32x32.png"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            className="mr-2 flex flex-grow font-bold tracking-widest md:hidden"
          >
            CreatorDen
          </Typography>
        </div>
        <Box className="hidden flex-grow gap-3 md:flex">
          {pages.map((page) => (
            <Button
              className="text-white my-2 normal-case flex items-center justify-center gap-2"
              key={page.name}
              onClick={handleCloseNavMenu}
              href={page.href}
            >
              {page.icon}
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
