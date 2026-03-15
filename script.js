
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

function animateSkills() {
    document.querySelectorAll(".skill-fill").forEach((bar) => {
        const rect = bar.closest(".skill-card").getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            bar.style.width = bar.style.getPropertyValue("--pct") ||
                getComputedStyle(bar).getPropertyValue("--pct");
        }
    });
}
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add("visible");
        }
    });
    animateSkills();
}
document.querySelectorAll(
    ".about-card, .stat, .skill-card, .timeline-item, .proyecto-card, .contact-info, #form-contacto"
).forEach((el) => el.classList.add("reveal"));

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

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

const formulario = document.getElementById("form-contacto");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;

    alert("Mensaje enviado por " + nombre);

    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Mensaje:", mensaje);

    formulario.reset();
});

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
/*function  crearContadorDeProyectos(inicial){
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

const nombresProyectos= misProyectos.map(p=> p.nombre);*/

async function cargarProyectos() {
    const contenedor = document.getElementById("contenedor-proyectos");
    try {
        const response = await fetch("https://api.github.com/users/sandracarrasco/repos?sort=updated&per_page=12");
        if (!response.ok) throw new Error("Error al cargar proyectos");
        const repos = await response.json();

        contenedor.innerHTML = "";

        if (!repos.length) {
            contenedor.innerHTML = `<p style="font-family: var(--font-mono); color: var(--text-dim); grid-column: 1/-1;">// No se encontraron repositorios públicos.</p>`;
            return;
        }

        repos.forEach((repo, i) => {
            const card = document.createElement("div");
            card.className = "proyecto-card reveal";
            card.style.animationDelay = `${i * 0.08}s`;
            card.innerHTML = `
        <h3>${repo.name.replace(/-/g, " ").toUpperCase()}</h3>
        <p>${repo.description || "Sin descripción disponible."}</p>
        <a href="${repo.html_url}" target="_blank">→ VER EN GITHUB</a>
      `;
            card.addEventListener("click", () => window.open(repo.html_url, "_blank"));
            contenedor.appendChild(card);
        });

        // Re-run reveal observer for new cards
        revealOnScroll();

    } catch (err) {
        console.error("Error:", err);
        contenedor.innerHTML = `
      <div class="proyecto-card"><h3>PROYECTO WEB QA</h3><p>Suite de automatización con Selenium y Playwright para testing de regresión.</p></div>
      <div class="proyecto-card"><h3>BACKEND API</h3><p>API RESTful desarrollada en Python con autenticación JWT y base de datos PostgreSQL.</p></div>
      <div class="proyecto-card"><h3>TEST FRAMEWORK</h3><p>Framework de testing personalizado con reportes automáticos y CI/CD integrado.</p></div>
    `;
    }
}

cargarProyectos();
