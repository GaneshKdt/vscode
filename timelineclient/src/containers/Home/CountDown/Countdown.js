import React, {Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'  
import ConfigUrls from '../../../shared/config'
import './Countdown.css'

const urls = new ConfigUrls().urls;

const centerLabel = {
  textAlign: 'Center'
}
export class Countdown extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          days: 0,
          hours: 0,
          min: 0,
          sec: 0,
          Countdown: [],
          isTimerLoaded: false
        }
      }
    
      componentDidMount() {  
          this.loadCountDownTimer();  
      }

      loadCountDownTimer=() => {
        console.log('in loadCountDownTimer function----------> ')
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "getCountDownTime",
            JSON.stringify({ 
              id : this.props.currentTimeboundId
            })
        ).then(response => {
          this.setState({
            Countdown : response.data.studentSubjectConfig,
            isTimerLoaded : true
          })
          console.log('in loadCountDownTimer function Response : ')
          console.log(this.state.Countdown)
          
          if (this.state.isTimerLoaded) {
            this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.state.Countdown.startDate);
            date ? this.setState(date) : this.stop();
          }, 1000);
          } 
             
        }).catch(function(error){
            console.log(error);
        })
      }

      componentWillUnmount() {
        this.stop();
      }
    
      calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    
        // clear countdown when date is reached
        if (diff <= 0) return false;
    
        const timeLeft = {
          years: 0,
          days: 0,
          hours: 0,
          min: 0,
          sec: 0,
          millisec: 0,
        };
    
        // calculate time difference between now and expected date
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
          timeLeft.years = Math.floor(diff / (365.25 * 86400));
          diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
          timeLeft.days = Math.floor(diff / 86400);
          diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
          timeLeft.hours = Math.floor(diff / 3600);
          diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
          timeLeft.min = Math.floor(diff / 60);
          diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
    
        return timeLeft;
      }
    
      stop() {
        clearInterval(this.interval);
      }
    
      addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
          value = '0' + value;
        }
        return value;
      }

    render() {
        const countDown = this.state;

        return (
      <div className="Countdown">
        <div>Your Course Begins in</div><br />
        <span className="Countdown-col">
          <span className="Countdown-col-element">
              <strong>{this.addLeadingZeros(countDown.days)}</strong><br />
              <span style={centerLabel}>{countDown.days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.hours)}</strong><br />
            <span style={centerLabel}>Hours</span>
          </span>
        </span>


        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.min)}</strong><br />
            <span style={centerLabel}>Min</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.sec)}</strong><br />
            <span style={centerLabel}>Sec</span>
          </span>
        </span>
      </div>
        )
    }
}

// Countdown.defaultProps = {
// date: '2019-07-27 00:00:00 GMT+0530 (India Standard Time)'
// };

const mapStateToProps = state => {
	return {
		currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(Countdown)
