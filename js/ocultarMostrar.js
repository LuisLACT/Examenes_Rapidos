function mostrarRespuesta() {
    document.getElementById("preguntaContenido").hidden = true;
    document.getElementById("respuestaContenido").hidden = false;
}

function mostrarPregunta() {
    document.getElementById("preguntaContenido").hidden = false;
    document.getElementById("respuestaContenido").hidden = true;
}