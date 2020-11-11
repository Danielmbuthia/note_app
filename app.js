var validator = require('validator');
var chalk =require('chalk');
var yargs = require('yargs');
var notes = require('./notes');


yargs.command({
    command:'add',
    describe:'add new note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'note body',
            demandOption:true ,
            type:'string'
        }
    },
    handler:function(argv){
        notes.addNotes(argv.title,argv.body)
    }
});

yargs.command({
    command:'remove',
    describe:'remove a note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
       notes.removeNote(argv.title);
    }
});

yargs.command({
    command:'list',
    describe:'list all notes',
    handler:function(){
        notes.listNotes()
    }
});

yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(){
        console.log(yargs.argv.title)
    }
});
yargs.parse()