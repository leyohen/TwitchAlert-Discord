const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();

const Client_ID = process.env.CLIENT_ID_TWITCH ; //TWITCH CLIENT_ID
const webhook_ID1 = process.env.WEBHOOK_ID1 ;
const webhook_ID2 =  process.env.WEBHOOK_ID2;
const webhook_TOKEN1 =  process.env.WEBHOOK_TK;
const webhook_TOKEN2 = process.env.WEBHOOK_TK2;

const hook = new Discord.WebhookClient('webhook_ID1', 'webhook_TOKEN1');
const hook2 = new Discord.WebhookClient('webhook_ID2', 'webhook_TOKEN2');

//var ID_kraoki = "49041281";
//var ID_leyohen = "129964618";

let VarChoosenStreamer ;
let streamData=null ;

var StreameursToFocusOn =  [
  {name:"Kraoki",ID:"49041281",streamdata:"",streamstatut:"offline",webhook:hook},{name:"willokhlass",ID:"185261350",streamdata:"",streamstatut:"offline",webhook:hook2}
  ];

let StreamerID ;
let options = {
  url: 'https://api.twitch.tv/kraken/streams/'+VarChoosenStreamer,
  headers: {
    'Client-ID': Client_ID ,'Accept':'application/vnd.twitchtv.v5+json'
  }
};

function sleep(milliseconds) { // Permet de creer un temps de pause dans la function
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
	
function CheckIfLive(ChoosenStreamer){ 

 options = {
  url: 'https://api.twitch.tv/kraken/streams/'+ChoosenStreamer,
  headers: {
    'Client-ID': Client_ID ,'Accept':'application/vnd.twitchtv.v5+json'
  }
};
	
	function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
  	StreamerID = StreameursToFocusOn.find(el => el.ID === ChoosenStreamer);
    var info = JSON.parse(body);
    streamData = info;
    StreamerID["streamdata"]=streamData.stream;

	  
	if(StreamerID["streamdata"]!==null & StreamerID["ID"]==ChoosenStreamer){
			
			if(StreamerID["streamstatut"]=="offline"){
				console.log(StreamerID["name"]+" viens de commencer un stream !");
				StreamerID["webhook"].send(StreamerID["name"]+'est maintenant en stream https://twitch.tv/'+StreamerID["name"]);
				StreamerID["streamstatut"]="online";
			}
			StreamerID["streamstatut"]="online";
			console.log(StreamerID["name"]+" est en stream");
			
		}else{

			if(StreamerID["streamstatut"]=="online" & StreamerID["ID"]==ChoosenStreamer){
				StreamerID["streamstatut"] = "offline";
				console.log("Viens d'arreter de stream");
				sleep(120000);
				
			}
			console.log(StreamerID["name"]+" pas en stream");
			StreamerID["streamstatut"] ="offline";
		}
	  }
	}

	request(options, callback);	
 	
 }

  var newData;
  setInterval(function() {CheckIfLive(StreameursToFocusOn[0].ID); }, 1500); //Kraoki
  setInterval(function() {CheckIfLive(StreameursToFocusOn[1].ID);}, 1500); //Yohen










 
