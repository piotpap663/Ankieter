// Początkowe ankiety dostępne na początku dla
// każdego użytkownika
//Można wprowadzać nowe pola oraz edytować dotychczasowe
var dane = [{
    "Nazwa_ankiety": "Ankieta 1",
    "Nr_ankiety": 0,
    "adres": "Gliwice, ul.Akademicka 1 44-122 Gliwice",
    "telefon": 325659123,
    "NIP": 659846315,
    "REGON": 368215349,
    "Osoby_kontaktowe": "Jan",
    "email": "politechnik@op.pl",
    "oprogramowanie_biurowe": "Microsoft Office",
    "ocena_poziomu_technicznego": 5,
    "ocena_przydatnosci_oprogramowania": 4.5,
    "ocena_wydajnosci_oprogramowania": 4
}, {
    "Nazwa_ankiety": "Ankieta 2",
    "Nr_ankiety": 1,
    "adres": "Zabrze, ul. Zabrzańskiego 2",
    "telefon": 356214357,
    "NIP": 958123457,
    "REGON": 365742157,
    "Osoby_kontaktowe": "Zygmunt",
    "email": "pozabor@op.pl",
    "oprogramowanie_biurowe": "Libre Office",
    "ocena_poziomu_technicznego": 5,
    "ocena_przydatnosci_oprogramowania": 4,
    "ocena_wydajnosci_oprogramowania": 4.5
}];
window.onload = function() {
        showMenu();
        closeSurvey();
    }
    //Stworzenie 3 początkowych userów
var PIOTR = JSON.parse(JSON.stringify(dane));
var JOHN = JSON.parse(JSON.stringify(dane));
var JACEK = JSON.parse(JSON.stringify(dane));
//rozwiazanie problemu przy usuwaniu usera, przez użycie
//zmiennej globalnej
var nazwauseradozmiany = "";
//globalna tablica userów
var users = ["PIOTR", "JOHN", "JACEK"];
var x = JSON.parse(JSON.stringify(dane));
//rozwiązanie problemu przy usunięciu wszystkich ankiet
var tempobject = x[0];
//rozwiązanie problemu przy pokazywaniu ankiet
// zmiana przy kliknięciu jednej z ankiety
var ktoraankietakliknieta = -1;

//Pokaż panel administratora
function showMenu() {
    if (document.getElementById("yamakasa")) {
        document.getElementById("yamakasa").outerHTML = "";
    }
    var dorysuj = '<div id="yamakasa">Panel administratora<div id="menuadmin"><span class="username" onclick="showChart()">Pokaż statystyki</span></div><div id="menuadmin"><span class="windowtext">Wybierz użytkownika</span></div>' +
        '<div id="choose" class="userwindow"></div>' +
        '<div id="menuadmin"><span class="windowtext">Dodaj użytkownika</span></div>' +
        '<div class="userwindow">' +
        '<div  class="user"><input id="newuser" type="text" ></input><button style="margin-left:2%;" onclick="createUser()">Dodaj</button></div>' +
        '</div>';
    document.body.innerHTML += dorysuj;
    document.getElementById('pojemnik').style.opacity = 0;
    drawUsers();
}
//edytuj ankietę
function editSurvey() {
    if (document.getElementById('listofsurveys').style.visibility == 'hidden') {
        document.getElementById('listofsurveys').style.visibility = "visible";
    }
    fillsurvey(0);
}
//narysuj użytkowników w panelu administratora
function drawUsers() {
    //rysowanie uzytkownikow
    var temp = "";
    for (var i = 0; i < users.length; i++) {
        temp += '<div id="' + users[i] + '"  class="user"><span class="username" onclick="chooseUser(this)">' + users[i] + '</span><button onclick="removeUser(this)" class="btnmenu">Usuń</button><button class="changename" onclick="editUsername(this)" class="btnmenu">Edytuj</button></div>'
    }
    document.getElementById('choose').innerHTML = temp;
}
//Akcja dla wybrania użytkownika w panelu administartora
function chooseUser(imie) {
    if (document.getElementsByClassName("buttons")[0]) {
        closeSurvey();
    }

    imie = imie.innerHTML;

    var index = users.indexOf(imie);
    if (index > -1) {
        x = window[imie];

    }
    showListOfSurveys();

    document.getElementById("yamakasa").outerHTML = "";
    document.getElementById('pojemnik').style.opacity = 1;
}
//zmiana nazwy użytkownika  w panelu administratora
//odczytanie starej nazwy użytkownika i narysowanie inputa
//do wprowadzenia nowej nazwy
function editUsername(zmienna) {
    //	var zmienna = document.getElementById("changename");
    zmienna = zmienna.parentNode;
    zmienna = zmienna.id;
    nazwauseradozmiany = zmienna;
    document.getElementById(zmienna).innerHTML = '<input type="text" id="newusername"></input><button class="btnmenu" onclick="changeUserName(this)">Zapisz</button>';

}
//odczytanie nowej nazwy użytkownika i zamiana ze starą nazwą
// w panelu administratora
function changeUserName(imie) {
    //imie=imie.innerHTML;
    imie = document.getElementById("newusername").value
    if(imie==undefined || imie==""){
      document.getElementById("yamakasa").innerHTML += '<span id="menuinfo" >Nazwa użytkownika nie może być pusta</span>';
      return;
    }
    var index = users.indexOf(imie);

    if (index > -1) {
        if (!document.getElementById("menuinfo")) {
            document.getElementById("yamakasa").innerHTML += '<span id="menuinfo" >Nazwa użytkownika już istnieje</span>';
        }
    } else {

        if (document.getElementById("menuinfo")) {
            document.getElementById("menuinfo").outerHTML = "";
        }
        //nazwauseradozmiany
        var index = users.indexOf(nazwauseradozmiany);
        if (index >= 0) {
            users[index] = imie;

        }

        window[imie] = window[nazwauseradozmiany];
        delete window[nazwauseradozmiany];
        //x=window[imie];
        drawUsers();
    }

}
//tworzenie nowego użytkownika  w panelu administratora
function createUser() {

    var imie = document.getElementById("newuser").value;
    imie = imie.toUpperCase();

    var index = users.indexOf(imie); //2 to wartosc ktora ma zostac usunieta

    if (index > -1) {
        if (!document.getElementById("menuinfo")) {
            document.getElementById("yamakasa").innerHTML += '<span id="menuinfo" >Nazwa użytkownika już istnieje</span>';
        }
    } else {
        if (document.getElementById("menuinfo")) {
            document.getElementById("menuinfo").outerHTML = "";
        }
        users.push(imie);
        window[imie] = JSON.parse(JSON.stringify(dane));

        drawUsers();
    }
    document.getElementById("newuser").value = "";
}
//usuwanie istniejącego użytkownika w panelu administratora
function removeUser(imie) {
    var zmienna = imie.parentNode;
    zmienna = zmienna.id;


    var index = users.indexOf(zmienna);
    if (index > -1) {
        users.splice(index, 1);

    }
    drawUsers();
}
// schowanie edytowaniej ankiety w glownym oknie programu
function closeSurvey() {
    document.getElementsByClassName('buttons')[0].innerHTML = "";
}
// pokazanie i uzupełnienie wybranej poprzez kliknięcie ankiety
//w glownym oknie programu
function fillsurvey(nr) {
    ktoraankietakliknieta = nr;
    var z;
    var addtoinner = "";
    var howmanyquestion = Object.keys(x[nr]).length;
    document.getElementsByClassName('buttons')[0].innerHTML = '<label>' + Object.keys(x[nr])[0] + ' : ' + x[nr].Nazwa_ankiety + '</label><br><br>';

    for (var i = 1; i < howmanyquestion; i++) {
        z = Object.keys(x[nr])[i];
        addtoinner += Object.keys(x[nr])[i] + " " + '<input type="text" name="firstname" value="' + x[nr][z] + '" id="q' + i + '"><br>';
    }

    document.getElementsByClassName('buttons')[0].innerHTML += addtoinner +
        '<button  onclick="saveSurvey()" style="margin-top:30px;">ZAPISZ</button>' + '<button class="btnmenu" onclick="deleteSurvey()" style="margin-top:30px;">USUŃ</button>' + '<div onclick="closeSurvey()" id="close-survey">X</div>';

}
//akcja dla wprowadzenia nowych danych do ankiety i proba zapisu
function saveSurvey() {
    var temp;
    var nr = document.getElementById('q1').value;
    var howmanyquestion = document.getElementsByTagName('input').length; //10
    //var checkifchecked=0;
    for (var i = 1; i <= howmanyquestion; i++) {
        if (document.getElementById('q' + i).value &&
            document.getElementById('q' + i).value != "") {
            temp = Object.keys(x[nr])[i];
            x[nr][temp] = document.getElementById('q' + i).value;

        }
    }
}
// dodawanie nowej ankiety poprzez stworzenie nowego okna
function addSurvey() {
    document.body.innerHTML += '<div id="yamakasa">Dodawanie ankiety<br><div id="close-btn" onclick="closeIt()">X</div>';
    document.getElementById('pojemnik').style.opacity = 0.1;

    var z;
    var addtoinner = "";

    var howmanyquestion = Object.keys(tempobject).length;

    var nameofvar;
    document.body.innerHTML = document.body.innerHTML.replace('to_co_chcemy_usunac', '');
    for (var i = 0; i < howmanyquestion; i++) {
        z = Object.keys(tempobject)[i];
        nameofvar = Object.keys(tempobject)[i];
        nameofvar = nameofvar.replace('_', ' ');
        nameofvar = nameofvar.replace('_', ' ');
        nameofvar = nameofvar.toUpperCase();
        addtoinner += nameofvar + " " + '<input type="text" value="" id="new' + i + '"><br>';
    }

    document.getElementById('yamakasa').innerHTML += addtoinner +
        '<button onclick="saveNewSurvey()">DODAJ</button>';
}
// akcja dla zapisu nowej ankiety - walidacja numeru ankiety
function saveNewSurvey() {
    var temp;
    var lengthofx = x.length;
    var z = new Object(x[lengthofx + 1]);

    var nr = document.getElementById('new1').value;


    var howmanyquestion = Object.keys(tempobject).length;

    //check if filled
    for (var i = 0; i < howmanyquestion; i++) {
        if (document.getElementById('new' + i).value == "") {
            alert("wypelnij wszystkie pola");
            return;
        }
    }

    for (var i = 0; i < howmanyquestion; i++) {
        temp = Object.keys(tempobject)[i];
        if (i == 1 && document.getElementById('new' + i).value != x.length) {
            z[temp] = x.length;
            var addit = '<br><br><span>Nr ankiety został zmieniony na prawidłowy</span>';

        } else if (document.getElementById('new' + i).value &&
            document.getElementById('new' + i).value != "") {

            z[temp] = document.getElementById('new' + i).value;

        }

    }
    for (var i = 0; i < x.length; i++) {
        if (x[i] == undefined && x[i] == null) {
            x[i] = z;
            var flag = true;
            break;
        }
    }
    if (!flag) {
        x.push(z);
    }
    document.getElementById('yamakasa').innerHTML += addit + '<br><br><span>Ankieta została zapisana</span>'
    delete z;
    showListOfSurveys();
}
//pokazanie listy aniet w lewym panelu głównego okna
function showListOfSurveys() {
    document.getElementById('listofsurveys').innerHTML = "";
    var toput = "";
    for (var i = 0; i <= Object.keys(x).length; i++) {
        if (x[i] != undefined) {
            toput += '<span style="cursor:pointer" onclick="fillsurvey(' + i + ')">' + x[i].Nazwa_ankiety + '</span><br>';
        }
    }
    document.getElementById("listofsurveys").innerHTML += toput;
}
// akcja dla przycisniecia przycisku "O programie" informującego o programie
function showInfo() {
    document.body.innerHTML += '<div id="yamakasa">Wybrano przycisk informujący o programie<div id="close-btn" onclick="closeIt()">X</div>';
    document.getElementById('pojemnik').style.opacity = 0.3;
}
// akcja dla klikniecia przycisku "Pomoc"
function showHelp() {
    document.body.innerHTML += '<div id="yamakasa">Wybrano przycisk pomocy<div id="close-btn" onclick="closeIt()">X</div>';
    document.getElementById('pojemnik').style.opacity = 0.3;
}
//akcja dla zamknięcia dodatkowo narysowanego okna o id "yamakasa"
function closeIt() {
    document.getElementById("yamakasa").outerHTML = "";
    document.getElementById('pojemnik').style.opacity = 1;
}
// akcja dla klikania przysku pokaż ankiety
function showOrHide() {
    if (document.getElementById('listofsurveys').style.visibility == 'hidden') {
        document.getElementById('listofsurveys').style.visibility = 'visible';

        if (document.getElementById('listofsurveys').style.visibility = 'visible') {
			
            showListOfSurveys();
        }
    } 
	else if(document.getElementById('listofsurveys').style.visibility == "") {
document.getElementById('listofsurveys').style.visibility = 'hidden';
            showListOfSurveys();
        
	}
	else if(document.getElementById('listofsurveys').style.visibility == 'visible') {
        document.getElementById('listofsurveys').style.visibility = 'hidden';
    }
}
//usuwanie ankiety przy edycji poprzez klikniecie buttona "USUń"
function deleteSurvey() {


    //ostatni element
    for (var i = x.length; i >= 0; i--) {
        if (ktoraankietakliknieta == i && x[i] != "undefined") {

            delete x[ktoraankietakliknieta];
            ktoraankietakliknieta = -1;
            document.getElementsByClassName('buttons')[0].innerHTML = "";
            showListOfSurveys();
            return;
        }
    }


}
//Klikniecie przycisku "Pokaż statystyki" w panelu administratora
// narysowanie wykresu z danymi ankieterów
function showChart() {
    document.getElementById('yamakasa').innerHTML ="";
    document.getElementById('yamakasa').innerHTML = 'Panel administratora' +
        '<section class="featured">' +
        ' <div class="content-wrapper">' +
		'<hgroup class="title"><button class="btnmenu" onclick="showChart()">Wykres słupkowy</button><button class="btnmenu" onclick="drawPieChart()">Wykres kołowy</button></hgroup>' +
		'<hgroup class="title">Wykres słupkowy</hgroup>' +
        ' </div>' +
        '</section>' +
        '<section class="content-wrapper main-content clear-fix">' +
        '<canvas id="bchart" height="400" width="600">' +
        'Your browser does not support HTML5 Canvas </canvas>' +
        '<div style="top: 4%;right: 17%;" 	id="close-btn" onclick="showMenu()">X</div>' +
        '</section>';




    var arrVisitors = new Array();
    for (var i = 0; i < users.length; i++) {
        arrVisitors[i] = '' + users[i] + ',' + Object.keys(window[users[i]]).length + '';

        typeof(arrVisitors[i]);
    }


    var canvas;
    var context;
    // chart properties
    var cWidth, cHeight, cMargin, cSpace;
    var cMarginSpace, cMarginHeight;
    // bar properties
    var bWidth, bMargin, totalBars, maxDataValue;
    var bWidthMargin;
    // bar animation
    var ctr, numctr, speed;
    // axis property
    var totLabelsOnYAxis;


    // barchart constructor
    function barChart() {
        canvas = document.getElementById('bchart');
        if (canvas && canvas.getContext) {
            context = canvas.getContext('2d');
        }

        chartSettings();
        drawAxisLabelMarkers();
        drawChartWithAnimation();
    }

    // initialize the chart and bar values
    function chartSettings() {
        // chart properties
        cMargin = 25;
        cSpace = 60;
        cHeight = canvas.height - 2 * cMargin - cSpace;
        cWidth = canvas.width - 2 * cMargin - cSpace;
        cMarginSpace = cMargin + cSpace;
        cMarginHeight = cMargin + cHeight;
        // bar properties
        bMargin = 15;
        totalBars = arrVisitors.length;
        bWidth = (cWidth / totalBars) - bMargin;


        // find maximum value to plot on chart
        maxDataValue = 0;
        for (var i = 0; i < totalBars; i++) {
            var arrVal = arrVisitors[i].split(",");
            var barVal = parseInt(arrVal[1]);
            if (parseInt(barVal) > parseInt(maxDataValue))
                maxDataValue = barVal;
        }


        var temp = new Array();
        for (var i = 0; i < users.length; i++) {
            temp[i] = Object.keys(window[users[i]]).length;
        }

        totLabelsOnYAxis = Math.max.apply(Math, temp); // 306

        context.font = "1rem Garamond";

        // initialize Animation variables
        ctr = 0;
        numctr = 100;
        speed = 10;
    }

    // draw chart axis, labels and markers
    function drawAxisLabelMarkers() {
        context.lineWidth = "3.0";
        // draw y axis
        drawAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
        // draw x axis
        drawAxis(cMarginSpace, cMarginHeight, cMarginSpace + cWidth, cMarginHeight);
        context.lineWidth = "1.0";
        drawMarkers();
    }

    // draw X and Y axis
    function drawAxis(x, y, X, Y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(X, Y);
        context.closePath();
        context.stroke();
    }

    // draw chart markers on X and Y Axis
    function drawMarkers() {
        var numMarkers = parseInt(maxDataValue / totLabelsOnYAxis);
        context.textAlign = "right";
        context.fillStyle = "#fff";;

        // Y Axis
        for (var i = 0; i <= totLabelsOnYAxis; i++) {
            markerVal = i * numMarkers;
            markerValHt = i * numMarkers * cHeight;
            var xMarkers = cMarginSpace - 10;
            var yMarkers = cMarginHeight - (markerValHt / maxDataValue);
            context.fillText(markerVal, xMarkers, yMarkers, cSpace);
        }

        // X Axis
        context.textAlign = 'center';
        for (var i = 0; i < totalBars; i++) {
            arrval = arrVisitors[i].split(",");
            name = arrval[0];

            markerXPos = cMarginSpace + bMargin + (i * (bWidth + bMargin)) + (bWidth / 2);
            markerYPos = cMarginHeight + 20;
            context.fillText(name, markerXPos, markerYPos, bWidth);
        }

        context.save();

        // Add Y Axis title
        context.translate(cMargin + 10, cHeight / 2);
        context.rotate(Math.PI * -90 / 180);
        context.fillText('Ilośc ankiet', 0, 0);

        context.restore();

        // Add X Axis Title
        context.fillText('Ankieterzy', cMarginSpace + (cWidth / 2), cMarginHeight + 50);
    }

    function drawChartWithAnimation() {
      var color=["orange","red","brown","yellow","grey","blue", "green", "purple","pink","white","cyan" ];
  var icol=0;
       
        // Loop through the total bars and draw
        for (var i = 0; i < totalBars; i++) {
        
            var arrVal = arrVisitors[i].split(",");
            bVal = parseInt(arrVal[1]);
            bHt = (bVal * cHeight / maxDataValue) / numctr * ctr;
            bX = cMarginSpace + (i * (bWidth + bMargin)) + bMargin;
            bY = cMarginHeight - bHt - 2;
            drawRectangle(bX, bY, bWidth, bHt, true,color[icol++]);
          if(icol>10){icol=0;}
        }

        // if not, keep growing
        if (ctr < numctr) {
            ctr = ctr + 1;
            setTimeout(arguments.callee, speed);
        }
    }



    function drawRectangle(x, y, w, h, fill,colorizator) {
        
        context.beginPath();
        context.rect(x, y, w, h);
        context.closePath();
        context.stroke();

        if (fill) {
         
            var gradient = context.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, colorizator);
          
           // gradient.addColorStop(1, 'rgba(67,203,36,.15)');
            context.fillStyle = gradient;
            context.strokeStyle = 0;
            context.fill();
        }
    }
    barChart();
	//wywołanie rysowania wykresu kołowego

}
var chart;
//rysuje wykres kołowy ponieżej słupkowego
function drawPieChart(){
	   // document.getElementById('yamakasa').innerHTML ='<div id="chartdiv">ssasa</div>';
	   document.getElementsByClassName("content-wrapper main-content clear-fix")[0].style.marginTop="-1%";
	   document.getElementsByClassName("content-wrapper main-content clear-fix")[0].innerHTML='<div id="chartdiv">ssasa</div>'+
	     '<div style="top: 4%;right: 17%;" id="close-btn" onclick="showMenu()">X</div>';
 chart = AmCharts.makeChart( "chartdiv", {

  "type": "pie",
  "theme": "dark",
  "color":"white",

"titles": [
		{
			"text": "Wykres kołowy",
			"size": 20,
			"id":"piecharttitle"
		}
	],
  "dataProvider": [],
  "valueField": "ileankiet",
  "titleField": "ankieter",
    "filldata":function(){
		var zz;
		for (var i = 0; i < users.length; i+=1) {
			 zz= new Object();
			 
			    zz.ileankiet = Object.keys(window[users[i]]).length;
				zz.ankieter=users[i];
				chart.dataProvider.push(zz);

		}
	},
   "balloon":{
   "fixedPosition":true
  },
  "export": {
    "enabled": true
  }
} );


chart.filldata();
chart.validateData();
document.getElementsByTagName("a")[4].style.display="none";
if(document.getElementsByClassName("title")[1]){
document.getElementsByClassName("title")[1].outerHTML="";
}
}