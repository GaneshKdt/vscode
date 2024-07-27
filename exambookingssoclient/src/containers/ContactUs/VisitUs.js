import React from 'react';
import { Form } from 'react-bootstrap'
import { Paper } from '@material-ui/core';

const centreAddressList = {
    'Mumbai' : 'NGA SCE, 2nd Floor, NMIMS New Building, Opp Mithibai College, V.L.Mehta Road, Vile Parle West, Mumbai - 400056 Maharashtra',
    'Delhi' : 'Upper Ground Floor, KP - 1, Pitampura, Next to Hotel City Park, New Delhi - 110034 New Delhi',
    'Bangalore' : '11, Kaveri Regent Coronet, 80 Feet Road, 7th Main, 3rd Block, Next to Raheja Residency, Koramanagla, Bangalore - 560034 Karnataka',
    'Hyderabad' : '12-13-95, Street No. 3, Beside Big Bazar,  Taranaka , Hyderabad - 500018 Andhra Pradesh',
    'Pune' : '365/6, Aaj Ka Anand Building, 2nd Floor, Opposite SSPS School, Narveer Tanaji Wadi, Shivajinagar, Pune -411005 Maharashtra',
    'Ahmedabad' : 'B-3, Ground Floor, "Safal Profitaire", Corporate Road, Near Prahladnagar Garden, Prahladnagar, Ahmedabad -380 007 Gujarat',
    'Kolkata' : 'Unit # 505, Merlin Infinite, DN-51, Salt Lake City, Sector V, Kolkata-700091 West Bengal',
}

export default function VisitUs(props) {

	const [ locateCentreCity, setLocateCentreCity ] = React.useState('');
    
    const handlelocateCentreCityChange = (evt) => {
        setLocateCentreCity(evt.target.value)
    }

    const renderAddressDetails = (city) => {
        return(
            <div className="mt-2 border p-2">
                <b>LOCAL OFFICE ADDRESS</b>
                <hr/>
                { centreAddressList[city] }
            </div>
        )
    }

    return (
        <Paper className = 'p-3' style = {{overflowX : 'auto'}}>
            <h6 className="card-title mt-0">
                <span className="my-auto mr-auto"> Visit Us </span>
            </h6>
            <hr/>
            <label className="text-uppercase">MAIN HEAD OFFICE</label>
            <p>V.L.Mehta Road, Vile Parle (W) Mumbai, Maharashtra - 400056 </p>
            <Form>      
                <Form.Group controlId="locateCentreCity">
                    <Form.Control 
                        as = "select" 
                        name = "locateCentreCity" 
                        value = { locateCentreCity } 
                        onChange = { handlelocateCentreCityChange }
                    >
                        <option value="">Select a City</option>
                        {
                            props.cityArray.map((city) => {
                                    return(
                                        <option key={`locateCentreCity-${city}`} value={city}>
                                            {city}
                                        </option>
                                    )
                                }
                            )
                        }
                    </Form.Control>
                    { locateCentreCity ? renderAddressDetails(locateCentreCity) : null }
                </Form.Group>
            </Form>
        </Paper>
    )
}
