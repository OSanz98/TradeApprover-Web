import PropTypes from 'prop-types';
import {memo} from 'react';
import { Box } from '@mui/material';
import {StyledRootScrollbar, StyledScrollbar} from './scrollbar.styles';


ScrollBar.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node,
}

function ScrollBar({children, sx, ...other}) {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isMobile) {
        return (
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
            {children}
        </Box>
        );
    }

    return (
        <StyledRootScrollbar>
            <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
                {children}
            </StyledScrollbar>
        </StyledRootScrollbar>
    );
}

// memo skips rendering a component if its props havne't changed. Improves performance
export default memo(ScrollBar);