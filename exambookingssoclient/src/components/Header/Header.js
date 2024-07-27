import { Button, Hidden, Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Pages, URL } from '../../shared/config'
import RoutedLink from '../RoutedLink'
import ExamBooking from './Dropdowns/ExamBooking'
import StudentInfo from './Dropdowns/StudentInfo'
import { API } from "../../shared/config"
import AxiosHandler from "../../shared/AxiosHandler/AxiosHandler"
const ALMASHINES_LOGIN = API.almashinesLogin


const useStyles = makeStyles(
	(theme) => ({
		grow: {
			flexGrow: 1,
		},
		logo: {
			borderRadius: 0,
			height: '40px',
			objectFit: 'contain',
		},
	})
);

function Grow(props) {
	const classes = useStyles();

	return <div className={classes.grow} />
}

function Header(props) {
	const classes = useStyles();
    const [expandHeader, setExpandHeader] = useState(false);
	function toggleHeader() {
		setExpandHeader(!expandHeader)
	}
	return (
		<div className={classes.grow}>
			<CustomAppBar position="static" color="inherit">
				<Container>
					
					<Hidden smDown >
						<Toolbar>
							{/* Logo */}
							<NMLogo />

							{/* navigation */}
							<HeaderItems {...props} />
							{/* student info */}
							<HeaderStudentInfo {...props}/>
						</Toolbar>
					</Hidden>
					<Hidden mdUp >
						<Toolbar>
							{/* show hide button */}
							<IconButton edge="start" onClick={toggleHeader} color="inherit" aria-label="menu">
								<MenuIcon />
							</IconButton>

							{/* Logo */}
							<NMLogo />
							{/* student info */}
							<HeaderStudentInfo {...props}/>
						</Toolbar>
						{/* navigation only showed when toggled*/}
						{
							expandHeader ? (
								<HeaderItems {...props} />
							) : null
						}
					</Hidden>
				</Container>
			</CustomAppBar>
		</div>
	);
}

function HeaderStudentInfo(props) {
	return (
		<>
			<Grow/>
			{/* Hide this on smaller devices as names tend to overflow */}
			<div className = "d-none d-sm-block mr-2" style={{height: '40px'}}>
				<Typography variant="body1" noWrap >
					{props.name}
				</Typography>
				<Typography className="float-right" variant="body2">
					{props.sapid}
				</Typography>
			</div>
			<StudentInfo {...props}/>
		</>
	)
}

function NMLogo() {
	const classes = useStyles();
	return (
		<>
			{/* <Button component = { RoutedLink } to = { Pages.home } > */}
				<img 
					alt="NGASCE - NMIMS" 
					src= { URL.logo }  
					className={classes.logo}
				/>
			{/* </Button> */}
		</>
	)
}
function goToAlmashinesLogin (almashinesId){
	  AxiosHandler.AxiosPostHandler({
	  	url: ALMASHINES_LOGIN,
	  	data: {
	  		almashinesId: almashinesId
	  	},
	  	successCallBack: (response) => { 
	  		window.location.href = response.data.urlLocation; 
	  	},
	  	failureCallBack: (failure) => {},
	  })
};

function HeaderItems(props) {
	return (
		<>
			<ExamBooking />
			
			<Button component = { RoutedLink } to = { Pages.upcomingExams }>
				Upcoming Exams
			</Button>

			<Button component = { RoutedLink } to = { Pages.examResults }>
				Exam Results
			</Button>

			<Button component = { RoutedLink } to = { Pages.eLearn }>
				E-Learn Resource
			</Button>

			<Button component = { RoutedLink } to = { Pages.contactUs }>
				Support
			</Button>
			{(props.almashinesId != null) &&
			<Button component = { RoutedLink } onClick = {() => goToAlmashinesLogin(props.almashinesId)}>
				NGASCE Alumni Portal
			</Button>
			}
		</>
	)
}

const CustomAppBar = withStyles({
	root: {
		backgroundColor: '#ece9e7',
		color: 'black',
	},
})(AppBar)


const mapStateToProps = state => {
	return {
		title : state.currentPageTitle,
		imageUrl : state.imageUrl,
		name : `${state.firstName} ${state.lastName}`,
		sapid : state.sapid,
		almashinesId : state.almashinesId
	}
}

export default connect(mapStateToProps)(withRouter(Header))