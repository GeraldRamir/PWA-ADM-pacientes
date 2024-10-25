const url='http://localhost:4000/pacientes'

// Enviar datos a la API

export const enviarDatos= async paciente=>{
    try {

        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(paciente),
            headers:{
                 'Content-Type': 'application/json'  
            }
        })


    } catch (error) {
        console.log(error)
        
    }

}

export const obtenerPacientes= async ()=>{
    try {

        const respuesta= await fetch(url)
        const resultado= await respuesta.json()
        return resultado
       
        
    } catch (error) {
        console.log(error)

        
    }
}

export const eliminarPaciente= async id=>{
    await fetch(`${url}/${id}`,{
        method: 'DELETE'
    })


}

export const editarPaciente= async id=>{
    
    try {
        const resultado= await fetch(`${url}/${id}`)
        const paciente= await resultado.json()
        return paciente

    } catch (error) {
        console.log(error)
        
    }
    console.log(paciente)
}
export const actualizarPaiente= async paciente=>{
    const {id}= paciente
   
    try {
        await fetch(`${url}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(paciente),
            headers:{
                'Content-Type': 'application/json'
            }

        })
        
    } catch (error) {
        console.log(error)
        
    }
}

