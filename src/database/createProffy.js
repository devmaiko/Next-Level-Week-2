//logica de inserir dados no banco
module.exports =  async function(db, {proffyValue, classValue, classScheduleValues}) {
    //inserir dados na table de teachers
    //so consigo inserir apos ter o id
    //essa linha aguarda para ser executada
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );

    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na table classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)
    const class_id = insertedClass.lastID

    //inserir dados na table class schedule
    //mapear o array
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValues) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to

            ) VALUES (
                "${class_id}",
                "${classScheduleValues.weekday}",
                "${classScheduleValues.time_from}",
                "${classScheduleValues.time_to}"
            );
        `)
    })

    //aqui vou executar todos os DBRUNS DAS CLASS_SCHEDULES

    await Promise.all(insertedAllClassScheduleValues)
}