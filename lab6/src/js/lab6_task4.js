var dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015

export function DaysBeforeNextBday(bdayDate){
    console.log('<-----TASK4----->')
    const bdayParts = bdayDate.split('T');
    let now = dayjs()
    let ThisYearBday = dayjs(bdayParts[0]).year(now.year())
    let dif = ThisYearBday.diff(now , 'day')

    if (dif < 0){
        dif = 365 + dif
    }

    console.log(ThisYearBday.toString())
    console.log(now.toString())


    console.log('Days until next birthday ' + dif)

    return dif
}
