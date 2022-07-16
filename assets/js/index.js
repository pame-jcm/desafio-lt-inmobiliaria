
let btnBuscar = document.getElementById("btnBuscar");

let idCuartos = document.getElementById("idCuartos");
let idMetrosDesde = document.getElementById("idMetrosDesde");
let idMetrosHasta = document.getElementById("idMetrosHasta");
let idCheckTodo = document.getElementById("idCheckTodo");

let myModal = new bootstrap.Modal(document.getElementById('myModal'));
let idMessage = document.getElementById("idMessage");
let myButton = document.getElementById('myButton')

document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
  myButton.focus()
})

btnBuscar.addEventListener("click",function(){

    /* Valida entrada de datos  */
    let isValid = validarDatos({cuartos: parseInt(idCuartos.value), metrosDesde: parseInt(idMetrosDesde.value), metrosHasta: parseInt(idMetrosHasta.value)});    
    if (!isValid && !idCheckTodo.checked){
      myModal.show();  
      return;
    }

    /*  Declaro variables a utilizar  */
    let propiedades = propiedadesJSON;
    let busqueda = [];
    let htmlPropiedades = '';
    
    if(!idCheckTodo.checked){
        /*  Aplica filtros del buscador en el arreglo de propiedades  */
        for(let prop of propiedades){
              if(prop.rooms === parseInt(idCuartos.value) 
                  && 
                  prop.m >= parseInt(idMetrosDesde.value)
                  &&
                  prop.m <= parseInt(idMetrosHasta.value)
                ){
                    busqueda.push(prop);
                }
          }
    }  

    propiedades = !idCheckTodo.checked ? busqueda: propiedades;

    for(let prop of propiedades){
          /*  Fabríca el template de las propiedades encontradas  */
          htmlPropiedades = `${htmlPropiedades}
                              <div class="propiedad">
                                  <div class="img" style="background-image: url('${prop.src}')"></div>
                                  <section>
                                      <h5>${prop.name}</h5>
                                          <div class="d-flex justify-content-between">
                                              <p>Cuartos: ${prop.rooms}</p>
                                              <p>Metros: ${prop.m}</p>
                                          </div>
                                      <p class="my-3">${prop.description}</p>
                                      <button class="btn btn-info ">Ver más</button>
                                  </section>
                              </div>` 
    }    
    
     
    /*  Asigna el total y el template de propiedades  */
    document.getElementById("idSpanTotal").innerHTML = propiedades.length;
    document.getElementById("idMessageFilter").innerHTML = propiedades.length > 0 ? "" : "No se encontraron Coincidencias";
    document.getElementById("idPropiedades").innerHTML = htmlPropiedades;

    if(propiedades.length == 0) {
        idMessage.innerHTML = "No se encontraron coincidencias";
        myModal.show();  
    }
});


validarDatos = function(data){
  let res = true;
  Object.keys(data).forEach(element => {
      if (data[element] === '' || data[element] === 0 || isNaN(data[element]) || data[element] === undefined){
  				idMessage.innerHTML = "Faltan campos por llenar";      
        	res = false;
          return res;
      }
  });
  
  return res;
};

document.addEventListener('DOMContentLoaded', function(){
  btnBuscar.click();
})