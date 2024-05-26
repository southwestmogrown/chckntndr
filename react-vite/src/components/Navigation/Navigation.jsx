import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { Toolbar, Box, AppBar, Avatar, Container, Button} from "@mui/material";

function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    e.preventDefault()

    await dispatch(thunkLogout())
    navigate('/')
  }
  return (
    <Box >
      <AppBar 
        className="navbar-container" 
        position="static" 
        sx={{ 
          p: 2,
          bgcolor: 'secondary.text'
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
            <Button onClick={onLogout}>Log Out</Button>
          </Container>
        </Toolbar>
      </AppBar>
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
