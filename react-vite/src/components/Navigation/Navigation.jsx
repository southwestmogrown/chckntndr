import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { Toolbar, Box, AppBar, Avatar, Container, Button, useMediaQuery} from "@mui/material";
import { useTheme } from "@emotion/react";

function Navigation() {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    e.preventDefault()

    await dispatch(thunkLogout())
    navigate('/')
  }
  return (
    <Box position="absolute" sx={{top: 0, width: "100vw"}}>
      <AppBar 
        className="navbar-container" 
        position="static" 
        sx={{ 
          p: 2,
          bgcolor: 'secondary.text',
        }}
      >
        <Toolbar>
          <Container sx={{ display: "flex", justifyContent: "center"}}>
            <NavLink to="/">
              <Avatar 
                alt="Chkn-Logo" 
                src="../../chkntndr-logo.png"
                className="logo"
                sx={{ 
                  width: 72, 
                  height: 72,
                  flexGrow: 1
                }}

              />
            </NavLink>
          </Container>
          <Container sx={{ display: "flex", justifyContent: "space-around"}}>
            <NavLink className="nav-link" to="/friends">Friends</NavLink>
            <NavLink className="nav-link" to="/places">Find a new place</NavLink>
          </Container>
          <Container sx={{ display: "flex", justifyContent: "center"}}>
            <Button 
              variant="contained" 
              onClick={onLogout}
              type="submit"
              size="sm"
              sx={{ color: "primary.text", marginTop: "10px"}}
              style={{fontSize: sm ? "0.7rem" : md ? "0.75rem" : lg ? "1rem" : "1.2rem"}}
            >
              Log Out
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
    // <header className="navbar-container">
    //   <div className="logo-container">
    //     <NavLink to="/"><img className="logo" src="../../chkntndr-logo.png"/></NavLink>
    //   </div>
    //   <nav className="navbar">
    //     <NavLink className="nav-link" to="/friends">Friends</NavLink>
    //     <NavLink className="nav-link" to="/places">Find a new place</NavLink>
    //   </nav>
    //   <button onClick={onLogout} className="logout-btn">Log Out</button>
    // </header>
  );
}

export default Navigation;
