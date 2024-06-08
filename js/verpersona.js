(function () {
  let DB;
  let idCliente;
  const formulario = document.querySelector("#formulario");

  const nombreInput = document.querySelector("#nombre");
  const numeroInput = document.querySelector("#numero");
  const edadInput = document.querySelector("#edad");
  const sexoInput = document.querySelector("#sexo");
  const golpeInput = document.querySelector("#golpe");
  const hemorragiaInput = document.querySelector("#hemorragia");
  const atrapadoInput = document.querySelector("#atrapado");
  const malestarInput = document.querySelector("#malestar");
  const adicionalesInput = document.querySelector("#adicionales");
  const ritmoInput = document.querySelector("#ritmo");
  const temperaturaInput = document.querySelector("#temperatura");
  const cronicasInput = document.querySelector("#cronicas");
  const triageInput = document.querySelector("#triage");
  const estadoInput = document.querySelector("#estado");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    //
    formulario.addEventListener("submit", actualizarCliente);

    // Verificar si el cliente existe
    const parametrosURL = new URLSearchParams(window.location.search);
    idCliente = parametrosURL.get("id");
    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  function conectarDB() {
    // ABRIR CONEXIÓN EN LA BD:

    let abrirConexion = window.indexedDB.open("crm", 1);

    // si hay un error, lanzarlo
    abrirConexion.onerror = function () {
      console.log("Hubo un error");
    };

    // si todo esta bien, asignar a database el resultado
    abrirConexion.onsuccess = function () {
      // guardamos el resultado
      DB = abrirConexion.result;
    };
  }

  function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    console.log(objectStore);

    var request = objectStore.openCursor();
    request.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        if (cursor.value.id == id) {
          // pasar el que estamos editando...
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  function llenarFormulario(datosCliente) {
    const {
      nombre,
      numero,
      edad,
      sexo,
      golpe,
      hemorragia,
      atrapado,
      malestar,
      adicionales,
      ritmo,
      temperatura,
      cronicas,
      triage,
      estado,
    } = datosCliente;
    nombreInput.value = nombre;
    numeroInput.value = numero;
    edadInput.value = edad;
    sexoInput.value = sexo;
    golpeInput.value = golpe;
    hemorragiaInput.value = hemorragia;
    atrapadoInput.value = atrapado;
    malestarInput.value = malestar;
    adicionalesInput.value = adicionales;
    ritmoInput.value = ritmo;
    temperaturaInput.value = temperatura;
    cronicasInput.value = cronicas;
    triageInput.value = triage;
    estadoInput.value = estado;
  }

  function actualizarCliente(e) {
    e.preventDefault();
    window.location.href = "index.html";

  }


})();
