var main = Titanium.UI.createWindow({
    backgroundImage:'images/background2.png',
    navBarHidden: true
});

var tmpMain = Ti.Platform.displayCaps.platformHeight/40;

var Admob = require('ti.admob');

// check if google play services are available
var code = Admob.isGooglePlayServicesAvailable();
if (code != Admob.SUCCESS) {
    alert("Google Play Services is not installed/updated/available");
}
var adMobView = Admob.createView({
    publisherId:"ca-app-pub-9226003243438781/4925266358",
    testing:false, // default is false
    //top: 10, //optional
    //left: 0, // optional
    //right: 0, // optional
    bottom: 0, // optional
    adBackgroundColor:"FF8855", // optional
    backgroundColorTop: "738000", //optional - Gradient background color at top
    borderColor: "#000000", // optional - Border color
    textColor: "#000000", // optional - Text color
    urlColor: "#00FF00", // optional - URL color
    linkColor: "#0000FF" //optional -  Link text color
    //primaryTextColor: "blue", // deprecated -- now maps to textColor
    //secondaryTextColor: "green" // deprecated -- now maps to linkColor
    
});
//listener for adReceived
adMobView.addEventListener(Admob.AD_RECEIVED,function(){
   // alert("ad received");
   Ti.API.info("ad received");
});

//listener for adNotReceived
adMobView.addEventListener(Admob.AD_NOT_RECEIVED,function(){
    //alert("ad not received");
     Ti.API.info("ad not received");
});

main.add(adMobView);
var clickStart = Titanium.Media.createSound({
	url: 'sounds/chalkTwo.mp3',
	preload: true
});

var clickSingh = Titanium.Media.createSound({
	url: 'sounds/chalkOne.mp3',
	preload: true
});

var youWin = Titanium.Media.createSound({
	url: 'sounds/win.mp3',
	preload: true
});
var mainLabel = Ti.UI.createLabel({
	text: L("app_name"),
	top: '2%',
	color: '#F5821F',
	font:{
		fontSize: "40sp",
		fontFamily: "BuxtonSketch",
		},
	textAlign:'center',
});
main.add(mainLabel);

var viewStart = Ti.UI.createView({
	top: "30%",
	left:"25%",
	width: "50%",
	height:"20%",
	
});
main.add(viewStart);
var buttonStart = Titanium.UI.createButton({
    title:'',
    top: "1%",
	left:0,
    width:"100%",
    height:"100%",
    backgroundImage:L('startW'),
    backgroundSelectedImage:L('startG'),
});
viewStart.add(buttonStart);

var data = [
			    {first: "9", second: "1", third: "1", fourth: "0", answer: "7"},
			    {first: "5", second: "4", third: "2", fourth: "0", answer: "7"},
			    {first: "7", second: "3", third: "4", fourth: "0", answer: "6"},
			    {first: "4", second: "9", third: "6", fourth: "0", answer: "1"},
			    {first: "8", second: "3", third: "6", fourth: "0", answer: "5"},
			    {first: "7", second: "8", third: "5", fourth: "0", answer: "10"},
			    {first: "11", second: "3", third: "8", fourth: "0", answer: "16"},
			    {first: "9", second: "4", third: "7", fourth: "0", answer: "12"},
			    {first: "14", second: "9", third: "2", fourth: "0", answer: "25"},
			    {first: "3", second: "16", third: "7", fourth: "0", answer: "12"},
			    {first: "12", second: "16", third: "19", fourth: "0", answer: "15"},
			    {first: "2", second: "4", third: "1", fourth: "3", answer: "4"},
			    {first: "7", second: "3", third: "5", fourth: "8", answer: "7"},
			    {first: "4", second: "6", third: "3", fourth: "5", answer: "2"},
			    {first: "8", second: "5", third: "3", fourth: "9", answer: "7"},
			    {first: "3", second: "7", third: "2", fourth: "3", answer: "1"},
			    {first: "5", second: "9", third: "4", fourth: "7", answer: "11"},
			    {first: "9", second: "5", third: "8", fourth: "3", answer: "15"},
			    {first: "11", second: "6", third: "14", fourth: "3", answer: "16"},
			    {first: "7", second: "15", third: "6", fourth: "4", answer: "24"},
			    {first: "17", second: "12", third: "19", fourth: "4", answer: "20"},
			    {first: "12", second: "3", third: "8", fourth: "0", answer: "12"},
			    {first: "23", second: "3", third: "6", fourth: "0", answer: "5"},
			    {first: "4", second: "6", third: "3", fourth: "0", answer: "8"},
			    {first: "5", second: "12", third: "6", fourth: "0", answer: "10"},
			    {first: "14", second: "6", third: "2", fourth: "0", answer: "2"},
			    {first: "8", second: "15", third: "4", fourth: "0", answer: "30"},
			    {first: "14", second: "12", third: "28", fourth: "0", answer: "6"},
			    {first: "4", second: "6", third: "7", fourth: "2", answer: "25"},
			    {first: "26", second: "12", third: "3", fourth: "6", answer: "16"},
			    {first: "8", second: "34", third: "51", fourth: "3", answer: "25"},
			    {first: "5", second: "14", third: "26", fourth: "2", answer: "18"},
			    {first: "82", second: "2", third: "6", fourth: "7", answer: "38"},
			    {first: "78", second: "26", third: "14", fourth: "6", answer: "7"},
			    {first: "44", second: "4", third: "16", fourth: "5", answer: "55"},
			    {first: "121", second: "11", third: "6", fourth: "33", answer: "2"},
			];	
			var labelLevel = [];
 //////////Nachalo levels
 
buttonStart.addEventListener('click', function(){
	clickStart.play();
	var winLevels = Ti.UI.createWindow({
		backgroundImage:'images/background.png',	
	});
			
	if (Ti.UI.Android){
		winLevels.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}
	
	function createRow(i) {
		
		if(!Ti.App.Properties.hasProperty(i)) { 
			Ti.App.Properties.setString(i, 'images/numbers/'+ (i+1) +'.png');
		}
		
		var row = Ti.UI.createView({
			width: "25%", 
			height: "100dp",
			top: 0, left: 0,
			level: i
		});
		
		labelLevel[i] = Titanium.UI.createButton({
			top: '10%', left: '10%',
			width: '80%', height: '80%',
			backgroundImage:Ti.App.Properties.getString(i),
    		backgroundSelectedImage:'images/numbers/'+ (i+1) +'G.png',
			
		});
		row.add(labelLevel[i]);
		
		//////////////Nachalo igru
		row.addEventListener('click', function(){
			clickStart.play();
			levelfunc(i);
		});
		
		return row;
	}
			
						
	var scrollView = Ti.UI.createScrollView({
		top:70,
		bottom:50,
		horizontalWrap:true,
		height : Ti.UI.SIZE,
    	width : "100%",
		contentHeight: 'auto',
		contentWidth:'100%',
		showVerticalScrollIndicator:true,
		//contentWidth:Ti.Platform.displayCaps.platformWidth,
		layout: 'horizontal'
	});
			
	for(var i = 0; i < 36; i++){
		var row = createRow(i);
		scrollView.add(row);
		
	}
	winLevels.add(scrollView);
	
	var labelCommercial = Ti.UI.createLabel({
		text: '',
		textAlign: 'center',
		bottom:0,
		color: "white",
		width: Titanium.UI.FILL, height:50
	});
	winLevels.add(labelCommercial);	
	
		var adMobView2 = Admob.createView({
		    publisherId:"ca-app-pub-9226003243438781/4925266358",
		    testing:false, // default is false
		    //top: 10, //optional
		    //left: 0, // optional
		    //right: 0, // optional
		    bottom: 0, // optional
		    adBackgroundColor:"FF8855", // optional
		    backgroundColorTop: "738000", //optional - Gradient background color at top
		    borderColor: "#000000", // optional - Border color
		    textColor: "#000000", // optional - Text color
		    urlColor: "#00FF00", // optional - URL color
		    linkColor: "#0000FF" //optional -  Link text color
		    //primaryTextColor: "blue", // deprecated -- now maps to textColor
		    //secondaryTextColor: "green" // deprecated -- now maps to linkColor
		    
		});
		//listener for adReceived
		adMobView2.addEventListener(Admob.AD_RECEIVED,function(){
		   // alert("ad received");
		   Ti.API.info("ad received");
		});
		
		//listener for adNotReceived
		adMobView2.addEventListener(Admob.AD_NOT_RECEIVED,function(){
		    //alert("ad not received");
		     Ti.API.info("ad not received");
		});
		
		winLevels.add(adMobView2);
		
	var label = Ti.UI.createLabel({
		text: L("levels"),
		textAlign: 'center',
		top:0,
		color: "white",
		font:{fontSize: "30sp", fontFamily: "BuxtonSketch"},
		width: Titanium.UI.FILL, height:50
	});
	winLevels.add(label);
	
	
    var buttonMenu = Titanium.UI.createButton({
        title:'',
		width: "14%",
		height: "10%",
		left: "2%",
		top: "2%",
		backgroundImage: "images/backCirkleW.png",
    	backgroundSelectedImage: "images/backCirkleG.png",
    });
   	winLevels.add(buttonMenu);
    buttonMenu.addEventListener('click',function()
    {
        winLevels.close();
    });
    winLevels.open();
});
function levelfunc(i){
				var winGame = Ti.UI.createWindow({
					backgroundImage:'images/background3.png',
				});
					var adMobView3 = Admob.createView({
					    publisherId:"ca-app-pub-9226003243438781/4925266358",
					    testing:false, // default is false
					    //top: 10, //optional
					    //left: 0, // optional
					    //right: 0, // optional
					    bottom: 0, // optional
					    adBackgroundColor:"FF8855", // optional
					    backgroundColorTop: "738000", //optional - Gradient background color at top
					    borderColor: "#000000", // optional - Border color
					    textColor: "#000000", // optional - Text color
					    urlColor: "#00FF00", // optional - URL color
					    linkColor: "#0000FF" //optional -  Link text color
					    //primaryTextColor: "blue", // deprecated -- now maps to textColor
					    //secondaryTextColor: "green" // deprecated -- now maps to linkColor
					    
					});
					//listener for adReceived
					adMobView3.addEventListener(Admob.AD_RECEIVED,function(){
					   // alert("ad received");
					   Ti.API.info("ad received");
					});
					
					//listener for adNotReceived
					adMobView3.addEventListener(Admob.AD_NOT_RECEIVED,function(){
					    //alert("ad not received");
					     Ti.API.info("ad not received");
					});
					
					winGame.add(adMobView3);
					
				if(i == 0){
					var hintView = Ti.UI.createView({
						backgroundImage : 'images/help-01.png',
					});
					var buttonHint = Ti.UI.createButton({
				   		title:'',
				   		bottom: "10%",
				   		right:"5%",
				   		width: "30%",
				   		height: "15%",
				   		backgroundImage:'images/buttonOk.png',
				   		backgroundSelectedImage:'images/buttonOk.png',

					});
					buttonHint.addEventListener('click', function(e){
						hintView.hide();
					});
					hintView.add(buttonHint);
					winGame.add(hintView);
				} else if(i == 21){
					var hintView2 = Ti.UI.createView({
						backgroundImage : 'images/help2-01.png',
					});
					var buttonHint2 = Ti.UI.createButton({
				   		title:'',
				   		bottom: "10%",
				   		right:"5%",
				   		width: "30%",
				   		height: "15%",
				   		backgroundImage:'images/buttonOk.png',
				   		backgroundSelectedImage:'images/buttonOk.png',

					});
					buttonHint2.addEventListener('click', function(e){
						hintView2.hide();
					});
					hintView2.add(buttonHint2);
					winGame.add(hintView2);
				}
				
				
				var levelLabel = Ti.UI.createLabel({
					text: i + 1 + " " + L("level"),
					textAlign: 'center',
					top:"5%",
					width: Titanium.UI.FILL, 
					height:"10%",
					color:"white",
					font:{
						fontSize: "30sp",
						fontFamily: "BuxtonSketch",
					},
					
				});
				winGame.add(levelLabel);
				
				
				if(i > 10 && i < 21 || i > 27){
					var tmpfont = "40sp";
					var leftS1 = "18%"; 
					var leftN2 = "29%";
					var leftS2 = "45%";
					var leftN3 = "56%";
					var leftS3 = "72%";
					var leftN4 = "83%";
					var widthN1 = "16%";
					var widthS1 = "11%";
					
				}else {
					var tmpfont = "50sp";
					var leftS1 = "26%"; 
					var leftN2 = "38%";
					var leftS2 = "62%";
					var leftN3 = "74%";
					var leftS3 = "60%";
					var leftN4 = "80%";
					var widthN1 = "24%";
					var widthS1 = "12%";
				}
				var labelNumber1 = Ti.UI.createLabel({
					text: data[i].first,
					top:"30%",
					left: 0,
					textAlign: 'center',
					width: widthN1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				var labelSign1 = Ti.UI.createLabel({
					text: "?",
					top:"30%",
					left: leftS1,
					textAlign: 'center',
					width: widthS1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				var labelNumber2 = Ti.UI.createLabel({
					text: data[i].second,
					top:"30%",
					left: leftN2,
					textAlign: 'center',
					width: widthN1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				var labelSign2 = Ti.UI.createLabel({
					text: "?",
					top:"30%",
					left: leftS2,
					textAlign: 'center',
					width: widthS1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				var labelNumber3 = Ti.UI.createLabel({
					text: data[i].third,
					top:"30%",
					left: leftN3,
					textAlign: 'center',
					width: widthN1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				var labelSign3 = Ti.UI.createLabel({
					text: "?",
					top:"30%",
					left: leftS3,
					textAlign: 'center',
					width: widthS1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				var labelNumber4 = Ti.UI.createLabel({
					text: data[i].fourth,
					top:"30%",
					left: leftN4,
					textAlign: 'center',
					width: widthN1,
					color: 'white',
					font:{
						fontSize: tmpfont,
						fontFamily: "Sketch",
					},
				});
				
				
				var labelEquel= Ti.UI.createLabel({
					text: "= " + data[i].answer,
					top:"50%",
					color: "white",
					textAlign: 'center',
					font:{
						fontSize: "50sp",
						fontFamily: "Sketch",
					},
				});
	
	
				labelSign1.addEventListener('click',function(e){
				clickSingh.play();
				if(e.source.text == '?'){
					e.source.text="+";
				}
				if(i < 21){
					switch(e.source.text){
					        case "+":e.source.text="-";
					        break;
					        case "-":e.source.text="+";
					        break;
					}
				}else{
					switch(e.source.text){
					        case "+":e.source.text="-";
					        break;
					        case "-":e.source.text="*";
					        break;
					        case "*":e.source.text="/";
					        break;
					        case "/":e.source.text="+";
					        break;
					}
				}
					
					
				});
				
				labelSign2.addEventListener('click',function(e){
					clickSingh.play();
					if(e.source.text == '?'){
						e.source.text="+";
					}
					if(i < 21){
						switch(e.source.text){
						        case "+":e.source.text="-";
						        break;
						        case "-":e.source.text="+";
						        break;
						}
					}else{
						switch(e.source.text){
						        case "+":e.source.text="-";
						        break;
						        case "-":e.source.text="*";
						        break;
						        case "*":e.source.text="/";
						        break;
						        case "/":e.source.text="+";
						        break;
						}
					}
				});
				
				labelSign3.addEventListener('click',function(e){
					clickSingh.play();
					if(e.source.text == '?'){
						e.source.text="+";
					}
					if(i < 21){
						switch(e.source.text){
						        case "+":e.source.text="-";
						        break;
						        case "-":e.source.text="+";
						        break;
						}
					}else{
						switch(e.source.text){
						        case "+":e.source.text="-";
						        break;
						        case "-":e.source.text="*";
						        break;
						        case "*":e.source.text="/";
						        break;
						        case "/":e.source.text="+";
						        break;
						}
					}
				});
				
				var answerButton = Ti.UI.createButton({
					title: '',
				   	bottom: "25%",
				   	width: "30%",
				   	height: "15%",
				   	backgroundImage:L('checkW'),
    				backgroundSelectedImage: L('checkG'),
				});
					winGame.add(labelNumber1);
					winGame.add(labelSign1);
					winGame.add(labelNumber2);
					winGame.add(labelSign2);
					winGame.add(labelNumber3);
					
					
				if(i > 10 && i < 21 || i > 27) {
					winGame.add(labelSign3);
					winGame.add(labelNumber4);
				}
					winGame.add(labelEquel);
					winGame.add(answerButton);
				
				
				
				answerButton.addEventListener('click', function(e){
					if(i > 10 && i < 21 || i > 27) {
						if(!(labelSign1.text == "?" || labelSign2.text == "?" || labelSign3.text == "?")){
							var firstAnswer = eval(data[i].first + labelSign1.text + data[i].second +labelSign2.text + data[i].third +labelSign3.text+ data[i].fourth);
						}
					}else {
						if(!(labelSign1.text == "?" || labelSign2.text == "?")){
							var firstAnswer = eval(data[i].first + labelSign1.text + data[i].second +labelSign2.text + data[i].third);
						}
					}
					var alertDial = Ti.UI.createAlertDialog({
						title : L("win") + " " + (((i+1)*2.78).toFixed(2)) + "%!",
						buttonNames: [L("cancel"), L("levels"), L("nextlevel")],
						cancel: 0
					});
					
					var alertDialWrong = Ti.UI.createAlertDialog({
						title : L("wrong"),
						buttonNames: [L("try1")],
						cancel: 0
					});
					
					alertDial.addEventListener('click', function(e){
						if (e.index == 1){
							winGame.close();
						} else if (e.index == 2){
							winGame.close();
							levelfunc(i+1);
						}
					});
					
					if (firstAnswer == data[i].answer){
						var n = i+1;
						youWin.play();
						//changeImg(i);
						labelLevel[i].backgroundImage = 'images/numbers/'+ n +'G.png';
						Ti.App.Properties.setString(i, 'images/numbers/'+ n +'G.png');
						alertDial.show();
						
					}else {
						alertDialWrong.show();
					}
					
				});
				
				var buttonLevels = Titanium.UI.createButton({
		        	title:'',
		        	width: "30%",
				   	height: "15%",
		        	bottom: "10%",
		        	backgroundImage:L('backW'),
    				backgroundSelectedImage: L('backG'),
		    	});
		   		winGame.add(buttonLevels);
		    	buttonLevels.addEventListener('click',function(){
		       		winGame.close();
		    	});
		    	winGame.open();
			}
var viewAbout = Ti.UI.createView({
	top: "60%",
	left:"25%",
	width: "50%",
	height:"20%",
	
});
main.add(viewAbout);

var buttonAbout = Titanium.UI.createButton({
    title:'',
    top: "1%",
	left:0,
    width:"100%",
    height:"100%",
    backgroundImage: L('aboutW'),
    backgroundSelectedImage: L('aboutG'),

});
viewAbout.add(buttonAbout);

buttonAbout.addEventListener('click', function(){
	var winAbout = Ti.UI.createWindow({
		backgroundImage:'images/background.png',
	});
	
	var imageAbout = Ti.UI.createImageView({
		image: "images/about.png",
		width: "90%",
		top: "20%"
	});
	winAbout.add(imageAbout);
	
	var buttonMenu = Titanium.UI.createButton({
        title:'',
		width: "30%",
		height: "15%",
		bottom: "5%",
		backgroundImage:L('backW'),
    	backgroundSelectedImage: L('backG'),
    });
   	winAbout.add(buttonMenu);
   	
    buttonMenu.addEventListener('click',function()
    {
        winAbout.close();
    });
    winAbout.open();
	
});


main.open();
