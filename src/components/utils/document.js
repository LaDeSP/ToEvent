import download from 'downloadjs'
import converter from 'json-2-csv'
import dictionary from './dictionary'

export const hasChanges = (changes) => {
    return changes.length === 0 ? true : false
}

export const INITIAL_STATE = {
    databaseDocument: '',
    userDocument: '',
    changes: [],
    user: ''
}

export const getElementOnArrayInReverse = (array, index) => {
    var reverseArray = array.reverse()
    return reverseArray[ index ]
}

export const objectToArray = ( object ) => {
    return Object.values( object )
}

export const isoDateToShortDateWithHours = (dateObject) => {
    let date = new Date( String( dateObject ) )
    let dateShortFormat = date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    let hours = date.getHours() + ':' + date.getMinutes()
    return dateShortFormat + ' ' + hours
}

export const redirectTo = (route) => {
    window.location.replace(route)
}

export const downloadText = (text, file, type) => {
    download(text, file, type);
}

export const downloadCsv = (data, name) => {
    downloadText(data, `${name}.csv`, 'text/csv')
}

export const replaceAll = (text, needle, replacement) => {
    return text.split(needle).join(replacement)
}

export const processingCsv = (csv) => {
    csv = replaceAll(csv, '.', ' ')
    dictionary.forEach(word => {
        csv = replaceAll(csv, word.name, word["PT-BR"])
    })
    return csv
}

export const dataToCsv = (data, callback) => {
    converter.json2csv(data, (err, csv) => {
        if(!err)
            csv = processingCsv(csv)
        callback(err, csv)
    })
}