import { useState } from 'react';
import {
  PlusIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const payments = [
  {
    id: 1,
    student: 'Juan Pérez',
    amount: 5000,
    date: '2024-03-01',
    type: 'Mensualidad',
    status: 'Completado',
    method: 'Tarjeta',
  },
  {
    id: 2,
    student: 'María García',
    amount: 40000,
    date: '2024-01-01',
    type: 'Membresía Anual',
    status: 'Completado',
    method: 'Transferencia',
  },
  // Add more sample data
];

const pendingPayments = [
  {
    id: 1,
    student: 'Carlos Rodríguez',
    amount: 5000,
    dueDate: '2024-03-15',
    type: 'Mensualidad',
    daysOverdue: 0,
  },
  // Add more sample data
];

export default function Payments() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Pagos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestión de pagos y estado de cuentas de los alumnos.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5 inline-block mr-1" />
            Registrar Pago
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payment History */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Historial de Pagos</h2>
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
                          Monto
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Fecha
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Tipo
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {payment.student}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ${payment.amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.date}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.type}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                payment.status === 'Completado'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {payment.status === 'Completado' ? (
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                              ) : (
                                <XCircleIcon className="h-4 w-4 mr-1" />
                              )}
                              {payment.status}
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

        {/* Pending Payments */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Pagos Pendientes</h2>
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
                          Monto
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Vencimiento
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Días de Atraso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {payment.student}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ${payment.amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payment.dueDate}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                payment.daysOverdue > 0
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {payment.daysOverdue} días
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

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Detalles del Pago
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <strong>Alumno:</strong> {selectedPayment.student}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Monto:</strong> ${selectedPayment.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Fecha:</strong> {selectedPayment.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Tipo:</strong> {selectedPayment.type}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Método:</strong> {selectedPayment.method}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setSelectedPayment(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 