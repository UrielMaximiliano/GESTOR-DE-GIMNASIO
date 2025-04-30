import { useState } from 'react';
import {
  PlusIcon,
  CreditCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const membershipTypes = [
  {
    id: 1,
    name: 'Mensual',
    price: 5000,
    duration: '30 días',
    features: ['Acceso ilimitado', 'Clases grupales', 'Entrenador personal'],
  },
  {
    id: 2,
    name: 'Trimestral',
    price: 12000,
    duration: '90 días',
    features: ['Acceso ilimitado', 'Clases grupales', 'Entrenador personal', '10% descuento'],
  },
  {
    id: 3,
    name: 'Anual',
    price: 40000,
    duration: '365 días',
    features: ['Acceso ilimitado', 'Clases grupales', 'Entrenador personal', '20% descuento', 'Locker personal'],
  },
];

const activeMemberships = [
  {
    id: 1,
    student: 'Juan Pérez',
    type: 'Mensual',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    status: 'Activa',
  },
  {
    id: 2,
    student: 'María García',
    type: 'Anual',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    status: 'Activa',
  },
  // Add more sample data
];

export default function Memberships() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Membresías</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestión de tipos de membresía y suscripciones activas.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5 inline-block mr-1" />
            Nueva Membresía
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Membership Types */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Tipos de Membresía</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {membershipTypes.map((type) => (
                <div
                  key={type.id}
                  className={`relative rounded-lg border p-4 cursor-pointer ${
                    selectedType?.id === type.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">${type.price}</p>
                  <p className="mt-1 text-sm text-gray-500">{type.duration}</p>
                  <ul className="mt-4 space-y-2">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-500">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Memberships */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Membresías Activas</h2>
            <div className="mt-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                          Alumno
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Tipo
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Inicio
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Fin
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {activeMemberships.map((membership) => (
                        <tr key={membership.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {membership.student}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{membership.type}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{membership.startDate}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{membership.endDate}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                membership.status === 'Activa'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {membership.status === 'Activa' ? (
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                              ) : (
                                <XCircleIcon className="h-4 w-4 mr-1" />
                              )}
                              {membership.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 