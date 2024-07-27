import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	centerX : {
		'margin-left' : 'auto',
		'margin-right' : 'auto',
	},
	centerY : {
		'margin-top' : 'auto',
		'margin-bottom' : 'auto',
	}
}));

export default function LoadingSpinner(props) {
  	const classes = useStyles();

	return (
		<div className={`${props.centerX ? classes.centerX : ''} ${props.centerY ? classes.centerY : ''}`}>
			<CircularProgress />
			{
				props && props.loadingText ? 
				<>
					<br/>
					<label>
						{ props.loadingText }
					</label>
				</>
				: null
				
			}
		</div>
	);
}

// class LoadingSpinner extends Component {
//   render() { 
    
//       return (
//         <div className="loadingSpinner">
//           <div className ={this.props && this.props.noSpace ? "pb-1" : "loadingSpinnerParent mt-5"}>
//             <div className = {this.props && this.props.noSpace ? "" : "loadingSpinnerChild"}>
//               <Spinner animation="border" variant="secondary">
//                 <span className="sr-only">Loading...</span>
//               </Spinner>
//             </div>
//           </div>
//           {
//             this.props && this.props.loadingText ? 
//               <label>
//                 { this.props.loadingText }
//               </label>: null
//           }
//         </div>
//       );
    
//   }
// }