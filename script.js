
const botonProyectos = document.getElementById("ver-proyectos");
function mostrarProyectos(){
    const proyectosSection= document.getElementById("proyectos");
    proyectosSection.scrollIntoView({behavior:"smooth"});
}
botonProyectos.addEventListener("click",mostrarProyectos);

const linkPortafolio = document.getElementById("portafolio");
linkPortafolio.addEventListener("click",mostrarProyectos);

const linkAcerca = document.getElementById("acerca");
function mostrarSeccionAcerca(){
    const section= document.getElementById("inicio");
    section.scrollIntoView({behavior:"smooth"});
}
linkAcerca.addEventListener("click",mostrarSeccionAcerca);


const linkSkill = document.getElementById("skill");
function mostrarSeccionSkill(){
    const section= document.getElementById("skills");
    section.scrollIntoView({behavior:"smooth"});
}
linkSkill.addEventListener("click",mostrarSeccionSkill);



const linkExperiencia = document.getElementById("experiencias");
function mostrarSeccionExperiencia(){
    const section= document.getElementById("experiencia");
    section.scrollIntoView({behavior:"smooth"});
}
linkExperiencia.addEventListener("click",mostrarSeccionExperiencia);




const linkContacto = document.getElementById("contactos");
function mostrarSeccionContacto(){
    const section= document.getElementById("contacto");
    section.scrollIntoView({behavior:"smooth"});
}
linkContacto.addEventListener("click",mostrarSeccionContacto);



//cambiar tema

const botonTema= document.getElementById("btn-tema");
const cuerpoPagina= document.body;
function alternarTema(){
    if(cuerpoPagina.style.backgroundColor==="black"){
        cuerpoPagina.style.backgroundColor="white";
        cuerpoPagina.style.color="black";
    }else{
        cuerpoPagina.style.backgroundColor="black";
        cuerpoPagina.style.color="white";
    }
}
botonTema.addEventListener("click",alternarTema);

const botonCv = document.getElementById("btn-cv");
function descargarCv(){
    const link = document.createElement("a");
    link.href = "CV_Calliconde.pdf";
    link.download = "CV_Calliconde.pdf";
    link.click();
}
botonCv.addEventListener("click",descargarCv);



//ejemplo alerta al hacer click en un proyecto

const todasLasTarjetas  = document.querySelectorAll(".proyecto-card");
todasLasTarjetas.forEach(tarjeta=> {
    tarjeta.addEventListener("click",function (){
        const nombreProyecto = tarjeta.querySelector("h3").innerText;
        alert("Haz hecho click en el proyecto:"+ nombreProyecto);
    })
})

//entender la visibilidad de las variable y la memoria de las funciones
function  crearContadorDeProyectos(inicial){
    let contador =inicial;
    return {
        incrementar:function (){
            contador++;
            return `Ahora tienes ${contador} proyectos.`;
        },
        obtenerTotal:()=> contador
    };
}
const  miContador= crearContadorDeProyectos(4);
console.log(miContador.incrementar());
console.log(miContador.contador);

function crearRastreador(){
    let conteo=0;
    return function (){
        conteo++;
        return 'has intentado ver los proyectos $(conteo)';
    };
}

const rastrearClick = crearRastreador();
console.log(rastrearClick());
console.log(rastrearClick());

//mutaciones
const misProyectos=[
    {nombre:"E-commerce",techs:["React","Node.js"]},
    {nombre:"Blog Personal",techs:["Gatsby","GraphQL"]},
    {nombre:"App de tareas",techs:["Vue","Gatsby"]}
]

//usaremos reduce para contar ocurrencias de cada tecnologia en los proyectos

const stackStats = misProyectos.flatMap(p=> p.techs).reduce((acc,tech)=> {
    acc[tech] = (acc[tech] || 0)+1;
    return acc;
},{});
console.log(stackStats);

const proyectosReact = misProyectos.filter(p => p.techs.includes("React"));

const nombresProyectos= misProyectos.map(p=> p.nombre);

async function cargarProyectos(){
    try{
        const response = await fetch("https://api.github.com/users/sandracarrasco/repos");
        if(!response.ok){
            throw new Error("Error al cargar los proyectos");
        }
        const proyectos= await response.json();
        const contenedorProyectos= document.getElementById("contenedor-proyectos");
        contenedorProyectos.innerHTML=""; // limpiar
        proyectos.forEach(proyecto => {
            contenedorProyectos.innerHTML +=`
                <div class="proyecto-card">
                    <h3>${proyecto.name}</h3>
                    <p>${proyecto.description || "Sin descripción"}</p>
                    <a href="${proyecto.html_url}" target="_blank"> Ver en GitHub</a>
                </div>`;
        });
    }catch (error){
        console.log("Error:",error);
    }
}
cargarProyectos();