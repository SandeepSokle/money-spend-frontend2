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
import { useSelector } from "react-redux";
const settings = ["Profile", "History", "Logout"];

function Header(props) {
  const { page } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [firstLetter, setFirstLetter] = React.useState("");

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const userData = useSelector((state) => {
    return state.user;
  });

  React.useEffect(() => {
    if (userData) setFirstLetter(userData.name.charAt(0).toUpperCase());
  }, [userData]);

  const handleCloseUserMenu = ({ setting }) => {
    setAnchorElUser(null);
    if (setting && setting?.toLowerCase() === "logout") {
      window.localStorage.removeItem("moneySpendsToken");
      navigate("/login");
    }
    if (setting && setting?.toLowerCase() === "profile") {
      navigate("/profile");
    }
    if (setting && setting?.toLowerCase() === "history") {
      navigate("/history");
    }
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
            fontSize="small"
            sx={{ display: { xs: "flex", md: "flex" }, mr: 0.5 }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              //   mr: 2,
              display: {
                xs: "flex",
                md: "flex",
                fontSize: "18px",
                mr: 4,
                paddingRight: 4,
              },
              flexGrow: 2,
              //   fontFamily: "monospace",
              fontWeight: 600,
              //   letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              zIndex: 10,
            }}
          >
            Expenses
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          {page === "profile" ? null : (
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
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                component={"div"}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Box
                  sx={{
                    marginRight: 0.5,
                    paddingRight: "5px",
                    color: "#fff",
                    fontSize: { xs: "13px", md: "16px" },
                    fontWeight: "500",
                  }}
                >
                  {userData.name}
                </Box>
                <Avatar
                  sx={{ sizes: { xs: "9px", md: "15px" } }}
                  alt={userData.name}

                  // src="/static/images/avatar/2.jpg"
                >
                  {firstLetter}
                </Avatar>
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
              onClose={() => {
                handleCloseUserMenu({ setting: null });
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseUserMenu({
                      setting,
                    });
                  }}
                >
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
