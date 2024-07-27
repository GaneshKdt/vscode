import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const RoutedLink = React.forwardRef(
    (props, ref) => (
        <RouterLink 
            innerRef={ref} 
            {...props} 
        />
    )
);

export default RoutedLink