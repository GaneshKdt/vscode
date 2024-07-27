import axios from 'axios'

class AxiosHandler {
    
    static AxiosPostHandler = (options) => {
        axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
    
        axios.post(
            options.url,
            options.data
        ).then(
            response => {
                if(options.successCallBack){
                    options.successCallBack(response)
                }
            }
        ).catch(
            error => {
                if(options.failureCallBack){
                    options.failureCallBack(error)
                }
            }
        )
    }

    static AxiosGetHandler = (options) => {
        // This hasnt been tested yet. Please test before using
        axios.get(
            options.url,
            {
                params: options.data
            }
        ).then(
            response => {
                if(options.successCallBack){
                    options.successCallBack(response)
                }
            }
        ).catch(
            error => {
                if(options.failureCallBack){
                    options.failureCallBack(error)
                }
            }
        )
    }
}

export default AxiosHandler