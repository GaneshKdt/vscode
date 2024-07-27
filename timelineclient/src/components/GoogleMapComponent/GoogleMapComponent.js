import React, { Component } from 'react'
import Iframe from 'react-iframe';

class GoogleMapComponent extends Component {

    componentDidMount() {
        console.debug(this.props)
        if(!this.props.loadFromIFrame) {
            this.initMap(this.props.mapComponentId, this.props.loc)
        }
    }
    initMap(mapComponentId, loc) {
        var map = new window.google.maps.Map( document.getElementById(mapComponentId), {zoom: 4, center: loc} );
        var marker = new window.google.maps.Marker({position: loc, map: map});
    }
    render() {
        
        if(this.props.loadFromIFrame) {
            return (
                <Iframe 
                    className = "w-100 h-100" 
                    url = { this.props.src }
                />
            )
        } else {
            return (
                <div 
                    className = "w-100 h-100" 
                    id = { this.props.mapComponentId }
                />
            )
        }
    }
}

export default GoogleMapComponent