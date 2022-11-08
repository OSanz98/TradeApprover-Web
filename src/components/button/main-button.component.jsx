import styled from 'styled-components';
import { Button } from '@mui/material';

export const StyledMainButton = styled(Button) `
// MuiInput-contained
&& {
    background-color: #637d63;
    height: 40px;
    color: white;
}
&&:hover { 
    background: lightgrey;
}
`;