import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import useStudentStore from '../stores/studentStore';
import StudentForm from '../components/students/StudentForm';
import toast from 'react-hot-toast';

export default function Students() {
  const {
    students,
    searchQuery,
    setSearchQuery,
    getFilteredStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudentStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const filteredStudents = getFilteredStudents();

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      deleteStudent(studentId);
      toast.success('Alumno eliminado correctamente');
    }
  };

  const handleSubmit = (data) => {
    if (selectedStudent) {
      updateStudent({ ...data, id: selectedStudent.id });
      toast.success('Alumno actualizado correctamente');
    } else {
      addStudent({
        ...data,
        lastPayment: new Date().toISOString().split('T')[0],
      });
      toast.success('Alumno agregado correctamente');
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Alumnos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los alumnos registrados en el gimnasio.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleAddStudent}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5 inline-block mr-1" />
            Agregar Alumno
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Buscar alumnos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Teléfono
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Membresía
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Estado
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Último Pago
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {student.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.membership}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.lastPayment}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <StudentForm
          student={selectedStudent}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
} 