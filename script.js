let baris = 1;
let kolom = {};
let item = {};
let itemCont = {};

let reg =[];
let brand =[];
let cont = document.getElementById("ico");
let isi = "";
let icon = "";

$.ajax({type:"GET",url:"solid+reg.txt",success:function(data){
	regu = data.split("\n");
	regu.forEach( e => reg.push(e) );
	$.ajax({type:"GET",url:"brands.txt",success:function(data){
		brnd = data.split("\n");
		brnd.forEach( e => brand.push(e) );
		brand.forEach( b => isi += "<div class='col-1 ico'><label for='ico-"+b+"' class='ikon'><input type='radio' name='ico' id='ico-"+b+"'><i class='fab fa-"+b+"'></i></label></div>");
		reg.forEach( r => isi += "<div class='col-1 ico'><label for='ico-"+r+"' class='ikon'><input type='radio' name='ico' id='ico-"+r+"'><i class='fa fa-"+r+"'></i></label></div>");

		cont.innerHTML = isi;
	}
	});
}
});

sumnot();
cekLocal();

function addRow() {
	const prev = document.getElementById('preview');
	const rowBaru = document.createElement("div");
	rowBaru.id = "r"+baris;
	rowBaru.className = "row baris";
	//rowBaru.style.border = "1px solid #252858";
	rowBaru.innerHTML = "<div class='col-sm-1 tambah' id='tc-"+baris+"'><p  onclick='movePrev(`r"+baris+"`)'><i class='fa fa-arrow-up tambah-ico'></i></p><p  onclick='addCol("+baris+")'><i class='fa fa fa-plus tambah-ico'></i></p><p  onclick='del(`r"+baris+"`)'><i class='fa fa fa-trash tambah-ico'></i></p><p><i class='fas fa-pencil-alt' onclick='editRow(`r"+baris+"`)'></i></p><p  onclick='moveNext(`r"+baris+"`)'><i class='fa fa-arrow-down tambah-ico'></i></p></div>";
	prev.appendChild(rowBaru);
	kolom[baris] = 1;
	baris++;
}

function addCol(bar) {
	const rowIni = document.getElementById('r'+bar);
	const colBaru = document.createElement("div");
	colBaru.id="c"+bar+"-"+kolom[bar];
	colBaru.className = "col-sm kolom";
	//colBaru.innerHTML = "Kolom"+bar+"-"+kolom[bar];
	colBaru.innerHTML = "<center><div class='tambah'><i class='fa fa fa-arrow-left tambah-ico' onclick='movePrev(`c"+bar+"-"+kolom[bar]+"`)'></i> . <i class='fa fa fa-plus tambah-ico' onclick='addItem(`"+bar+"-"+kolom[bar]+"`)'></i> . <i class='fa fa fa-trash tambah-ico' onclick='del(`c"+bar+"-"+kolom[bar]+"`)'></i> . <i class='fas fa-pencil-alt' onclick='editCol(`c"+bar+"-"+kolom[bar]+"`)'></i> . <i class='fa fa fa-arrow-right tambah-ico' onclick='moveNext(`c"+bar+"-"+kolom[bar]+"`)'></i></div></center>"
	rowIni.appendChild(colBaru);
	item[bar+"-"+kolom[bar]]=1;
	kolom[bar]++;

}

function addItem(kol) {
	const kolIni = document.getElementById('c'+kol);
	const itemBaru = document.createElement("div");
	itemBaru.id = "i"+kol+"-"+item[kol];
	itemBaru.className = "item";
	itemBaru.innerHTML = "<div class='konten'>Silahkan diedit</div><center><div class='tambah'> <i class='fa fa fa-arrow-up tambah-ico' onclick='movePrev(`"+itemBaru.id+"`)'></i> . <span onclick='editItem(`"+itemBaru.id+"`)'>edit</span> . <i class='fa fa fa-arrow-down tambah-ico' onclick='moveNext(`"+itemBaru.id+"`)'></i></div></center>";
	kolIni.appendChild(itemBaru);
	itemCont["i"+kol+"-"+item[kol]]={};
	item[kol]++;
}

function del(elmnt) {
	//console.log("elmnt : "+elmnt);
	const hapus = document.getElementById(elmnt);
	//console.log(hapus);
	hapus.remove();
}

function editItem(itm) {
	const edit = document.getElementById('edit-item');
	const itemIni = document.getElementById(itm);
	kont = itemIni.getElementsByClassName("konten");
	[...kont].forEach( k => isi=k.innerHTML);
	$('#summernote').summernote('code',isi);
	edit.value = itemIni.id;
	$('#modal-edit').modal('show');
	//edit.innerHTML += "<div id='summernote'></div>"
	//console.log(edit.innerHTML);
}

///////// col mulai ////////
function editCol(col) {
	 console.log(col)
	 ecol = document.getElementById('edit-col');
	 const colIni = document.getElementById(col);
	 ecol.value = colIni.id;

	 let colClr = colIni.style.backgroundColor;
	 colClr = colClr.replace("rgb(","").replace(")","");
	 expClr = colClr.split(",");
	 colWarna = "#";
	 expClr.forEach(c => colWarna += toHex(c));

	 let colUrl = colIni.style.backgroundImage.replace("url(\"","").replace("\")","");


	 console.log("bg attch : "+colIni.style.backgroundAttachment);
	 if(colIni.style.backgroundAttachment == "fixed"){
	 	document.getElementById('fix-col').checked = true;
	 	console.log('not fixed');
	 }else{
	 	document.getElementById('fix-col').checked = false;
	 	console.log('not fixed');
	 }
	 document.getElementById('color-col').value = colWarna;
	 document.getElementById('url-col').value = colUrl;
	 //console.log(colIni.style.backgroundColor);
	 $('#modal-kolom').modal('show');
}

function applyCol() {
	const mana = document.getElementById('edit-col').value;
	const colIni = document.getElementById(mana);
	const urlColor = document.getElementById('url-col').value;
	const fixCol = document.getElementById('fix-col').checked;
	//const colColor = document.getElementById('color-col').value;
	console.log(colIni);
	console.log(document.getElementById('color-col').value);
	colIni.style.backgroundColor = document.getElementById('color-col').value;
	if(urlColor != ""){
		colIni.style.background = "url("+urlColor+")";
		colIni.style.backgroundSize = "cover";
	};

	if(fixCol){colIni.style.backgroundAttachment = 'fixed';}
	//console.log(bg);
}

function resetCol() {
	const mana = document.getElementById('edit-col').value;
	const colIni = document.getElementById(mana);

	colIni.style.backgroundColor = "";
	colIni.style.background = "";

}
///////// col selesai ////////

///////// row mulai ////////
function editRow(row) {
	 console.log(row)
	 erow = document.getElementById('edit-row');
	 const rowIni = document.getElementById(row);
	 erow.value = rowIni.id;

	 let rowClr = rowIni.style.backgroundColor;
	 rowClr = rowClr.replace("rgb(","").replace(")","");
	 expClr = rowClr.split(",");
	 rowWarna = "#";
	 expClr.forEach(c => rowWarna += toHex(c));

	 let rowUrl = rowIni.style.backgroundImage.replace("url(\"","").replace("\")","");

	 const rowFix = rowIni.style.backgroundAttachment;
	 if(rowFix == "fixed"){document.getElementById("fix-row").checked=true}else{document.getElementById("fix-row").checked=false};

	 const rowHeight = rowIni.style.height;
	 if(rowHeight == "100vh"){document.getElementById("fullh-row").checked=true}else{document.getElementById("fullh-row").checked=false};

	 const rowPad = rowIni.style.paddingRight;
	 if(rowPad == "0px"){document.getElementById("full-row").checked=true}else{document.getElementById("full-row").checked=false};


	 //console.log("rowWarna : "+rowWarna);
	 document.getElementById('color-row').value = rowWarna;
	 document.getElementById('url-row').value = rowUrl;
	 //console.log(rowIni.style.backgroundrowor);
	 $('#modal-baris').modal('show');
}

function applyRow() {
	const mana = document.getElementById('edit-row').value;
	const rowIni = document.getElementById(mana);
	const urlColor = document.getElementById('url-row').value;
	const fixrow = document.getElementById('fix-row').checked;
	const fullrow = document.getElementById('full-row').checked;
	const fullhrow = document.getElementById('fullh-row').checked;
	//const rowColor = document.getElementById('Color-row').value;
	console.log(rowIni);
	console.log(document.getElementById("color-row").value);
	rowIni.style.backgroundColor = document.getElementById('color-row').value;
	if(urlColor != ""){
		rowIni.style.background = "url("+urlColor+")";
		rowIni.style.backgroundSize = "cover";
	};

	if(fixrow){rowIni.style.backgroundAttachment = 'fixed';}else(rowIni.style.backgroundAttachment = 'scroll')
	if(fullrow){rowIni.style.padding = "0 0";}else{rowIni.style.padding = "0 10%"}
	if(fullhrow){rowIni.style.minHeight = '100vh';}else{rowIni.style.minHeight = 'auto';}
	//console.log(bg);
}

function resetRow() {
	const mana = document.getElementById('edit-row').value;
	const rowIni = document.getElementById(mana);

	rowIni.style.backgroundColor = "";
	rowIni.style.background = "";

}
///////// row selesai ////////

//////// btn mulai /////////
function addBtn() {
	document.getElementById("btn-txt").value="";
	document.getElementById("btn-url").value="";
	document.getElementById("btn-color").value="";
	document.getElementById("btn-bg").value="";
	$('#modal-btn').modal('show');	
}

function applyBtn() {
	const btnTxt = document.getElementById("btn-txt").value;
	const btnUrl = document.getElementById("btn-url").value;
	const btnCol = document.getElementById("btn-color").value;
	const btnBg = document.getElementById("btn-bg").value;
	const skr = $('#summernote').summernote('code');
	btn = "\n<center><a href='"+btnUrl+"' target='_blank'><button class='btn' style='color:"+btnCol+"; background-color:"+btnBg+"'>"+btnTxt+"</button></a></center>";
	$('#summernote').summernote('code',skr+btn);	

}

//////// btn mulai /////////

////// ikon mulai ////////

function ikon() {
	const iko = document.getElementsByName("ico");
	[...iko].forEach(e => isChecked(e.id));
}

function isChecked(ikn) {
	let ikos = document.getElementById(ikn);
	if(ikos.checked){ icon = ikos.nextElementSibling.className };
}

function addIkon() {
	const iko = document.getElementsByName("ico");
	[...iko].forEach(e => e.checked="false");
	document.getElementById('size-ico').value = "";
	$('#modal-ikon').modal('show');
}

function applyIkon() {
	ikon();
	const skr = $('#summernote').summernote('code');
	const ikonSize = document.getElementById('size-ico').value;
	let ikonAdd = " . <i class='"+icon+" "+ikonSize+"'></i> . ";
	$('#summernote').summernote('code',skr+ikonAdd);
}
///// ikon selesai //////

///// GImg Mulai //////

function addGImg() {
	document.getElementById('url-gimg').value = "";
	$('#modal-gimg').modal('show');
}

function applyGImg() {
	const urlGImg = document.getElementById('url-gimg').value.split("/")[5];
	console.log('gimg : '+urlGImg);
	const skr = $('#summernote').summernote('code');

	let addGImg = "<img src='http://haizim.one/iseng/gdrive/?id="+urlGImg+"'>";
	$('#summernote').summernote('code',skr+addGImg);
}
//// GImg Selesai /////


///// GVid Mulai //////

function addGVid() {
	document.getElementById('url-gvid').value = "";
	$('#modal-gvid').modal('show');
}

function applyGVid() {
	const urlGVid = document.getElementById('url-gvid').value.split("/")[5];
	//console.log('gvid : '+urlGVid);
	const skr = $('#summernote').summernote('code');
	
	let addGVid = "<video src='http://haizim.one/iseng/gdrive/?id="+urlGVid+"' controls>";
	$('#summernote').summernote('code',skr+addGVid);
}
//// GVid Selesai /////

function applyText() {
	mana = document.getElementById('edit-item').value;
	teks = $('#summernote').summernote('code');
	elem = document.getElementById(mana);
	kont = elem.getElementsByClassName("konten");
	[...kont].forEach( k => k.innerHTML=teks);

}

function delItem() {
	mana = document.getElementById('edit-item').value;
	document.getElementById(mana).remove();
}

function moveNext(id) {
	const elm = document.getElementById(id);
	console.log("movenext : "+elm);
	const skr = elm;
	const skrId= elm.id;
	const skrClass = elm.classList.value;
	const skrStyle = elm.style.cssText;
	const skrIsi = elm.innerHTML;

	const stl = elm.nextSibling;
	const stlId= elm.nextSibling.id;
	const stlClass = elm.nextSibling.classList.value;
	const stlStyle = elm.nextSibling.style.cssText;
	const stlIsi = elm.nextSibling.innerHTML;

	elm.id = stlId;
	elm.classList.value = stlClass;
	elm.style.cssText = stlStyle;
	elm.innerHTML = stlIsi;
	
	elm.nextSibling.id = skrId;
	elm.nextSibling.classList.value = skrClass;
	elm.nextSibling.style.cssText = skrStyle;
	elm.nextSibling.innerHTML = skrIsi;
}

function movePrev(id) {
	const elm = document.getElementById(id);
	console.log("moveprev : "+elm);
	const skr = elm;
	const skrId= elm.id;
	const skrClass = elm.classList.value;
	const skrStyle = elm.style.cssText;
	const skrIsi = elm.innerHTML;

	const sbl = elm.previousSibling;
	const sblId= elm.previousSibling.id;
	const sblClass = elm.previousSibling.classList.value;
	const sblStyle = elm.previousSibling.style.cssText;
	const sblIsi = elm.previousSibling.innerHTML;

	elm.id = sblId;
	elm.classList.value = sblClass;
	elm.style.cssText = sblStyle;
	elm.innerHTML = sblIsi;
	
	elm.previousSibling.id = skrId;
	elm.previousSibling.classList.value = skrClass;
	elm.previousSibling.style.cssText = skrStyle;
	elm.previousSibling.innerHTML = skrIsi;
}



function prevHasil() {
	const ambil = document.getElementById('preview');
	let hasil = document.getElementById('hasil');
	hasil.innerHTML = ambil.innerHTML;
	const tambah = hasil.getElementsByClassName('tambah');
	[...tambah].forEach( e => e.remove());
	hasil.style.visibility = 'visible';
	hasil.scrollIntoView();
	localStorage.setItem("edit-builder", ambil.innerHTML);
	console.log("baris : "+baris);
	console.log("kolom : "+kolom);
	console.log("item : "+item);
	console.log("itemCont : "+itemCont);
	localStorage.setItem("baris", JSON.stringify(baris));
	localStorage.setItem("kolom", JSON.stringify(kolom));
	localStorage.setItem("item", JSON.stringify(item));
	localStorage.setItem("itemCont", JSON.stringify(itemCont));
}

function render() {
	prevHasil();
	const hasil = document.getElementById('hasil');
	const atas = "<html><head><title><\/title><link rel='stylesheet' href='https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/4.5.2\/css\/bootstrap.min.css'><script src='https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/3.5.1\/jquery.min.js'><\/script><script src='https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/popper.js\/1.16.0\/umd\/popper.min.js'><\/script><script src='https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/4.5.2\/js\/bootstrap.min.js'><\/script><link rel='stylesheet' href='https:\/\/use.fontawesome.com\/releases\/v5.7.0\/css\/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'><link href='https:\/\/cdn.jsdelivr.net\/npm\/summernote@0.8.18\/dist\/summernote.min.css' rel='stylesheet'><script src='summernote\/summernote-bs4.js'><\/script><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><style type='text\/css'>body{	scroll-behavior: smooth; max-width: 100vw; overflow-x: hidden; min-height: 100vh}img,video,iframe,audio{	width: 100%;}h1,h2,h3,h4,h5,h6{	font-weight: bold;}.row{	margin: unset;}.preview{	box-shadow: 0.5em 0.5em 0.5em rgba(0,0,0,0.25);	background-color: #fff;}.baris{	padding: 0 10%;	transition: all 1s;}.kolom{	padding: 1em;	transition: all 1s;}.tambah{	cursor: pointer;	font-weight: bold; 	text-align: center;	padding:.5em;	border-radius: 1em;	color: #ffc107;	background-color: #ffc10758;	backdrop-filter: blur(5px);	width: fit-content;	transition: all .5s;}	.item{ padding: .5em; margin: .5em;	border-radius: .5em;	transition: all 1s;}.kontener{	background-color: #eee; 	padding: 1em 5em;}<\/style><\/head><body>";
	const bawah = "<div style='width:100vw; background-color: #252525; color:#fff; padding: 1em; bottom : 0;'><center>Dibuat dengan <a href='https://haizim.one/iseng/page-builder'>Simple Page Builder<\/a><\/center><\/div><\/body><\/html>";
	let kode = atas+hasil.innerHTML+bawah;
	document.getElementById("kode").value = kode;
	document.getElementById("kode").scrollIntoView();
}

function toHex(no) {
	let hex = parseInt(no).toString(16);
	if(hex.length < 2){
		hex = "0"+hex;
	}
	console.log(no+" to "+hex);
	return hex;
}

function sumnot() {
	$('#summernote').summernote({
		placeholder: 'Hellow',
		tabsize: 2,
		height: 258
	});

}

function delAll() {
	baris = 1;
	kolom = {};
	item = {};
	itemCont = {};
	document.getElementById("preview").innerHTML = "";
}

function cekLocal(){
	const localEdit = localStorage.getItem("edit-builder");

	if( localEdit != null){
		document.getElementById("preview").innerHTML = localEdit;
		baris = JSON.parse(localStorage.getItem("baris"));
		kolom = JSON.parse(localStorage.getItem("kolom"));
		item = JSON.parse(localStorage.getItem("item"));
		itemCont = JSON.parse(localStorage.getItem("itemCont"));
	}
}

function downHasil() {
	render();

	const kode = document.getElementById("kode").value;

	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(kode));
	element.setAttribute('download', "hasil.html");

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}