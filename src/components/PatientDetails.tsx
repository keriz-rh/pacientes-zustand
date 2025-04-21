import { Patient } from "../types";
import PatienDetailItem from "./PatienDetailItem";
import { usePatientStore } from "../store";

type PatientDetailsProps = {
    patient: Patient
}

function PatientDetails({ patient }: PatientDetailsProps) {

    const deletePatient = usePatientStore((state) => state.deletePatient)
    const getPatienById = usePatientStore((state) => state.getPatientById)
    const upDatePatient = usePatientStore((state) => state.upDatePatient)

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">

            <PatienDetailItem label="ID" data={patient.id} />
            <PatienDetailItem label="Nombre" data={patient.name} />
            <PatienDetailItem label="Propietario" data={patient.caretaker} />
            <PatienDetailItem label="Email" data={patient.email} />
            <PatienDetailItem label="fecha Alta" data={patient.date.toString()} />
            <PatienDetailItem label="Sintomas" data={patient.symptoms.toString()} />

            <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
                <button
                    type="button"
                    className="py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                onClick={() => getPatienById(patient.id)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                    onClick={() => deletePatient(patient.id)}
                >
                    Eliminar
                </button>

            </div>

        </div>
    );
}

export default PatientDetails;