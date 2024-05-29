import { Button, useMediaQuery } from '@mui/material';
import { useModal } from '../../context/Modal';
import { useTheme } from '@emotion/react';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))
  // console.log(sm)
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return  <Button 
            size={sm ? 'small' : md ? "medium" : 'large'}

            variant='contained'
            onClick={onClick}
            sx={{ color: "primary.text", marginRight: md ? "0.5rem" : 0}}
            style={{fontSize: sm ? "1rem" : md ? "1.2" : lg ? "1.5rem" : "2rem"}}
          >{buttonText}
         </Button>;
}

export default OpenModalButton;
