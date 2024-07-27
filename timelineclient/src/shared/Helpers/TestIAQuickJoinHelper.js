
class TestIAQuickJoinHelper{
    static StartCheckForUpcomingTestsSetInterval = () => {
        console.log("StartCheckForUpcomingTestsSetInterval() called ---->");
        
    }
}

const mapStateToProps = state => {
	return {
		// sapId: state.sapid,
		data:state
	}
}

export default connect(mapStateToProps)(analyticsManager(TestIAQuickJoinHelper))