import React from 'react'
import { Card, FormCheck, Button } from 'react-bootstrap'

const PaymentProvider = (props) => {
	return (
		<Card onClick = { props.setPaymentProvider } className = {`h-100 payment-provider`}>
			<Card.Body className="d-flex align-items-center">
				<img
					className = 'w-100 p-2'
					onError= { (e) => {
						console.debug(e)
					}}
					src={props.image}
				/>
			</Card.Body>
			{/* <Card.Footer className="bg-white border-top-0">
				<Button variant="danger" onClick = { props.setPaymentProvider }>
					{ props.name }
				</Button>
			</Card.Footer> */}
		</Card>
	)
}

export default PaymentProvider