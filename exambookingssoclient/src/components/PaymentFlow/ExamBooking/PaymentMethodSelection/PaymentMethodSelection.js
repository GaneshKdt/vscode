import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PaymentProvider from './PaymentProvider'
import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler';
import { API, RES_BASE } from '../../../../shared/config';
import ErrorAndLoadingWrapper from '../../../ErrorAndLoadingWrapper/ErrorAndLoadingWrapper';

class PaymentMethodSelection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded : false,
			error : false,
			paymentMethods : []
		};
	}

	getPaymentProviders = () => {
		AxiosHandler.AxiosGetHandler({
			url : API.getPaymentOptions,
			successCallBack : (response) => {
				this.setState({
					loaded : true,
					error : false,
					paymentMethods : response.data,
				})
			},
			failureCallBack : (error) => {
				this.setState({
					loaded : true,
					error : true,
				})
			},
		})
	}

	componentDidMount() {
		this.getPaymentProviders()
	}

	getPaymentMethodString = (name) => {
		switch(name) {
			case 'hdfc' : return 'HDFC Bank'
			case 'billdesk' : return 'BillDesk'
			case 'payu' : return 'PayU'
			case 'paytm' : return 'Paytm'
			default : return ''
		}
	}
	render() {
		var selectedProviderName = this.props.selectedPaymentProvider ? this.props.selectedPaymentProvider.name : ''
		return (
			<ErrorAndLoadingWrapper
				loaded = {this.state.loaded}
				error = {this.state.error}
				loadingMessage = 'Loading available Payment Providers'
				errorMessage = 'Error getting Payment Providers'
			>
				<Row className="justify-content-md-center">
					{
						this.state.paymentMethods.map((paymentMethod, id) => {
							return (
								<Col 
									md = {12}
									lg = {5}
									xl = {4}
									key = { `payment-provider-${id}` } 
									className='text-center my-xs-2 my-sm-2 my-md-0'
								>
									<PaymentProvider
										image = { `${RES_BASE}images/logos/${paymentMethod.image}` }
										name = { this.getPaymentMethodString(paymentMethod.name) }
										selected = { selectedProviderName === paymentMethod.name }
										setPaymentProvider = { () => this.props.setPaymentProvider(paymentMethod) }
									/>
								</Col>
							)
						})
					}
				</Row>
			</ErrorAndLoadingWrapper>
		)
	}
}
export default PaymentMethodSelection