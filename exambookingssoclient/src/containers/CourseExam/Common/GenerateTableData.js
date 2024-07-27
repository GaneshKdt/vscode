let red = "text-danger font-weight-bold"
let green = "text-success font-weight-bold"

const GenerateTableData = (subjects, type) => {
    let toReturn = []
    let id = 0
    

    subjects.forEach(row => {
        id++
        
        let typeSpecificFields = {}

        if(type === 'current' || type === 'passFail') {
            typeSpecificFields = getFieldsForCurrentAndPassFail(row)
        }

        if(type === 'history') {
            typeSpecificFields = getFieldsForHistory(row)
        }
        
        if(type === 'marksheet') {
            typeSpecificFields = {}
        }

        let rowDetails = {
            id              : { value : id, class : 'font-weight-bold' },
            sapid           : row.sapid,
            timeboundId     : row.timeboundId,
            // subject         : { value : row.subject, class : 'font-weight-bold' },
            subject         : { value : row.subject, class : '' },
            term            : row.term,
            acadsMonth      : row.acadsMonth,
            acadsYear       : row.acadsYear,
            examMonth       : row.examMonth,
            examYear        : row.examYear,
            startDate       : row.startDate,
            acadsMonthYear  : { value : `${row.acadsMonth}/${row.acadsYear}`, class : '' },
            examMonthYear   : { value : `${row.examMonth}/${row.examYear}`, class : '' },
            ...typeSpecificFields
        }
        toReturn.push(rowDetails)
    })
    return toReturn
}

export default GenerateTableData

function getFieldsForCurrentAndPassFail(row) {

    let IA      = { value : '-', class : ''}
    let TEE     = { value : '-', class : ''}
    let grace   = { value : '-', class : ''}
    let resit   = { value : '-', class : ''}
    let total   = { value : '-', class : ''}
    let status  = { value : '-', class : ''}

    if(row.showResults === 'Y') {
        
        let isTeeNumber = !isNaN(parseInt(row.teeScore))

        TEE.value = isTeeNumber ? row.teeScore + "/" + row.teeScoreMax : row.teeScore
        TEE.class = isTeeNumber ? row.teeIsPass === 'Y' ? green : red : formatAndReturnMarks(row.teeScore)
        
        if(row.graceMarks){
            grace.value = row.graceMarks
            grace.class = 'font-weight-bold'
        }
        TEE.value = isTeeNumber ? row.teeScore + "/" + row.teeScoreMax : row.teeScore
        TEE.class = isTeeNumber ? row.teeIsPass === 'Y' ? green : red : formatAndReturnMarks(row.teeScore)
        
        if(row.resitScore && row.resitScore !== 0) {
            let isResitNumber = !isNaN(parseInt(row.resitScore))
            resit.value = isResitNumber ? row.resitScore + "/" + row.resitScoreMax : row.resitScore
            resit.class = isResitNumber ? row.resitIsPass === 'Y' ? green : red : formatAndReturnMarks(row.resitScore)
        }

        total.value = row.total + "/" + row.totalMax
        total.class = row.isPass === 'Y' ? green : red

        status.value = row.isPass === 'Y' ? "PASS" : "FAIL"
        status.class = row.isPass === 'Y' ? green : red
    }

    if(row.showResultsForIA === 'Y') {
        IA.value = row.iaScore + "/" + row.iaScoreMax
        IA.class = 'font-weight-bold'
    }
    
    return {
        IA          : IA,
        TEE         : TEE,
        grace       : grace,
        resit       : resit,
        total       : total,
        status      : status,
    }
}

function getFieldsForHistory(row) {
    let TEE     = { value : '-', class : ''}

    let isTeeNumber = !isNaN(parseInt(row.teeScore))

    TEE.value = isTeeNumber ? row.teeScore + "/" + row.teeScoreMax : row.teeScore
    TEE.class = formatAndReturnMarks(row.teeScore)

    return {
        TEE : TEE,
    }
}

function formatAndReturnMarks(marks) {
    switch(marks){
        case 'ANS' : return "course-text-orange font-weight-bold"
        case 'AB' : return "course-text-red font-weight-bold"
        case 'NV' : return "course-text-blue font-weight-bold"
        case 'CC' : return "course-text-green font-weight-bold"
        case 'RIA' : return "course-text-purple font-weight-bold"
        case 'NA' : return "course-text-pink font-weight-bold"
        default : return 'font-weight-bold'
    }
}
