import styled from 'styled-components';
import LoadingButton from '@mui/lab/LoadingButton';


export const StyledLoadingButton = styled(LoadingButton) `
    // MuiInput-contained
    && {
        background-color: #a7ce3b;
        margin-top: 30px;
        height: 30px;
        color: black;
    }
    &&:hover { 
        background: lightgrey;
    }

    &&.MuiLoadingButton-loading {
        background-color: lightgrey;
    }
`;