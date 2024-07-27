import { Avatar, Button, Typography } from "@material-ui/core";
import React from 'react';
import { Dropdown } from "react-bootstrap";
import { Pages } from "../../../shared/config";
import RoutedLink from "../../RoutedLink";

export default function StudentInfo(props) {
    return (
        <Dropdown alignRight>
            <Dropdown.Toggle as={Button}>
                <Avatar alt="User Image" src={props.imageUrl} />
            </Dropdown.Toggle>
            <Dropdown.Menu 
                as = {DropdownMenu} 
                sapid = {props.sapid}
                name = {props.name}
            />
        </Dropdown>
    )
}



const DropdownMenu = React.forwardRef( 
	(props, ref) => {
		return (
			<div
				ref={ref}
				style={props.style}
				className={props.className}
				aria-labelledby={props.labeledBy}
			>
				<div className="px-4">
					<Typography variant="subtitle2" gutterBottom>
						{props.name}
					</Typography>
					<Typography variant="body2" gutterBottom>
						{props.sapid}
					</Typography>
					<Button 
						title = "Support"
						component = { RoutedLink }  
						to = { Pages.logout }
						color = "primary"
					>
						Logout
					</Button>
				</div>
			</div>
		);
	},
);
