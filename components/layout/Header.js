import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { updateJwt } from "../../redux/storeManage";

import CategoryCard from "../CategoryCard";
const pages = ["Sách nói", "Podcast"];

const settings = ["Profile", "Account", "Dashboard"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const data = [
  "Ca1",
  "set2",
  "set3",
  "set4",
  "set5",
  "set6",
  "set7 ",
  "nha3",
  "nhan3",
  "nhan4",
  "nhan5",
  "n",
];
const ResponsiveAppBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.storeManage);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [keyWord, setKeyWord] = useState(null);
  const [dataFilter, setDataFilter] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    dispatch(updateJwt("null"));
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeSearch = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setKeyWord(lowerCase);
  };
  useEffect(() => {
    setKeyWord(router.query.keyword || "");
  }, []);
  return (
    <div class="relative">
      <div class="fixed top-0 left-0 right-0">
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                VOIZ
              </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">
                  <Link href="/">Trang chủ</Link>
                </Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Typography textAlign="center">
                  <Link href="/book_request">Đề nghị sách</Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link href="/">Trang chủ</Link>
            </Button>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link href="/book_request">Đề nghị sách</Link>
            </Button>
          </Box>


                      <CategoryCard
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                      />
                    </div>
                  ) : (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  )
                )}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Toolbar>
                  <Search>
                    <SearchIconWrapper></SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleChangeSearch}
                      value={keyWord}
                    />
                    <Button>
                      <Link href={`/search?keyword=${keyWord}`}>
                        <SearchIcon />
                      </Link>
                    </Button>
                  </Search>
                  {jwt == "null" ? (
                    <>
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined">
                          <Link href="/auth/signin">
                            <a className="text-white">Sign In</a>
                          </Link>
                        </Button>
                        <Button variant="outlined">
                          <Link href="/auth/signup">
                            <a className="text-white">Sign Up</a>
                          </Link>
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/images/book.jpg" />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                              {setting}
                            </Typography>
                          </MenuItem>
                        ))}
                        <MenuItem onClick={handleSignOut}>
                          <Typography textAlign="center">Sign Out</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Toolbar>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </div>
  );
};
export default ResponsiveAppBar;
