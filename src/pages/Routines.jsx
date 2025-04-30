import { useState } from 'react';
import {
  PlusIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import useRoutineStore from '../stores/routineStore';
import toast from 'react-hot-toast';

export default function Routines() {
  const {
    routines,
    addRoutine,
    updateRoutine,
    deleteRoutine,
  } = useRoutineStore();

  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);

  const handleAddRoutine = () => {
    setEditingRoutine(null);
    setIsModalOpen(true);
  };

  const handleEditRoutine = (routine) => {
    setEditingRoutine(routine);
    setIsModalOpen(true);
  };

  const handleDeleteRoutine = (routineId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta rutina?')) {
      deleteRoutine(routineId);
      toast.success('Rutina eliminada correctamente');
    }
  };

  return (
    <div>
      <div className="justify-between sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Rutinas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestión de rutinas de entrenamiento para los alumnos.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleAddRoutine}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Nueva Rutina
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        {/* Routine List */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Rutinas Activas</h2>
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {routines.map((routine) => (
                  <li
                    key={routine.id}
                    className="py-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedRoutine(routine)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full">
                          <UserGroupIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{routine.student}</p>
                        <p className="text-sm text-gray-500 truncate">{routine.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {routine.schedule}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {routine.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRoutine(routine);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRoutine(routine.id);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
