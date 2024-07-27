import merge from 'lodash/merge'
import storage from 'redux-persist/lib/storage';
import { persistReducer,REHYDRATE } from 'redux-persist';
const initialState = {
    // counter: 0,
    // sapid: '77218101888',
    // firstName: 'Soumi',
    // lastName: 'Banerjee',
    // imageUrl: "http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001OMt6u/00Q0o00001OMt6u_gbPQ_Picture.jpg",
    // program: "MBA (WX)",
    // prgmStructApplicable: "Jul2014",
    // "centerName":"Kolkata - Camac Street"
    timebound_set : false,
    batch : "",
    productType: "MBAWX"
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'Authenticated':
            {   
                //state=action.data; //hide this
                //return state;     //hide this
                return  merge(initialState, state, action.data)
            }
            case 'GOTBATCHNAME':
                {   
                    return  merge(initialState, state, action.data)
                }

                case 'LoadStudentsBatchList'  :{
                    console.log('state in LoadStudentsBatchList')
                    var newstate = {...state}
                    newstate.contacts=action.data
                    console.log("LoadStudentsBatchList",action.data)

                    return newstate
                }   

        case 'LOADED_SUBJECT_DETAILS':
            {   
                console.log('state in LOADED_SUBJECT_DETAILS')
                console.log(state)
                if (action.data.currentTimeboundId !== state.currentTimeboundId) {
                var newstate = {...state}
                newstate.currentTimeboundId=action.data.currentTimeboundId
                newstate.timebound_set = true
                state=newstate
                return state
                } else {
                    return merge(initialState, state, action.data)
                } 


            }
        case 'APPLICABLE_SUBJECTS':
            {   
                console.log('state in APPLICABLE_SUBJECTS')
                console.log(state)
                var newstate = {...state}
                newstate.applicableSubjects=action.data.applicableSubjects
                state=newstate
                return state
                
            }    

        case 'USER_LOGOUT':  
        {
            state = {};
            return state;
        }

        case 'LAST_ACTIVE_TAB' :
            { 
            var newstate = {...state}
            newstate.activeTab=action.data.activeTab
            state=newstate
                return  state
               
            }
            
        case 'IA_QUICK_JOIN_VIEWED' :
            { 
            var newstate = {...state}
            newstate.viewedIAQuickJoin=action.data.viewedIAQuickJoin
            state=newstate
                return  state
               
            }
        // case 'FILTER_POST': 
        //     {
        //         console.log("filter post")
        //         console.log(action.data)   
        //         return  merge(state,action.data)
                
        //     }    

        case 'LOADED_TEST_DETAILS':
            {
                console.log('state in LOADED_TEST_DETAILS')
                console.log(state)
                if (action.data.testTodoData) {
                var newstate = {...state}
                newstate.testTodos=action.data.testTodoData
                state=newstate
                console.log(state)
                return state
                } else {
                    return merge(initialState, state, action.data)
                } 
            }
        case 'LOADED_SESSION_PLAN':{
            console.log('state in LOADED_SESSION_PLAN')
                console.log(state)
                if (action.data.sessionPlanData) {
                var newstate = {...state}
                newstate.sessionPlanData=action.data.sessionPlanData
                state=newstate
                console.log(state)
                return state
                } else {
                    return merge(initialState, state, action.data)
                } 
        }

        case 'REFRESH_STUDENT_DETAILS':{
            console.debug('In REFRESH_STUDENT_DETAILS ')
            
            return {...state, ...action.data.data}
        }
      
            
        default:
          return state;
      }


}

const persistConfig = {
    //this was named auth. which caused an issue as the declaration for this in configureStore used to previously be 'primary'
    key: 'primary',
    storage: storage,
    blacklist: ['SEARCH_POST']
};

export default persistReducer(persistConfig, reducer);