document.getElementById("formulario").addEventListener("submit", crear);
//funcion crear

function crear(e){
    titulo=document.getElementById("titulo").value
    descripcion=document.getElementById("descripcion").value
    /* precio=document.getElementById("precio").value */

    let libro ={
        titulo,
        descripcion
        /* precio */
    }

    if(localStorage.getItem("libros") === null){
        let libros =[]
        libros.push(libro)
        localStorage.setItem("libros", JSON.stringify(libros))
    } else{
        let libros=JSON.parse(localStorage.getItem("libros"))
        libros.push(libro)
        localStorage.setItem("libros", JSON.stringify(libros))
    }

    leer();
    document.getElementById("formulario").reset();
    console.log("Libro guardado correctamente")
    e.preventDefault()

    /* document.getElementById("formulario").reset();
    e.preventDefault() */
}

//funcion "leer"
function leer(){
    let libros =JSON.parse(localStorage.getItem("libros"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < libros.length; i ++){
        let titulo= libros[i].titulo
        let descripcion=libros[i].descripcion
        /* let precio=libros[i].precio */

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${titulo}</td>
            <td>${descripcion}</td>
            
            <td><button onclick="eliminar('${titulo}')" class="btn btn-danger">Eliminar</button></td> 
            <td><button onclick="editar('${titulo}')" class="btn btn-success">Editar</button></td> 
        </tr>
        `
    }
}

//funcion editar
function editar(titulo){
    let libros =JSON.parse(localStorage.getItem("libros"));
    for(let i=0; i < libros.length; i++){
        if (libros[i].titulo === titulo){
            document.getElementById("body").innerHTML =`
            <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Editar libro</h2>
                    </div>
                    <div class="card-body">
                        <form >
                            <div class="form-group">
                                <input type="text" id="newtitulo" class="form-control my-3" placeholder="${libros[i].titulo}">
                            </div>
                            <div class="form-group">
                                <textarea id="newdescripcion" class="form-control my-3" placeholder="${libros[i].descripcion}"></textarea>
                            </div>
                            
                        </form>
                        <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                        <button class="btn btn-primary" onclick="vistaPrincipal()">Cancelar</button>
                    </div>
                </div>
            
            `
        }

    }
}

//crear la funcion actualizar

function actualizar(i){
    let libros = JSON.parse(localStorage.getItem("libros"));
    libros[i].titulo=document.getElementById("newtitulo").value;
    libros[i].descripcion=document.getElementById("newdescripcion").value;
    /* libros[i].precio=document.getElementById("newprecio").value; */

        localStorage.setItem("libros", JSON.stringify(libros));
        vistaPrincipal();

}

//crear la funcion eliminar
function eliminar(titulo){
    let libros =JSON.parse(localStorage.getItem("libros"));
    for(let i=0; i < libros.length; i ++){
        if (libros[i].titulo === titulo){
            libros.splice(i,1);
        }
    
    }

localStorage.setItem("libros", JSON.stringify(libros));
leer();
}

//funcion para mostrar la interfaz principal
function vistaPrincipal(){ 
    document.getElementById("body").innerHTML = `<div class="row">
    <div class="col-md-5">
        <div class="card">
            <div class="card-header">
                <h2>Agregar nuevo libro</h2>
            </div>
            <div class="card-body">
                <form id="formulario">
                    <div class="form-group">
                        <input type="text" id="titulo" class="form-control my-3" placeholder="Ingresar título">
                    </div>
                    <div class="form-group">
                        <textarea id="descripcion" class="form-control my-3" placeholder="Ingresar descripción"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </form>

            </div>
        </div>
    </div>
    <div class="col-md-6">
        <table class="table caption-top bg-light">
            <thead>
              <tr>
                <th scope="col">Tarea</th>
                <th scope="col">Descripción</th>
                
              </tr>
            </thead>
            <tbody id="tbody">
              <tr>
                <td>Elaborar proyecto 2 CRUD</td>
                <td>Revisar contenido en Teams</td>
                
              </tr>
            </tbody>
          </table>
    </div>
</div>`
leer();
}

leer();