import React from 'react'
import { Card } from 'react-bootstrap'

const PaymentProvider = (props) => {
	return (
	
			<Card onClick = { props.setPaymentProvider } className = 'h-100 payment-provider'>
				<Card.Body className="d-flex align-items-center">
					<img
						className = 'w-100 p-2'
						onError = {(e) => {}}
						alt = {props.name}
						src = {props.image}
					/>
				</Card.Body>
			</Card>
	
	)
}

export default PaymentProvider