<template>
    <div class="group">
        <button :class="{'white': whites.indexOf(n) > -1, 'black': blacks.indexOf(n) > -1}" v-for="n in 12" :style="{ left: calcLeft(n) + '%' , visibility:calcDisplay(start+n) }" data-note="{{start+n}}" @click="play(start+n)"><span v-show="n === 0">C</span></button>
    </div>
</template>

<script>
import {notes} from '../notes.js';
import Base64toAB from 'base64-arraybuffer'
import piano from '../piano.js'
const prefix = 'data:audio/mpeg;base64,';
const base = 2;
const keys = 12;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
export default {
    props: {
        group: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            blacks: [1, 3, 6, 8, 10],
            whites: [0, 2, 4, 5, 7, 9, 11]
        }
    },
    computed: {
        start() {
            return this.group * keys;
        }
    },
    methods: {
        play(index) {
            console.log(index);
            piano.play(index);
            //piano.playx();
            /*var audio = new Audio(prefix + notes[index + base]);
            audio.play();*/
            
            /*var source = audioCtx.createBufferSource();
            var data = Base64toAB.decode(notes[index+base]);
            //console.log(prefix+notes[index+base]);
            console.log(data);
            audioCtx.decodeAudioData(data, function(buffer) {  
                 source.buffer = buffer;
                 source.connect(audioCtx.destination);
                 //source.loop = true;
                 source.start(0);
            }); */
            /*var request = new XMLHttpRequest();
            var num = index+21;
            num = '000'+num;
            num = num.substr(num.length-3,3);
            console.log(num);
            var url = 'static/audio'+'/German Concert D '+num+' 083.ogg';
            console.log(url);
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onload = function() {
            var audioData = request.response;
            console.log(audioData);
            console.log(Base64toAB.encode(audioData));
            audioCtx.decodeAudioData(audioData, function(buffer) {
            source.buffer = buffer;
            source.connect(audioCtx.destination);
            source.start(0);
            //source.stop(2);
            //source.loop = true;
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();*/
        },
        calcLeft(index) {
            var unit = 14.29;
            var i = this.blacks.indexOf(index);
            if(i < 2) {
                return unit * (0.75 + i);
            }
            return unit * (1.75 + i);
        },
		calcDisplay(index) {
			if(index<-3||index>84){
			return 'hidden';
			}else{
			return 'visible';
			}
		},
        click(index) {

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .group {
        font-size: 0;
        position: relative;
        display: flex;
        flex-grow: 1;
    }
    button {
        width: 14.29%;
        flex: 1;
        height: 300px;
        display: inline-block;
        border: 1px solid #ccc;
        outline: 0;
        padding: 0;
        box-sizing: border-box;
    }
    button > span {
        position: absolute;
        bottom: 10px;
    }
    .white:active,
    .white.active {
        background: #ececec;
    }
    .white {
        background: #fff;
    }
    .black {
        background: #000;
        border-color: #000;
        height: 150px;
        width: 7.15%;
        position: absolute;
    }
</style>
