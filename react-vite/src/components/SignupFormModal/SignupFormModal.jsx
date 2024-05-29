import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { Button, Input, Typography, Box, useMediaQuery } from "@mui/material";
import OpenModalLink from "../OpenModalLink";
import { useTheme } from "@emotion/react";
import LoginFormModal from "../LoginFormModal";

const ariaLabel = { 'aria-label': 'description' }

function SignupFormModal() {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <Box
      sx={{
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "500px",
        bgcolor: "secondary.main",
        width: "25vw",
        minWidth: "300px",
        boxShadow: 15,
        borderRadius: "20px",
        [theme.breakpoints.down("sm")]: {
          overflowY: "scroll",
          overflowX: "none",
          width: "100%",
          height: "100%",
          borderRadius: 0
        }
      }}
      component="form"
    >
      <Typography variant="h3">Sign Up</Typography>
      <Input 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" inputProps={ariaLabel} 
        value={email}
        sx={{ color: 'primary.text', fontSize: sm ? "1.5rem" : "2rem", minWidth: "200px"}}
        required
      />
      {errors.email && <p>{errors.email}</p>}
      <Input 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" inputProps={ariaLabel} 
        value={username}
        sx={{ color: 'primary.text', fontSize: sm ? "1.5rem" : "2rem", minWidth: "200px"}}
        required
      />
      {errors.username && <p>{errors.username}</p>}
      <Input 
        type="password"
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" inputProps={ariaLabel} 
        value={password}
        sx={{ color: 'primary.text', fontSize: sm ? "1.5rem" : "2rem", minWidth: "200px"}} 
        required
      />
      {errors.password && <p>{errors.password}</p>}
      <Input 
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirm Password" inputProps={ariaLabel} 
        value={confirmPassword}
        sx={{ color: 'primary.text', fontSize: sm ? "1.5rem" : "2rem", minWidth: "200px"}} 
        required
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      <Button
        onClick={handleSubmit} 
        variant="contained"
        type="submit"
        size="sm"
        sx={{ color: "primary.text", marginTop: "10px"}}
        style={{fontSize: sm ? "0.7rem" : md ? "0.75rem" : lg ? "1rem" : "1.2rem"}}
      >
        Sign Up
      </Button>
      <Typography variant="subtitle1">
        Already have an account? <OpenModalLink linkText="Login Now" modalComponent={<LoginFormModal />} />
      </Typography>
    </Box>
    // <div className="signup-container">
    //   <h1>Sign Up</h1>
    //   {errors.server && <p>{errors.server}</p>}
    //   <form className="signup-form" onSubmit={handleSubmit}>
    //     <div className="input-container">
    //       <label>Email</label>
    //       <input
    //         type="text"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //       {errors.email && <p>{errors.email}</p>}
    //     </div>
    //     <div className="input-container">
    //       <label>Username</label>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //       {errors.username && <p>{errors.username}</p>}
    //     </div>
    //     <div className="input-container">
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //       {errors.password && <p>{errors.password}</p>}
    //     </div>
    //     <div className="input-container">
    //       <label>Confirm Password</label>
    //       <input
    //         type="password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //       />
    //       {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
    //     </div>
    //     <button className="signup-btn" type="submit">Sign Up</button>
    //   </form>
    // </div>
  );
}

export default SignupFormModal;
