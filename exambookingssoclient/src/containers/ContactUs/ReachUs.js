import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function ReachUs(props) {
    return (
        <Paper className = 'p-3' style = {{overflowX : 'auto'}}>
            <h6 className="card-title mt-0">
                <span className="my-auto mr-auto">
                    Reach Us
                </span>
            </h6>
            <hr/>
            <Typography variant="subtitle1" gutterBottom>
                ngasce@nmims.edu
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                1800 1025 136 (Toll Free) Mon-Sat  (9am-7pm)
            </Typography>
        </Paper>
    )
}