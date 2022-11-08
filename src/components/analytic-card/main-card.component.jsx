import React from 'react';
import {Chip, Grid, Stack, Typography } from '@mui/material';
import CardSkeleton from './card-skeleton.component';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';


const MainCard = ({color, title, count, percentage, isLoss, extraInfo, elevation, maxWidth}) => {
    return(
        <CardSkeleton elevation={elevation} contentSX={{p: 2.25, }} maxWidth={maxWidth} color={color}>
            <Stack spacing={0.5}>
                <Typography variant="h7" color="text.secondary">
                    {title}
                </Typography>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography variant="h5" color="inherit">
                            {count}
                        </Typography>
                    </Grid>
                    {percentage && (
                        <Grid item>
                            <Chip 
                            variant="combined" 
                            color={color}
                            icon={
                                <>
                                    {!isLoss & <RiseOutlined style={{fontSize: '0.75rem', color: 'inherit'}}/>}
                                    {isLoss & <FallOutlined style={{fontSize: '0.75rem', color: 'inherit'}} />}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ml: 1.25, pl: 1}}
                            size="small"
                            />
                        </Grid>
                    )}                                                                                                                                                                                                              
                </Grid>
            </Stack>
        </CardSkeleton>
    );
};


export default MainCard;