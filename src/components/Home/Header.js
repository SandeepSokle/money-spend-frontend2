import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useNavigate } from "react-router-dom";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header(props) {
  const { page } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Toolbar disableGutters>
          <CurrencyExchangeIcon
            sx={{ display: { xs: "flex", md: "flrx" }, mr: 1 }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              //   mr: 2,
              display: { xs: "flex", md: "flex", fontSize: "18px" },
              flexGrow: 1,
              //   fontFamily: "monospace",
              fontWeight: 500,
              //   letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Expenses
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box
            sx={{
              marginRight: 2,
              color: "#fff",
              fontWeight: "400",
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              alignItems: "center",
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                fontSize: "16px",
                textTransform: "capitalize",
                background: "var(--joy-palette-info-200, #E1CBFF)",
                color: "#fff",
              }}
              onClick={() => {
                if (page === "home") {
                  navigate("/add");
                } else {
                  navigate("/");
                }
              }}
            >
              {page === "home" ? "Add Records" : "Records"}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Box
                  sx={{
                    marginRight: 1,
                    color: "#fff",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "500",
                  }}
                >
                  Sandeep Sokle
                </Box>
                <Avatar
                  sx={{ sizes: { xs: "10px", md: "16px" } }}
                  alt="Sandeep Sokle"
                  // src="/static/images/avatar/2.jpg"
                />
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
