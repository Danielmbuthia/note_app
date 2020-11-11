const chalk = require('chalk');
const fs = require('fs');

const getNotes = ()=> { 
    return 'your notes update';
}

const addNotes  = (title,body)=>{
     const notes = loadNotes();
     const duplicateNotes = notes.filter((note)=>{
         return note.title === title;
     })
     if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
      saveNotes(notes)
      console.log('added')
     }else{
         console.log('title taken')
     }
    
}

const saveNotes = (notes) =>{
     const jsonData = JSON.stringify(notes);
     fs.writeFileSync('notes.json',jsonData)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const jsonData = dataBuffer.toString();
        return JSON.parse(jsonData);
    }catch(e){
         return [];
    }
}

const removeNote = (title)=>{
    const notes = loadNotes();
    const remainingNotes = notes.filter((note)=>{
        return note.title !== title
    })
    saveNotes(remainingNotes)
    if(notes.length === remainingNotes.length){
        console.log(chalk.red('No note with that title'))
    }else{
        console.log(chalk.green('Note removed'))
    }
}
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}
module.exports = {
    getNotes,
    addNotes,
    removeNote,
    listNotes,
    readNote
}