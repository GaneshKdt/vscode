import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { withRouter } from "react-router"

const DropdownMenuLink = (props) => {
	function goToPage() {
		props.history.push(props.to)
	}
	return (
		<Dropdown.Item onClick = {goToPage} >
			{props.text}
		</Dropdown.Item>
	)
}

export default withRouter(DropdownMenuLink)