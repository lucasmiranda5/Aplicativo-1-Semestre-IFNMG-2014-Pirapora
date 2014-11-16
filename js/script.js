const URLBASE  = "http://sizetech.com.br/app_if/";

$(function(){
	$('#calcularimc').submit(function(){
		var altura 	= $('#altura_imc').val();
		var peso 	= $('#peso_imc').val();
		if(altura == '' || peso == ''){
			alert('Preencha todos os campos');
		}else{			
			altura = altura.replace(',','.');
			peso = peso.replace(',','.');
			peso = parseFloat(peso);
			altura = parseFloat(altura);
			var valor = peso / (altura*altura);
			if(valor < 17)
				var tipo = "Muito abaixo do peso";
			else if(valor >= 17 && valor <= 18.49)
				var tipo = "Abaixo do peso";
			else if(valor >= 18.5 && valor <= 24.99)
				var tipo = "com o Peso normal";
			else if(valor >= 25 && valor <= 29.99)
				var tipo = "Acima do peso";
			else if(valor >= 30 && valor <= 34.99)
				var tipo = "com Obesidade I";
			else if(valor >= 35 && valor <= 39.99)
				var tipo = "com Obesidade II (severa)";
			else
				var tipo = "com Obesidade III (mórbida)";
			$('#resultadoIMC').html("Seu IMC é: "+valor+" você estar "+tipo);
		}
		return false;
	})

	$('#calcularpesoideal').submit(function(){
		var sexo 	= $('#sexo_peso').val();
		var altura 	= $('#altura_peso').val();
		if(altura == '' || sexo == ''){
			alert('Preencha todos os campos');
		}else{			
			altura = altura.replace(',','.');
			altura = parseFloat(altura);
			
			altura = altura * 100;
			
			if(sexo == 'h'){
				var PI = (altura - 100) - ((altura - 150)/4);
			}else{
				var PI = (altura - 100) - ((altura - 150)/4);
			}
			$('#resultadoPeso').html("Seu Peso ideal é: "+PI);
			
			
		}
		return false;
	})
})

function abrirCoollapsible(a){
	var t = $(a).find( "form" ).css("display");
	if(t == 'none')
		$(a).find( "form" ).css("display","block");
	else
		$(a).find( "form" ).css("display",'none');

}

function todasDicas(){


	var lista = '';
	var resposta = '';
	var ab = 'a';
	$.post(URLBASE+'dicas.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
					
					
						if(x % 2 == 0)
							ab = 'b';
						else
							ab = 'a';
							
						lista += ' <li onclick="abrirCoollapsible(this);" data-theme="'+ab+'" ><a href="#">'+data[x].titulo+'</a>';
						lista += ' <form style="display:none">';
						lista += ' <p align="center">'+data[x].descricao+'</p>';
						lista += ' <a href="#dica" onClick="abrirDicas('+data[x].id_noticia+');"class="ui-btn ui-btn-'+ab+'">LEIA MAIS</a>';
						lista += ' </form>';
						lista += ' </li>';
					
						x++;
					});
					
					$('#dicasLista').html(lista);
					$('#dicasLista').listview("refresh");
		}, 'json');


}
function abrirDicas(id){


	$.post(URLBASE+'dica.php', {id:id}, function(data) {
				var x = 0;
					$.each( data, function( ) {
					
					
							
						$('#titutloDica').html(data.titulo);
						$('#subDica').html(data.sub);
						$('#textoDica').html(data.texto);
						$('#fonteDica').html(data.fonte);
					
					});
					
		}, 'json');


}


function todosVideos(){


	var lista = '';
	var resposta = '';
	var ab = 'a';
	$.post(URLBASE+'videos.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
					
					
						if(x % 2 == 0)
							ab = 'b';
						else
							ab = 'a';
							
						lista += ' <li data-theme="'+ab+'" ><a onClick="abrirVideo('+data[x].id_video+');" href="#video">'+data[x].nome+'</a>';
						lista += ' </li>';
					
						x++;
					});
					
					$('#videoLista').html(lista);
					$('#videoLista').listview("refresh");
		}, 'json');


}

function abrirVideo(id){


	$.post(URLBASE+'video.php', {id:id}, function(data) {
				var x = 0;
					$.each( data, function( ) {
					
					
							
						$('#titutloVideo').html(data.nome);
						$('#videoCode').html(data.video);
					
					});
					
		}, 'json');


}

 function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("menubutton", onMenuKeyDown, false);
    }

    // Handle the menu button
    //
    function onMenuKeyDown() {
		$( ".selector" ).panel( "open" );
    }

