export const tabs = [
    { key: 'select-subjects',       id : 0, label : 'Select Subjects'        },
    { key: 'select-payment-option', id : 1, label : 'Select Payment Options' },
    { key: 'submit-form',           id : 2, label : 'Payment'                },
]

export function getIdByKey(key) {
    for (var index in tabs) {
        if(tabs[index].key === key) {
            return tabs[index].id
        }
    }
}

export function getLabelForTabByKey(key) {
    for (var index in tabs) {
        if(tabs[index].key === key) {
            return tabs[index].label
        }
    }
}

export function getLabelForTabById(id) {
    for (var index in tabs) {
        if(tabs[index].id === id) {
            return tabs[index].label
        }
    }
}


export function nextButtonText(currentTab) {
    if(currentTab == getIdByKey('confirm-selection')) {
        return 'Confirm'
    } else if(currentTab >= getIdByKey('select-payment-option')) {
        return 'Proceed to Payment Gateway'
    } else {
        return 'Next'
    }
}

export function previousButtonDisabled(currentTab) {
    var enabled = true
    if(currentTab == getIdByKey('select-subjects') || currentTab > getIdByKey('submit-form')) {
        enabled = false
    }
    return !enabled
}

export function nextButtonDisabled(currentTab, selectedSubjects, selectedPaymentProvider) {
    
    var enabled = true
    let subjectsSelected = selectedSubjects.length > 0 && !selectedSubjects.length <= 2
    
    let slotsSelected = true
    selectedSubjects.forEach((subject) => {
        if(!subject.slot) {
            slotsSelected = false
        }
    })

    let providerSelected = selectedPaymentProvider ? true : false

    if(currentTab >= getIdByKey('select-subjects')) {
        enabled = enabled && subjectsSelected
    }
    if(currentTab >= getIdByKey('select-payment-option')) {
        enabled = enabled && providerSelected
    }
    if(currentTab >= getIdByKey('submit-form')) {
        enabled = false
    }
    return !enabled
}