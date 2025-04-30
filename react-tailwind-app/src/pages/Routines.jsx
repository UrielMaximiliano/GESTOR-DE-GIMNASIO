import { useState } from 'react';
import {
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const routines = [
  {
    id: 1,
    student: 'Juan Pérez',
    type: 'Fuerza',
    exercises: [
      { name: 'Sentadillas', sets: 4, reps: 12, weight: '80kg', rest: '90s' },
      { name: 'Press de Banca', sets: 4, reps: 10, weight: '60kg', rest: '120s' },
      { name: 'Peso Muerto', sets: 3, reps: 8, weight: '100kg', rest: '180s' },
    ],
    schedule: 'Lunes, Miércoles, Viernes',
    duration: '60 min',
  },
  // Add more sample routines
];

export default function Routines() {
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Rutinas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestión de rutinas de entrenamiento para los alumnos.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5 inline-block mr-1" />
            Nueva Rutina
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Routine List */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Rutinas Activas</h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {routines.map((routine) => (
                  <li
                    key={routine.id}
                    className="py-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedRoutine(routine)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                          <UserGroupIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{routine.student}</p>
                        <p className="truncate text-sm text-gray-500">{routine.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {routine.schedule}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {routine.duration}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Routine Details */}
        {selectedRoutine && (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Detalles de la Rutina</h2>
              <div className="mt-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-base font-semibold text-gray-900">{selectedRoutine.student}</h3>
                  <p className="mt-1 text-sm text-gray-500">{selectedRoutine.type}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Ejercicios</h4>
                  <div className="mt-2">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                            Ejercicio
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Series
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Reps
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Peso
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Descanso
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedRoutine.exercises.map((exercise, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                              {exercise.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.sets}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.reps}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.weight}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.rest}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 