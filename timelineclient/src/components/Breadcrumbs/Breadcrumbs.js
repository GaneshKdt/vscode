import React from 'react';
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PathIndex from './Paths'
import './Breadcrumbs.css'

let PathIndexes = new PathIndex()

export default function Breadcrumbs(props) {
	
	let crumbsList = []
	if(props.crumbsList) {
		crumbsList = props.crumbsList
	} else {
		crumbsList = PathIndexes.getPathDetails(window.location.pathname)
	}

	if(crumbsList) {
		return (
			<Breadcrumb>
				{
					<GetCrumbs crumbsList = {crumbsList} />
				}
			</Breadcrumb>
		);
	} else {
		return null
	}
}

function GetCrumbs(props) {
	
	return (
		props.crumbsList.map((crumb, index) => {
			return (
				<Crumb 
					key={`crumb-${crumb.text}`} 
					{...crumb} 
					active = {index === (props.crumbsList.length - 1)}
				/>
			)
		})
	)
}

function Crumb(props) {
	if(props.active) {
		return (
			<Breadcrumb.Item active>
				{props.text}
			</Breadcrumb.Item> 
		)
	}
	return (
		<Breadcrumb.Item componentClass="div">
			<Link 
				to={{
					pathname : props.path,
					...props.data
				}}
			>
				{props.text}
			</Link>
		</Breadcrumb.Item>
	)
}
