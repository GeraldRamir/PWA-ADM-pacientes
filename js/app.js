import { eliminarPaciente, enviarDatos, obtenerPacientes, editarPaciente, actualizarPaiente } from "./API.js"
import { mostrarAlerta } from "./funciones.js"

(function(){

    const formulario= document.querySelector('#formulario-cita')
    const mascotaInput= document.querySelector('#paciente')
    const propietarioInput= document.querySelector('#propietario')
    const emailInput= document.querySelector('#email')
    const fechaInput= document.querySelector('#fecha')
    const sintomasInput= document.querySelector('#sintomas')
    const contenedorCitas= document.querySelector('#citas')
    let editando = false;
    let idPaciente;


    const formularioInput= document.querySelector('#formulario-cita input[type="submit"]')

    document.addEventListener('DOMContentLoaded', ()=>{
        mostrarPacientes()

        formulario.addEventListener('submit',validarFormulario)
        // formularioInput.addEventListener('click',validarPaciente)
    })

    async function validarFormulario(e) {
        e.preventDefault();
    
        const mascota = mascotaInput.value;
        const propietario = propietarioInput.value;
        const email = emailInput.value;
        const fecha = fechaInput.value;
        const sintomas = sintomasInput.value;
    
        const ObjPaciente = {
            mascota,
            propietario,
            email,
            fecha,
            sintomas
        };
    
        if (Object.values(ObjPaciente).some(campo => campo === '')) {
            mostrarAlerta('Todos los campos requiren ser llenados', 'error', formulario);
            return;
        }
    
        mostrarAlerta('Se llenaron todos los campos', 'success', formulario);
    
        if (editando) {
            ObjPaciente.id = idPaciente; // Añadimos el ID para editar
            await actualizarPaiente(ObjPaciente);
            formularioInput.value = 'Agregar Paciente';
            editando = false; // Cambiamos a modo agregar
        } else {
            await enviarDatos(ObjPaciente);
        }
    
        formulario.reset();
        mostrarPacientes();
    }
    
    async function mostrarPacientes(){

        const pacientes= await obtenerPacientes()
        contenedorCitas.addEventListener('click', mostrarEliminar)
        contenedorCitas.addEventListener('click', editarCita)
      

        pacientes.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.mascota}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            // Botones de Eliminar y editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700','text-white',
                 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');

            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnEditar.id= cita.id


            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.id= cita.id
            console.log(btnEliminar)
            
         


            const contenedorBotones = document.createElement('DIV')
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10')

            contenedorBotones.appendChild(btnEditar)
            contenedorBotones.appendChild(btnEliminar)
        
            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones)
            contenedorCitas.appendChild(divCita);
        });  
            
    }

    function mostrarEliminar(e){
      
        if(e.target.classList.contains('bg-red-600')){
            const pacienteID= e.target.id
            
            eliminarPaciente(pacienteID)

            return
        }

    }
    async function editarCita(e) {
        if (e.target.classList.contains('bg-indigo-600')) {
            idPaciente = e.target.id;
            const paciente = await editarPaciente(idPaciente);
            actualizarCita(paciente);
            formularioInput.value = 'Guardar cambios';
            editando = true; // Activamos el modo de edición
        }
    }
    
    
    function actualizarCita(cliente){
        const {mascota, propietario, email, fecha, sintomas}= cliente
        mascotaInput.value= mascota
        propietarioInput.value= propietario
        emailInput.value= email
        fechaInput.value= fecha
        sintomasInput.value= sintomas
        // idInput.value= i


    }
    // async function validarPaciente(e){

    //     e.preventDefault()
    //     const cliente={
    //         mascota: mascotaInput.value,
    //         propietario: propietarioInput.value,
    //         email: emailInput.value,
    //         fecha: fechaInput.value,
    //         sintomas: sintomasInput.value
    //         // id: idInput.value
    //     }
    //     if(Object.values(cliente).includes('')){
    //         mostrarAlerta('Todos los campos son obligatorios', 'error', formulario)
    //         return
    //     }
    //     await actualizarPaiente(cliente)
    //     formulario.reset()
    // }


})()