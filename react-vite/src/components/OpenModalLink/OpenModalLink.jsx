import { useModal } from '../../context/Modal';
import { Typography } from '@mui/material';

function OpenModalLink({
  modalComponent, // component to render inside the modal
  linkText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {

  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };


  return (
    <Typography 
      variant="subtitle1"
      sx={{ color: "primary.text"}} 
      onClick={onClick}>{linkText}
    </Typography>
  )
}

export default OpenModalLink
