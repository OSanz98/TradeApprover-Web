import TextField from '@mui/material/TextField';
import styled from 'styled-components';


export const StyledTextField = styled(TextField)`
    background: white;
    && {
        margin-bottom: 15px;
    }
    & label.Mui-focused {
        color: #637d63;
    }
    & .MuiInput-underline:after {
        border-bottom-color: #637d63;
    }
    & .MuiInput-underline.Mui-error {
        color: red;
    }
    & .MuiFormLabel-root.Mui-error {
        color: red;
    }
    
`;