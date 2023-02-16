async function wsp(){
    await eel.send_wsp();
}

function courbe(s,e){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    async function drawChart() {
        let lis=await eel.get(s)();
      var data = google.visualization.arrayToDataTable([
        ['day', 'chiffre'],
        [lis[0][0],  parseFloat(lis[1][0])],
        [lis[0][1],  parseFloat(lis[1][1])],
        [lis[0][2],  parseFloat(lis[1][2])],
        [lis[0][3],  parseFloat(lis[1][3])],
        [lis[0][4],  parseFloat(lis[1][4])],
        [lis[0][5],  parseFloat(lis[1][5])],
        [lis[0][6],  parseFloat(lis[1][6])],
        [lis[0][7],  parseFloat(lis[1][7])],
        [lis[0][8],  parseFloat(lis[1][8])],
        [lis[0][9],  parseFloat(lis[1][9])],
        ]);

      var options = {
        title: 'All',
        'width':500,
        'height':270,
        colors:['#2ed573','#9980FA'],
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById(e));

      chart.draw(data, options);
    }
}

async function graphic(s,e){
    let x=await eel.get("front3");
    var myChartSection = document.getElementById("myChart");
		const labels = [
		    'January',
		    'February',
		    'March',
		    'April',
		    'May',
		    'June',
		];
		const data = {
		    labels: labels,
		    datasets: [{
		      backgroundColor: '#422F8A',
		      borderColor: '#422F8A',
		      borderWidth:4,
		      data: x[1],
		    },{
		        backgroundColor: '#BEB1D5',
		        borderColor: '#BEB1D5',
		        borderWidth:4,
		        data: [0,10,20,30,40,50],
		    }]
		};
		//  Setup The Config of Chart 
		const config = {
		    type: 'line',
		    data: data,
		    options: {}
		};
		// Add Chart to The Chart Section
		const myChart = new Chart(myChartSection,config);
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function id(i){return document.getElementById(i)}
function cla(c){return document.getElementsByClassName(c)[0]}
function nv(v,c=""){let x= document.createElement(v); x.setAttribute("class",c); return x}

function eventify(e){
    if(e.className in events)
        for (const [key, value] of Object.entries(events[e.className])){
            if(key=='load'){value(e)}
            e.addEventListener(key,value);}
    if (e.className == "tofill"){graphic(e,reqs[e.innerText])}

    for (let i=0; i<e.children.length; i++){eventify(e.children[i]);}
}

function make(c){//only for elements in div class html
    let x= document.createElement("div");
    x.innerHTML = chi(cla("html"),c).innerHTML;
    x.className = c;
    eventify(x);
    return x;
}

function opt(){
    s="";
    let prodnames=Object.keys(prix);
    for(let i=0;i<prodnames.length;i++){
        s+="<option value='"+prodnames[i]+"'>"+prodnames[i]+"</option>"
    }
    return s;
}

//-----------------------------------------------------------------------------------------

var fv=null;
var tva=0.1;
var clients={};
var fclients={};
var prix = {
};
var sel=["",""];
chqs="";
fchqs="";
var corf=0;
var usr=0;
var factid=0;
var chqsum=0;
var selected=false;
var clt="";

var tofill = {
    "tb_frontfct" : "factures",
    "tb_trans" : "factures",
    "tb_clts" : "clients",
    "tb_art" : 'articles'
}


var tofillman = {
    "tb_ch": 0
}

async function updateall(){
    lastval=0;
    for(let s in tofill){
        let x= await eel.get(tofill[s])();
        id(s).innerHTML=totab(x,tofill[s]);
    }
    let x= await eel.gettabcl(clt)();
    //id("clint").innerHTML=totab(x,"factures");
    fillchqs(factid);
    autocomplete(id("enter_name"),Object.keys(clients));
    //autocomplete(id("fenter_name"),Object.keys(clients));
    //let chid=parseInt(id("chid").innerText);fillavs(chid);
    document.querySelectorAll("input").forEach((e)=>{e.oninput = function(event){if (e.type!="number") return; if(e.value<0)e.value=0}})
    //document.querySelectorAll("slcte").forEach((e)=>function(event){e.innerHTML=opt()})
}

async function updatesp(s,f='-1'){
    let x= await eel.get(tofill[s],f)();
    id(s).innerHTML=totab(x,tofill[s]);

}

function editfv(f){
    fv=f;
    id("choice").style.display="block";
}

function new_row(){

    let x = nv("tr");

    let p = nv('td'); p.appendChild(function(){let t=nv('select'); t.className='slcte'; t.innerHTML=opt(); return t}());
    let ht = nv('td'); ht.innerText='0';
    let ttc = nv('td'); ttc.innerText='0';
    let q = nv('td'); q.appendChild(function(){let t=nv('input'); t.setAttribute("type","number"); t.setAttribute("value",0); return t}()); 
    let upd = function(){ht.innerText=(prix[p.children[0].value]*q.children[0].value).toString();ttc.innerText=((prix[p.children[0].value]*(1+tva)*q.children[0].value).toFixed(2)).toString();
        id("tot_ht").innerText = function(){let sum=0; for(let i=0;i<id('tb_prod').children.length;i++){sum+=parseFloat(id('tb_prod').children[i].children[2].innerText)}; return parseFloat(sum).toFixed(2) }();
        id("tot_ttc").innerText = function(){let sum=0; for(let i=0;i<id('tb_prod').children.length;i++){sum+=parseFloat(id('tb_prod').children[i].children[3].innerText) }; return parseFloat(sum).toFixed(2) }();
        id("rg_mt").value = parseFloat(id("tot_ttc").innerText).toFixed(2);
    };
    p.addEventListener("change",function(){upd()});
    q.addEventListener("change", function(){upd()});
    
    x.appendChild(p);x.appendChild(q);x.appendChild(ht);x.appendChild(ttc);
    id("sendj").onclick = function(){corf=0;upd()};

    return x;
}

function fnew_row(){

    let x = nv("tr");

    let p = nv('td'); p.appendChild(function(){let t=nv('select'); t.innerHTML=opt(); return t}());
    let ht = nv('td'); ht.innerText='0';
    let ttc = nv('td'); ttc.innerText='0';
    let q = nv('td'); q.appendChild(function(){let t=nv('input'); t.setAttribute("type","number"); t.setAttribute("value",0); return t}()); 
    let upd = function(){ht.innerText=(prix[p.children[0].value]*q.children[0].value).toString();ttc.innerText=((prix[p.children[0].value]*(1+tva)*q.children[0].value).toFixed(2)).toString();
        id("ftot_ht").innerText = function(){let sum=0; for(let i=0;i<id('ftb_prod').children.length;i++){sum+=parseFloat(id('ftb_prod').children[i].children[2].innerText) }; return sum }();
        id("ftot_ttc").innerText = function(){let sum=0; for(let i=0;i<id('ftb_prod').children.length;i++){sum+=parseFloat(id('ftb_prod').children[i].children[3].innerText) }; return sum }();
        id("rg_mt").value = id("ftot_ttc").innerText;
    };
    p.addEventListener("change",function(){upd()});
    q.addEventListener("change", function(){upd()});
    
    x.appendChild(p);x.appendChild(q);x.appendChild(ht);x.appendChild(ttc);
    id("fsendj").onclick = function(){corf=1;upd()};

    return x;
}

function new_ch(){

    let x = nv("tr");

    let p = nv('td'); p.appendChild(function(){let t=nv('input'); t.setAttribute('type','file'); return t}());
    let h = nv('td'); h.appendChild(function(){let t=nv('input'); t.setAttribute('type','date'); return t}());
    let tc = nv('td'); tc.appendChild(function(){let t=nv('input'); t.setAttribute('type','text'); return t}());
    x.appendChild(p);x.appendChild(h);x.appendChild(tc);

    return x;
}

async function fillchqs(l){
    factid=l;
    let x=await eel.getchqs(l)();
    id("tb_chqs").innerHTML= totab(x,"chqs");
}

async function ffillchqs(l){
    factid=l;
    let x=await eel.fgetchqs(l)();
    id("tb_chqs").innerHTML= totab(x,"chqs");
}

async function fillavs(l){
    let x=await eel.getav(l)();
    id("tb_av").innerHTML= totab(x,"av");
}

function del(){
    let i=1;
    if(sel[0]=="") return;
    if(sel[0]=="factures" ||sel[0]=="articles") i=0;
    editfv(function(){ eel.suppr([sel[0],sel[1].children[i].innerText])() });
    updateall();
}

function validate(x){
    if(x=='yes') {if(fv!==null)fv();else alert('nothing to do');fv=null; id("choice").style.display="none"}
    if(x=='no') {fv=null;id("choice").style.display="none"};
}

function totab(l,c){
    s="";
    for(let i=0;i<l[1].length;i++){
        let style='';
        if(l[1][i][6] == "Parted"){style= "background-color:gray;"}
        if(l[1][i][6] == "Pending"){style= "background-color:brown;"}
        if(l[1][i][6] == "Valid" || l[1][i][6] == "Reglé"){style= "background-color:green;"}
        if(l[1][i][6] == "To pay"){style= "background-color:orange;"}
        
        if(c=="factures" && l[1][i][6]=='1'){style= "background-color:gray;"}
        if(c=="av" && l[1][i][4]=='1'){style= "background-color:gray;"}

        s+="<tr style='"+style+"' onclick='if(sel[0].length>0){sel[1].style.filter="+'"brightness(100%)"'+"}sel=["+'"'+c+'"'+",this];sel[1].style.filter="+'"brightness(80%)"'+";selected=true;'>";
        for(let j=0;j<l[1][i].length;j++){
            let scrpt="";
            let added="";
            if(c=="factures" && j==6) continue;
            if(c=="av" && j==4) continue;
            if(c=="factures" && j==4) { scrpt='document.getElementById("chqs").style.display="block";fillchqs('+l[1][i][0]+')'}
            if(c=="factures" && j==0) { scrpt='eel.openfact('+l[1][i][0]+')();';}
            if(c=="factures" && j==1) { scrpt='clt="'+(l[1][i][1].toString())+'";updateall();document.getElementById("user").style.display="block"'}
            
            if(c=="ffactures" && j==4) { scrpt='document.getElementById("chqs").style.display="block";ffillchqs('+l[1][i][0]+')'}
            if(c=="ffactures" && j==0) { scrpt='eel.fopenfact('+l[1][i][0]+')();';}
            if(c=="chqs" && j==4) {scrpt="document.getElementById("+'"av"'+").style.display="+'"block"'+ "; document.getElementById("+'"chid"'+").innerText="+'"'+l[1][i][1]+'"'+"; fillavs("+l[1][i][1]+")"}
            if(c=="chqs" && j==6){ if(l[1][i][j]!='Valid' && l[1][i][j]!='Parted') scrpt="editfv(function(){eel.change_chqetat("+l[1][i][1].toString()+");updateall()})"}
            if(c=="fchqs" && j==4) scrpt="document.getElementById("+'"av"'+").style.display="+'"block"'+ "; document.getElementById("+'"chid"'+").innerText="+'"'+l[1][i][1]+'"'+"; fillavs("+l[1][i][1]+")";

            s+="<td onclick='"+scrpt+"'>"+l[1][i][j]+"</td>";

            if(c=="clients" && j==1){ clients[l[1][i][j]]="cc" }
            if(c=="fclients" && j==1){ fclients[l[1][i][j]]="cc" }
            if(c=="articles" && j==1){prix[l[1][i][j]]=parseFloat(l[1][i][2]).toFixed(2)}
        }
        s+="</tr>";
    }
    return s;
}

chq=0
lastch=null;

var start = function() {
    graphic("front1",'chart_divFornisseur');
    graphic("front2",'chart_divClient');
    courbe("front3","chart_divAll")
    id("admin").addEventListener("click",function(){id("chqs").style.display="block",fillchqs(-1);})
    id("ht_aprod").addEventListener("input",function(){id("ttc_aprod").value=(this.value*(1+tva)).toFixed(2)})
    id("ttc_vprod").addEventListener("input",function(){id("ht_vprod").value=(this.value/(1+tva)).toFixed(2)})

    id("nvav").addEventListener("keydown",function(){if(event.keyCode==13){let chid=parseInt(id("chid").innerText);eel.add_avance([chid,this.value]);fillavs(chid);fillchqs(factid)}})

    id("hd_id").addEventListener("click",function(event){updatesp("tb_fcts","0")})
    id("hd_cl").addEventListener("click",function(event){updatesp("tb_fcts","1")})
    id("hd_mt").addEventListener("click",function(event){updatesp("tb_fcts","2")})
    id("hd_es").addEventListener("click",function(event){updatesp("tb_fcts","3")})
    id("hd_ch").addEventListener("click",function(event){updatesp("tb_fcts","4")})
    id("hd_dt").addEventListener("click",function(event){updatesp("tb_fcts","5")})

    id("fjlibene").addEventListener("click",function(event){id("ftb_prod").appendChild(fnew_row())});
    id("fhd_id").addEventListener("click",function(event){updatesp("ftb_fcts","0")})
    id("fhd_cl").addEventListener("click",function(event){updatesp("ftb_fcts","1")})
    id("fhd_mt").addEventListener("click",function(event){updatesp("ftb_fcts","2")})
    id("fhd_es").addEventListener("click",function(event){updatesp("ftb_fcts","3")})
    id("fhd_ch").addEventListener("click",function(event){updatesp("ftb_fcts","4")})
    id("fhd_dt").addEventListener("click",function(event){updatesp("ftb_fcts","5")})

    id("fhdr_id").addEventListener("click",function(event){updatesp("ftb_clts","0")})
    id("fhdr_nm").addEventListener("click",function(event){updatesp("ftb_clts","1")})
    id("fhdr_cf").addEventListener("click",function(event){updatesp("ftb_clts","2")})
    id("fhdr_es").addEventListener("click",function(event){updatesp("ftb_clts","3")})
    id("fhdr_ch").addEventListener("click",function(event){updatesp("ftb_clts","4")})




    id('prodbag').addEventListener("keydown",function(ev){if(ev.keyCode==13){
         if( id('nom_prod').value.length!=0 && id('ht_aprod').value!=0 && id('ttc_vprod').value!=0) {eel.add_article([id('nom_prod').value,id('ht_aprod').value,id('ttc_vprod').value]);updateall()}
        }})

    document.addEventListener("click",function(){if(!selected){if(sel[0]!="")sel[1].style.filter="brightness(100%)";sel=["",""]} selected=false; if(sel[0]=="chqs")lastch=sel[1]})
    id("schr").addEventListener("click",function(){wsp()})
    id("fermeregle").addEventListener("click",function(){id("chit").innerHTML=""})


    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 42, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(function(){ wsp() }, millisTill10);
    setInterval(function(){let now = new Date();
        let m = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 42, 0, 0) - now ;if(m<0)m+=86400000;id("schr").value=Math.floor((m/(1000*60*60))%24).toString()+'h'+Math.floor((m/(1000*60))%60).toString()+'m'+Math.floor((m/(1000))%60).toString()},100)
    
    updateall();
}
lastval=0;
actbub=null;
var startb=function() {
    alert(1);
    updateall();
    //document.querySelectorAll("table").forEach(function(e){let s=e.innerHTML; let x=e.parentElement; e.remove(); let y=document.createElement("div"); y.style= "max-height: 100px !important;"; let z=document.createElement('table'); z.innerHTML=s; y.appendChild(z);x.appendChild(y);})
    actcon=id("home");
    graphic(null,null);

    var chactbub = function(e){if(actbub!=null) actbub.style.display="none"; actbub=e; if(actbub!=null)actbub.style.display="block"}
    let sections=["trans","home","prod",'clts','fct'];
    for(let i=0;i<sections.length;i++)  id(sections[i]+"b").addEventListener("click",function(){if(actcon!=null) actcon.style.display="none"; actcon=id(sections[i]); actcon.style.display="block"})

    id("jlibene").addEventListener("click",function(event){id("tb_prod").appendChild(new_row())});
    id("sendj").addEventListener("click",function(){chactbub(id("regl"))})

    id("sdas").addEventListener("click", function(){
        if(corf==0){
            let somme=0; for(let i=0;i<id("chit").children.length;i++){ if(id("chit").children[i].children[1].children[0].value ==""){alert('remplir toutes les dates'); return;} somme+=parseFloat(id("chit").children[i].children[2].children[0].value)}; if( parseFloat(parseFloat(somme)+parseFloat(id("rg_es").value)).toFixed(2) != parseFloat(id("rg_mt").value).toFixed(2)) {alert(parseFloat(somme).toFixed(2).toString()+" + "+parseFloat(id("rg_es").value).toFixed(2).toString()+ " = "+parseFloat(parseFloat(somme)+parseFloat(id("rg_es").value)).toFixed(2).toString() + " not "+parseFloat(id("rg_mt").value).toFixed(2).toString());return;};
            eel.add_facture([id("enter_name").value,parseFloat(id("rg_mt").value).toFixed(2),id("rg_es").value],function(){let s=[];for(let i=0; i<id("tb_prod").children.length;i++){s[i]=[id("tb_prod").children[i].children[0].children[0].value,id("tb_prod").children[i].children[1].children[0].value,parseFloat(id("tb_prod").children[i].children[3].innerText).toFixed(2)]}return s;}());
            updateall();id("regl").classList.remove("active_regelement");
            alert('ok'); chactbub(null);
            for(let i=0;i<id("chit").children.length;i++){
                let zid=[id("chit").children[i].children[2].children[0].value,id("chit").children[i].children[1].children[0].value];eel.add_cheque(zid,-1);};
        }
        if(corf==1){
            eel.fadd_facture([id("enter_name").value,parseFloat(id("rg_mt").value).toFixed(2),id("rg_es").value],function(){let s=[];for(let i=0; i<id("ftb_prod").children.length;i++){s[i]=[id("ftb_prod").children[i].children[0].children[0].value,id("ftb_prod").children[i].children[1].children[0].value,parseInt(id("ftb_prod").children[i].children[3].innerText)]}return s;}());
            updateall();id("ass").classList.remove("active_regelement");
            for(let i=0;i<id("chit").children.length;i++){
                let zid=[id("chit").children[i].children[2].children[0].value,id("chit").children[i].children[1].children[0].value];eel.fadd_cheque(zid);};
        }
    });
    id("sdam").addEventListener("click",function(event){id("chit").appendChild(new_ch())});
    id("sdame").addEventListener("click",function(event){id("chite").appendChild(new_ch())});
    document.addEventListener("keydown",function(){
        if(event.key=="Backspace" && sel[1]!=null){del();updateall(); }
        if(event.key=="Shift"){if(sel[0]=="chqs" && sel[1].children[6].innerText!="Parted" && sel[1].children[6].innerText!="Valid"){updateall();id("mt_part").innerText=lastch.children[5].innerText;id("part").style="display:block;"}}
    });
    document.querySelectorAll("button").forEach((e)=>{e.addEventListener("click",function(){if(this.id !="sdam") updateall()})});
    id("sendp").addEventListener("click",function(){
        let chid=parseInt(id("chid").innerText);eel.add_avance([chid,this.value]);fillavs(chid);fillchqs(factid)
        let somme=0;for(let i=0;i<id("chite").children.length;i++){ if(id("chite").children[i].children[1].children[0].value ==""){alert('remplir toutes les dates'); return;} somme+=parseFloat(id("chite").children[i].children[2].children[0].value)}; if(parseFloat(somme).toFixed(2) != parseFloat(id("chrest").innerText).toFixed(2)) {alert("somme incomplete "+somme.toString()+" != "+id("chrest").innerText);return;};
    id("part").style="display:none;";
    for(let i=0;i<id("chite").children.length;i++){
    let zid=[id("chite").children[i].children[2].children[0].value,id("chite").children[i].children[1].children[0].value];eel.add_cheque(zid,factid);}
    eel.change_chqetat(lastch.children[1].innerText,"Parted");updateall()}) 
    document.addEventListener("click",function(){if(!selected){if(sel[0]!="")sel[1].style.filter="brightness(100%)";sel=["",""]} selected=false; if(sel[0]=="chqs")lastch=sel[1]})
    id("chid").addEventListener("change",function(){if(this.value>parseFloat(document.getElementById('mt_part').innerText)){alert("trop grand");return}document.getElementById('chrest').innerText=(parseFloat(document.getElementById('mt_part').innerText)-document.getElementById('chid').value).toString()});
}

window.onload=startb;