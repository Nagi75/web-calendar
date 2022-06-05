const weeks = [' 日 ',' 月 ',' 火 ',' 水 ',' 木 ',' 金 ',' 土 ']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth()+1
const config={
    show:1,
}

function showCalendar(year,month){
    for(i=0; i<config.show; i++){
        const calendarHtml = createCalendar(year,month)
        const sec = document.createElement('section')
        sec.innerHTML = calendarHtml

        document.querySelector('#calendar').appendChild(sec)

        month++
        if(month>12){
            year++
            month=1
        }
    }
}

function createCalendar(year,month){
    const startDate = new Date (year,month-1,1)
    const endDate = new Date(year,month,0)
    const endDayCount = endDate.getDate()
    const lastMonthEndDate = new Date(year,month-2,0)
    const lastMonthendDayCount = lastMonthEndDate.getDate()
    const startDay = startDate.getDay()
    let dayCount = 1
    let calendarHtml = ''
    
    calendarHtml += '<h1>' + year + "年" + month + "月" + '</h1>' 
    calendarHtml += '<table>'

    for (let i=0; i<weeks.length; i++){
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }

    for (let w=0; w<6; w++){
        calendarHtml += '<tr>'
            for(let d=0; d<7; d++){
                if(w == 0 && d < startDay){
                    let num = lastMonthendDayCount - startDay + d + 1
                    calendarHtml += '<td class="is-disabled">'+ num +'</td>'
                } else if(dayCount > endDayCount) {
                    let num = dayCount - endDayCount
                    calendarHtml += '<td class="is-disabled">'+ num +'</td>'
                    dayCount++
                } else {
                    calendarHtml += `<td class="calendar_td" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`
                    dayCount++
                }
                
            }
        calendarHtml += '</tr>'  
    }

    calendarHtml += '</table>'
    return calendarHtml  

}

function moveCalendar(e){
    document.querySelector('#calendar').innerHTML=''
    if(e.target.id === 'prev'){
        month--

        if(month<1){
            year--
            month = 12
        }
    }

    if(e.target.id === 'next'){
        month++

        if(month>12){
            year++
            month=1
        }
    }
    showCalendar(year,month)
}

document.querySelector('#prev').addEventListener('click',moveCalendar)
document.querySelector('#next').addEventListener('click',moveCalendar)



document.addEventListener("click",function(e){
    if(e.target.classList.contains("calendar_td")){
        var text = prompt(e.target.dataset.date+'の予定は？')
        var object = document.getElementById("Schedule")
        object.innerHTML = e.target.dataset.date + text
    }
})

showCalendar(year,month)