import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {toast} from 'react-toastify'
import Error from "./Error"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store"

export default function PatientForm() {
  const addPatient = usePatientStore(state => state.addPatient)
  const updatePatient = usePatientStore(state => state.upDatePatient)
  const activeId = usePatientStore(state => state.activeId)
  const patients = usePatientStore(state => state.patients)

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.find(patient => patient.id === activeId)
      if (activePatient) {
        setValue('name', activePatient.name)
        setValue('caretaker', activePatient.caretaker)
        setValue('email', activePatient.email)
        setValue('date', activePatient.date)
        setValue('symptoms', activePatient.symptoms)
      }
    }
  }, [activeId, patients, setValue])

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data)  
      toast('Paciente Actualizado Correctamente', {type: 'success'})
     
    } else {
      addPatient(data)
      toast.success('Paciente Registrado Correctamente')
    }
    reset()
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y{' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        {/* input nombre */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">Paciente</label>
          <input
            id="name"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register('name', { required: "El nombre del paciente es Obligatorio" })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>

        {/* input propietario */}
        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">Propietario</label>
          <input
            id="caretaker"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register('caretaker', { required: "El propietario es Obligatorio" })}
          />
          {errors.caretaker && <Error>{errors.caretaker.message}</Error>}
        </div>

        {/* input email */}
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">Email</label>
          <input
            id="email"
            className="w-full p-3 border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido'
              }
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        {/* input fecha */}
        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">Fecha Alta</label>
          <input
            id="date"
            className="w-full p-3 border border-gray-100"
            type="date"
            {...register('date', { required: "La fecha de alta es Obligatoria" })}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </div>

        {/* textarea síntomas */}
        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">Síntomas</label>
          <textarea
            id="symptoms"
            className="w-full p-3 border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register('symptoms', { required: "Los síntomas son Obligatorios" })}
          />
          {errors.symptoms && <Error>{errors.symptoms.message}</Error>}
        </div>

        {/* botón submit */}
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  )
}
