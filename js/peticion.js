let keyApiDefault = "";
const promt = `
. Realiza 5 preguntas con respuestas del tema indicado en formato JSON, 
    unicamente DAME el json con EXACTAMENTE ESTA estructura sin titulo: 
    {
        {
            "pregunta": "pregunta 1",
            "respuesta": "respuesta 1"
        }, 
        {
            "pregunta": "pregunta 2",
            "respuesta": "respuesta 2"
        }
    }
`;

function validar() {
    const keyTemp = document.getElementById("inputApiKey").value;
    const tema = document.getElementById("inputTema").value;

    if (keyTemp == "") {
        if (keyApiDefault == "") {
            alert("Falta key");
        } else {
            if (tema == "") {
                alert("Introduce un tema");
            } else {
                peticionAChatGPT(tema);
            }
        }
    } else {
        keyApiDefault = keyTemp;
        if (tema == "") {
            alert("Introduce un tema");
        } else {
            peticionAChatGPT(tema);
        }
    }
}


async function peticionAChatGPT(peticion) {
    const bodyRequest = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: peticion + promt }],
        temperature: 1,
        // max_tokens: 250
    }


    const solicitud = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${keyApiDefault}`
        },
        body: JSON.stringify(bodyRequest),

    }

    const respuesta = await fetch("https://api.openai.com/v1/chat/completions", solicitud);
    const jsonRespuesta = await respuesta.json();
    console.log(jsonRespuesta.choices[0].message.content);
    await generarTarjetas(jsonRespuesta.choices[0].message.content);
}


async function generarTarjetas(preguntasRecibidas) {

    try {
        let resultados = JSON.parse(preguntasRecibidas);
        console.log(preguntasRecibidas);
        let contenedor = "";
        let cont = 1;

        for (const element of resultados) {
            contenedor += `
                <div class="tarjeta">
                    <div class="interiorTarjeta">
                        <div class="pregunta contenido" id="preguntaContenido1">
                            <h1 class="tituloPregunta">Pregunta: ${cont}</h1>
                            <p class="cuerpoPregunta">${element.pregunta}</p>
                        </div>
                        <div class="respuesta contenido" id="respuestaContenido1">
                            <h1 class="tituloRespuesta">Respuesta: </h1>
                            <p class="cuerpoRespuesta">${element.respuesta}</p>
                        </div>
                    </div>
                </div>
            `;
            cont++;
        }

        document.getElementById("contenedorPregunta").innerHTML = contenedor;
    } catch (error) {
        peticionAChatGPT(tema)
    }
}