import { AppConfig } from '../../config_settings';

let METTL_DEMO_EXAM_URL_WX = AppConfig.METTL_DEMO_EXAM_URL_WX
let METTL_DEMO_EXAM_URL_MSC = AppConfig.METTL_DEMO_EXAM_URL_MSC

class DemoExamHelper { 

    static startDemoExam = (program) => {
        if(program == 'MBA - WX') {
            window.open(METTL_DEMO_EXAM_URL_WX, '_blank')
        } else {
            window.open(METTL_DEMO_EXAM_URL_MSC, '_blank')
        }
    }
}

export default DemoExamHelper