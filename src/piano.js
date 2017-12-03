
import {notes} from './notes.js';
import Base64toAB from 'base64-arraybuffer';

var ryhthm = {
    whole: 1,
    dottedHalf: 0.75,
    half: 0.5,
    dottedQuarter: 0.375,
    tripletHalf: 0.33333334,
    quarter: 0.25,
    dottedEighth: 0.1875,
    tripletQuarter: 0.166666667,
    eighth: 0.125,
    dottedSixteenth: 0.09375,
    tripletEighth: 0.083333333,
    sixteenth: 0.0625,
    tripletSixteenth: 0.041666667,
    thirtySecond: 0.03125
};

var noteKeys = {
    'A0': -3,
    'A#0': -2,
    'Bb0': -2,
    'B0': -1,
    'C1': 0,
    'C#1': 1,
    'Db1': 1,
    'D1': 2,
    'D#1': 3,
    'Eb1': 3,
    'E1': 4,
    'F1': 5,
    'F#1': 6,
    'Gb1': 6,
    'G1': 7,
    'G#1': 8,
    'Ab1': 8,
    'A1': 9,
    'A#1': 10,
    'Bb1': 10,
    'B1': 11,
    'C2': 12,
    'C#2': 13,
    'Db2': 13,
    'D2': 14,
    'D#2': 15,
    'Eb2': 15,
    'E2': 16,
    'F2': 17,
    'F#2': 18,
    'Gb2': 18,
    'G2': 19,
    'G#2': 20,
    'Ab2': 20,
    'A2': 21,
    'A#2': 22,
    'Bb2': 22,
    'B2': 23,
    'C3': 24,
    'C#3': 25,
    'Db3': 25,
    'D3': 26,
    'D#3': 27,
    'Eb3': 27,
    'E3': 28,
    'F3': 29,
    'F#3': 30,
    'Gb3': 30,
    'G3': 31,
    'G#3': 32,
    'Ab3': 32,
    'A3': 33,
    'A#3': 34,
    'Bb3': 34,
    'B3': 35,
    'C4': 36,
    'C#4': 36,
    'Db4': 37,
    'D4': 38,
    'D#4': 39,
    'Eb4': 39,
    'E4': 40,
    'F4': 41,
    'F#4': 42,
    'Gb4': 42,
    'G4': 43,
    'G#4': 44,
    'Ab4': 44,
    'A4': 45,
    'A#4': 46,
    'Bb4': 46,
    'B4': 47,
    'C5': 48,
    'C#5': 49,
    'Db5': 49,
    'D5': 50,
    'D#5': 51,
    'Eb5': 51,
    'E5': 52,
    'F5': 53,
    'F#5': 54,
    'Gb5': 54,
    'G5': 55,
    'G#5': 56,
    'Ab5': 56,
    'A5': 57,
    'A#5': 58,
    'Bb5': 58,
    'B5': 59,
    'C6': 60,
    'C#6': 61,
    'Db6': 61,
    'D6': 62,
    'D#6': 63,
    'Eb6': 63,
    'E6': 64,
    'F6': 65,
    'F#6': 66,
    'Gb6': 66,
    'G6': 67,
    'G#6': 68,
    'Ab6': 68,
    'A6': 69,
    'A#6': 70,
    'Bb6': 70,
    'B6': 71,
    'C7': 72,
    'C#7': 73,
    'Db7': 73,
    'D7': 74,
    'D#7': 75,
    'Eb7': 75,
    'E7': 76,
    'F7': 77,
    'F#7': 78,
    'Gb7': 78,
    'G7': 79,
    'G#7': 80,
    'Ab7': 80,
    'A7': 81,
    'A#7': 82,
    'Bb7': 82,
    'B7': 83,
    'C8': 84
}

var piano = (function(){
    var piano = function(){
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.audioData = new Array();
        this.base = 2;
        this.starttime=0; 
        this.meter = 0;
		this.playingNotes = [];
    }
    piano.fn = piano.prototype = {
        init:function(){
            
        },
        loadData:function(){
            var request = new XMLHttpRequest();
            var num = index+21;
            num = '000'+num;
            num = num.substr(num.length-3,3);
            console.log(num);
            var url = 'static/audio'+'/German Concert D '+num+' 083.ogg';
            console.log(url);
            request.open('GET', url,/*'static/audio/German Concert D 040 083.ogg',*/ true);
            request.responseType = 'arraybuffer';
            request.onload = function() {
            var audioData = request.response;
            }
            request.send();
        },
        play:function(index){
            console.log("test"+index);
            var source = this.audioCtx.createBufferSource();
            var data = Base64toAB.decode(notes[index+this.base ]);
            //console.log(prefix+notes[index+base]);
            console.log(data);
            var that = this;
            this.audioCtx.decodeAudioData(data, function(buffer) {  
                 source.buffer = buffer;
                 source.connect(that.audioCtx.destination);
                 //source.loop = true;
               //  source.start();
            });
            music.loadfromJSON();
			player.openSong(music);
			player.start();
        },
        playtest:function(index,time){
            console.log("test"+index+"  "+time);
            var source = this.audioCtx.createBufferSource();
            var data = Base64toAB.decode(notes[index+this.base ]);
            //console.log(prefix+notes[index+base]);
            console.log(data);
            var that = this;
            this.audioCtx.decodeAudioData(data, function(buffer) {  
                 source.buffer = buffer;
                 source.connect(that.audioCtx.destination);
                 //source.loop = true;
                 source.start(time);
            });
        }, 
		playNote:function(Note){
			if(Note.r!='rest'&&Note.r!=''){
				var keys = Note.r.split(',');
				for(var x =0;x<keys.length;x++){
				this.playtest(noteKeys[keys[x]],0);
				}				
			}
			if(Note.l!='rest'&&Note.l!=''){
				var keys = Note.l.split(',');
				for(var x =0;x<keys.length;x++){
				this.playtest(noteKeys[keys[x]],0);
				}	
			}
			/*var that = this;
			for(var i=0;i<Notes.length;i++){
				if(Notes[i].r!='rest'&&Notes[i].r!=''){
					this.playingNotes.push(noteKeys[Notes[i].r);
					
				this.playtest(noteKeys[Notes[i].r],Notes[i].t/1000);
				}
				if(Notes[i].l!='rest'&&Notes[i].l!=''){
				this.playtest(noteKeys[Notes[i].l],Notes[i].t/1000);
				}
				setTimeout(function(){
						that.playtest(noteKeys[Notes[)
					},Notes[i].t);
			}*/
		},
        playx:function(){
            var that =this;
            setInterval(function(){
                var kick = [0,36,36,43,43,45,45,43];
                if(that.starttime==0){
                    that.starttime=new Date().getTime();
                    //that.play(36);
                    that.meter =1;
                }
                var time = new Date().getTime()-that.starttime;
                that.play(kick[that.meter]);
                that.meter++;
            },500);
            //this.playtest(36,0);
            //this.playtest(36,1);
            //this.playtest(43,2);
            //this.playtest(43,3);
            //this.playtest(45,4);
            //this.playtest(45,5);
            //this.playtest(43,6);
        }        
    }
    return new piano();

})();


var music = (function(){
    var music = function(){
        this.timeSignature = [4,4];
        this.tempo = 100;
        //this.instruments = piano;
        this.JsonNotes = {rightHand:"",leftHand:""};
        this.aNotes =[{r:"",l:"",t:""}];    //
        this.remainedNotes = [];
        this.curTimeStamp = 0;
		this.one = null;
		this.timeForOne = null;
		this.timeForSection = null;
		this.rate = null;
    }
    music.fn=music.prototype={
        init:function(){
            
        },
        loadfromIMG:function(){
            
        },
        loadfromJSON:function(jsondata){
            var jsonObj = jsondata;
            /*jsonObj= {
                timeSignature: [4, 4],
                tempo: 120,
                notes: {
                    // Shorthand notation
                rightHand: [
                    'quarter|C4',
                    'quarter|C4',
                    'quarter|G4',
                    'quarter|G4',
                    'quarter|A4',
                    'quarter|A4',
                    'half|G4'
                ],
                    // More verbose notation
                leftHand: [
                    'whole|rest',
                    'quarter|rest',
                    'quarter|rest',
                    'quarter|rest',
                    'quarter|rest',
                    'quarter|rest',
                    'quarter|rest']
                        }
            };*/
			jsonObj ={
	timeSignature : [4, 4],
	tempo : 120,
	notes : {
		// Shorthand notation
			rightHand : [
			'quarter|B3,G4',
			'quarter|B3,G4',
			'quarter|B3,G4',
			'quarter|B3,D4',
			'quarter|C4,E4',
			'quarter|C4,E4',
			'half|D4',
			'quarter|D4,B4',
			'quarter|D4,B4',
			'quarter|D4,A4',
			'quarter|D4,A4',
			'half|D4,G4'			
		],
		// More verbose notation
		leftHand : [
			'quarter|G2',
			'quarter|rest',
			'quarter|B2',
			'quarter|rest',
			'quarter|C3',
			'quarter|rest',
			'quarter|B2',
			'quarter|G2',
			'quarter|D3',
			'quarter|rest',
			'quarter|F3',
			'quarter|rest',
			'quarter|G3',
			'quarter|D3'
			]
	}
};
            if(typeof jsondata =="string"){
                jsonObj = JSON.parse(jsondata);
            }
            if(typeof jsonObj =="object"){
                this.timeSignature = jsonObj["timeSignature"];
                this.tempo = jsonObj["tempo"];
                this.JsonNotes = jsonObj["notes"];
                this.aNotes = this.Json2aNote();
				this.remainedNotes = this.aNotes;
            }    
        },
        Json2aNote:function(){
            var Notes = new Array();
            var r,l,t,rt,lt;
            r = this.JsonNotes.rightHand;
            l = this.JsonNotes.leftHand;
            t = 1000; //ms
            rt = 1000;
            lt = 1000;
            
            //一拍的 时间 
            if(this.timeSignature[1] ==4){
                this.one ="quarter";
            }
            this.timeForOne = 60000/this.tempo; //ms
            this.rate = this.timeForOne/ryhthm[this.one];
			this.timeForSection = this.timeForOne*this.timeSignature[0];
            console.log(this.rate);
            
            var len = Math.max(r.length,l.length);
            console.log(len);
            console.log(r);
            console.log(l);
            while(r.length||l.length){
				if(r.length==0){rt = lt+100;}
				if(l.length==0){lt = rt+100;}
                if(rt==lt){
                    var tempr = ['',''];
					var templ = ['',''];
					if(r.length)
					{ 
						tempr = r.shift().split("|");
						rt = ryhthm[tempr[0]]*this.rate + t;
					}
                    if(l.length){
						templ = l.shift().split("|");
						lt = ryhthm[templ[0]]*this.rate + t;
					}	
                    var obj = {'r':tempr[1],'l':templ[1],'t':t};
                    Notes.push(obj/*{'t':tempr[1],'l':templ[1],'t':t}*/);
                    t = Math.min(rt,lt);
                    //console.log(Notes);
                }else{
                    var temp = ['',''];
                    var obj;
                    if(rt<lt){
						if(r.length){
                        temp = r.shift().split("|");
                        rt = ryhthm[tempr[0]]*this.rate + t; 
						}                       
                        obj = {'r':temp[1],'l':'','t':t};
                        Notes.push(obj);
                        t = Math.min(rt,lt);
                    }else{
						if(l.length){
                        temp = l.shift().split("|");
                        lt = ryhthm[templ[0]]*this.rate + t;
						}
                        obj = {'r':'','l':temp[1],'t':t};
                        Notes.push(obj);
                        t = Math.min(rt,lt);
                    }
                }
            }
            /*for(int i =0;i<len);i++){
                if(i==0){
                    var tempr = r[0].split("|");
                    var templ = l[0].split("|");
                }
            }*/
            //while(rightHand.
            console.log(Notes);
			/*piano.playtest(noteKeys["C4"],1.5);
			piano.playtest(noteKeys["C4"],2);
			piano.playtest(noteKeys["G4"],2.5);
			piano.playtest(noteKeys["G4"],3);
			piano.playtest(noteKeys["A4"],3.5);
			piano.playtest(noteKeys["A4"],4);
			piano.playtest(noteKeys["G4"],4.5);*/
            return Notes;
        }
    }
    return new music();
})();



var player = (function(){
    var player = function(){
        this.instruments = piano;
        this.song = null;
        this.EventListener=null;
        this.currentTime = 0;
        this.playLoop = null;
		this.playandPause = 0;
		this.playingNotes = [];
		this.st =0;
    }
    player.fn=player.prototype={
        init:function(music){
            //this.instruments.init();
            //this.song.init();
            this.instrumments.init();
            if(music){
            this.openSong(music);
            }
        },
        openSong:function(music){
            this.song = music;
        },
        start:function(){
            //start
			var that = this;
			this.playandPause =1;
            this.playLoop = setTimeout(function(){
                that.playerSolve();
            },this.song.timeForSection);
            
        },
		findNewNotes:function(){
			if(this.song.remainedNotes.length){
			//console.log(this.song);
			    var note = this.song.remainedNotes.shift();
				this.playingNotes.push(note);
				var that = this;
				setTimeout(function(){
					var note = that.playingNotes.shift();
					that.playNote(note);
					that.findNewNotes();
				},note.t-that.st);
				this.st = note.t;
			}
		},
		playNote:function(note){
			piano.playNote(note);
		},
        playerSolve:function(){
			var Notes = this.findNewNotes();
        },
        pause:function(){
            this.playandPause =0;
        },
        stop:function(){
            
        },
        
        loadfromJSON:function(){
            
        },
        
    }
    return new player();
})();


module.exports = piano;