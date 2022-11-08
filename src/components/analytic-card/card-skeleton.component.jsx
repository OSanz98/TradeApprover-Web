import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Divider} from '@mui/material'
import { useTheme } from '@mui/material/styles';


// header style
const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

const CardSkeleton = forwardRef(({
    shadow,
    boxShadow,
    border = true,
    children,
    content = true,
    contentSX = {},
    divider = true,
    elevation,
    secondary,
    sx ={},
    title,
    codeHighlight,
    maxWidth,
    color,
    ...others
}, ref) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return(
        <Card
            elevation={elevation || 0}
            ref={ref}
            {...others}
            sx={{
                ...sx,
                border: border ? '1px solid' : 'none',
                borderRadius: 2,
                maxWidth: maxWidth,
                // borderColor: color,
                borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A700,
                boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
                ':hover': {
                    boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
                },
                '& pre': {
                    m: 0,
                    p: '16px !important',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '0.75rem'
                }
            }}
        >
            {title && (<CardHeader sx={headerSX} titleTypographyProps={{variant: 'subtitle1'}} title={title} action={secondary} />)}

            {title && divider && <Divider />}

            {content && <CardContent sx={contentSX}>{children}</CardContent>}

        </Card>
    );

});

CardSkeleton.propTypes = {
    shadow: PropTypes.string,
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    contentSX: PropTypes.object,
    divider: PropTypes.bool,
    elevation: PropTypes.number,
    secondary: PropTypes.node,
    sx: PropTypes.object,
    title: PropTypes.string,
    codeHighlight: PropTypes.bool,
    content: PropTypes.bool,
    children: PropTypes.node,
    maxWidth: PropTypes.string,
    color: PropTypes.string,
};

export default CardSkeleton;