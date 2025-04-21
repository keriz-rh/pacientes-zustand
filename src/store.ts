import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { v4 as uuidv4 } from 'uuid'
import { DraftPatient, Patient } from "./types"

type PatientState = {
  patients: Patient[]
  activeId: Patient['id']
  addPatient: (data: DraftPatient) => void
  deletePatient: (id: string) => void
  getPatientById: (id: string) => Patient | undefined
  upDatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(
      persist(
        (set, get) => ({
          patients: [],
          activeId: '',
          addPatient: (data) => {
            const newPatient = createPatient(data)
            set((state) => ({
              patients: [...state.patients, newPatient]
            }), false, 'addPatient')
          },
          deletePatient: (id) => {
            set((state) => ({
              patients: state.patients.filter(patient => patient.id !== id)
            }), false, 'deletePatient')
          },
          getPatientById: (id) => {
            // Primero encontramos el paciente
            const patient = get().patients.find(patient => patient.id === id)
            // Actualizamos el activeId
            set({ activeId: id })
            // Retornamos el paciente encontrado (o undefined si no existe)
            return patient
          },
          upDatePatient: (data) => {
            set((state) => ({
              patients: state.patients.map(patient =>
                patient.id === state.activeId ? { id: state.activeId, ...data } : patient
              ),
              activeId: ''
            }))
          }
        }),
        {
          name: 'patient-storage'
        }
      )
    )
  )
