import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";

function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    e.preventDefault()

    await dispatch(thunkLogout())
    navigate('/')
  }
  return (
    <header className="navbar-container">
      <div className="logo-container">
        <NavLink to="/"><img className="logo" src="../../chkntndr-logo.png"/></NavLink>
      </div>
      <nav className="navbar">
        <NavLink className="nav-link" to="/friends">Friends</NavLink>
        <NavLink className="nav-link" to="/places">Find a new place</NavLink>
      </nav>
      <button onClick={onLogout} className="logout-btn">Log Out</button>
    </header>
  );
}

export default Navigation;
