const characterInput = document.getElementById('charInput');
let num = 9;
let character = "";
const numberInput= document.getElementById('numInput');
const btnFetch = document.getElementById("btnFetch");

btnFetch.addEventListener('click', () => {
    if(numberInput.value == ""){
        num = 9;
    }else{
        num = numberInput.value;
    }
    character = characterInput.value;
    cargarPersonajes(); 
});
const cargarPersonajes = async() => {
    document.getElementById('contenedor').innerHTML = "";//lo que haya se debe limpiar, esto funciona para cuando se filtran personajes
	try {
		const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${num}&character=${character}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			let personajes = '';
			datos.forEach(personaje => {
				personajes += `
					<div class="personaje">
                        <img class="imagen" src="${personaje.image}">
                        <h3 class="nombre">${personaje.character}</h3>
                        <p>"${personaje.quote}"</p>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = personajes;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPersonajes();