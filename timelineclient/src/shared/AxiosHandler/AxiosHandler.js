import axios from 'axios'
import { API } from '../config';
// import ConfigureStore from ''
class AxiosHandler {
    
    static AxiosPostHandler = (options) => {
        
      
        
        if(options.multipart){
            axios.defaults.headers.post['Content-Type'] = "multipart/form-data";
        }else{
            axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
            axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        }

        var networkInfo = {}
        try {
            networkInfo = JSON.stringify({
                downlink : navigator.connection.downlink,
                rtt : navigator.connection.rtt,
                downlinkMax : navigator.connection.downlinkMax,
                effectiveType : navigator.connection.effectiveType,
                type : navigator.connection.type,
                saveData : navigator.connection.saveData,
            })
        } catch(error) {
            networkInfo = 'Not Available'
        } 
        var networkData = {
            sapid : this.sapid ? this.sapid : '',
            api : options.url,
            resquest_time : Date.now(),
            networkInfo : networkInfo,
            platform : "Web",
        }

        axios.post(
            options.url,
            options.data
        ).then(
            response => {
                if(options.successCallBack){
                    options.successCallBack(response)
                }else{
                    console.debug("Axios Call Response : ", response)
                }
                networkData = {
                    ...networkData,
                    response_time : Date.now(),
                    response_payload_size : response.headers['content-length'],
                    status : 'success',
                }
                sendNetworkLogs(networkData);
            }
        ).catch(
            error => {
                if(options.failureCallBack){
                    options.failureCallBack(error)
                }else{
                    console.error("Axios Call Error : ", error)
                }
                
                networkData = {
                    ...networkData,
                    response_time : Date.now(),
                    response_payload_size : 0,
                    status : 'error',
                }
                sendNetworkLogs(networkData);

            }
        )
    }

    static AxiosGetHandler = (options) => {
        // This hasnt been tested yet. Please test before using
        console.debug(options)
        axios.get(
            options.url,
            {
                params: options.data
            }
        ).then(
            response => {
                if(options.successCallBack){
                    options.successCallBack(response)
                }else{
                    console.debug("Axios Call Response : ", response)
                }
            }
        ).catch(
            error => {
                if(options.failureCallBack){
                    options.failureCallBack(error)
                }else{
                    console.error("Axios Call Error : ", error)
                }
            }
        )
    }
}
async function sendNetworkLogs(networkData){
    // axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    // axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
    console.debug(URL.saveNetworkLogs)
    console.debug(networkData)
    axios.post(
        API.saveNetworkLogs,
        networkData
    ).then((response) => {
    }).catch((error) => {
        console.debug('error logging network data', error)
    })
}
export default AxiosHandler