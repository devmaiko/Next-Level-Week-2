//criando os professor fazendo estruturacao de dados
//dados
//chamamos o banco de dados
const Database = require('./database/db')

const { subjects, weekdays, getSubject, converHoursToMinutes } = require('./utils/format')
//funcionalidades
function pageLanding(req, res) {
    /*puxando o html*/
    //agora vai renderizar com nunjucks
    //era assim return res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html")
}

async function pageStudy(req, res) {
    //mandar os filtros para dentro 
    const filters = req.query
    //qualquer um desses que for vazio ele entra aqui
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays });
    }

    //converter horas em minutos

    const timeToMinutes = converHoursToMinutes(filters.time)


    const query =
        `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekdays}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    //caso haja erro na hora da consulta do bd
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map(() =>{
            proffys.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })


    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res) {

    return res.render("give-classes.html", { subjects, weekdays })

}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        vio: req.body.bio
    }
    const classValue = {
        subject: req.body.subject,
        subject: req.body.cost

    }
    const classScheduleValues = req.body.weekday.map((weekday, index) =>{

        return {
            weekday,
            time_from: converHoursToMinutes(req.body.time_from[index]),
            time_to: converHoursToMinutes(req.body.time_to[index])
        }
    })

    
    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})


        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday" + req.body.weekday[0]
        queryString += "&time" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(erro)
    }

}


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}