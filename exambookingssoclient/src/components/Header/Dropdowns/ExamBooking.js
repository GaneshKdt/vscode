import { Button } from "@material-ui/core";
import React from 'react';
import { Dropdown } from "react-bootstrap";
import { Pages } from "../../../shared/config";
import DropdownMenuLink from "../../DropdownMenuLink";

export default function ExamBooking(props) {
    return (
        <Dropdown alignRight>
            <Dropdown.Toggle as={Button}>
                Exam Booking
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <DropdownMenuLink to={ Pages.examBookingHome } text='Home'/>
                <DropdownMenuLink to={ Pages.hallticket } text='Hall Ticket'/>
            </Dropdown.Menu>
        </Dropdown>
    )
}