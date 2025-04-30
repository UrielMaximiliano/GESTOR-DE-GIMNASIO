import { useState } from 'react';
import {
  PlusIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import useMembershipStore from '../stores/membershipStore';
import toast from 'react-hot-toast';

export default function Memberships() {
  const {
    membershipTypes,
    addMembershipType,
    updateMembershipType,
    deleteMembershipType,
  } = useMembershipStore();

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);

  // Handlers for Membership Types
  const handleAddType = () => {
    setEditingType(null);
    setIsTypeModalOpen(true);
  };

  const handleEditType = (type) => {
    setEditingType(type);
    setIsTypeModalOpen(true);
  };

  const handleDeleteType = (typeId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este tipo de membresía?')) {
      deleteMembershipType(typeId);
      toast.success('Tipo de membresía eliminado correctamente');
    }
  };

  // Submit handler for modal
  const handleTypeSubmit = (data) => {
    if (editingType) {
      updateMembershipType({ ...data, id: editingType.id });
      toast.success('Tipo de membresía actualizado correctamente');
    } else {
      addMembershipType(data);
      toast.success('Tipo de membresía agregado correctamente');
    }
    setIsTypeModalOpen(false);
  };

  return (
    <div>
      <div className="justify-between sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Membresías</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestión de tipos de membresía.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleAddType}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Nueva Membresía
          </button>
        </div>
      </div>

      <div className="mt-8">
        {/* Membership Types */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Tipos de Membresía</h2>
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {membershipTypes.map((type) => (
                <div
                  key={type.id}
                  className="relative p-4 border rounded-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditType(type)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteType(type.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">${type.price}</p>
                  <p className="mt-1 text-sm text-gray-500">{type.duration}</p>
                  <ul className="mt-4 space-y-2">
                    {type.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-500">
                        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal */}
      {isTypeModalOpen && (
        <MembershipTypeForm
          membershipType={editingType}
          onSubmit={handleTypeSubmit}
          onClose={() => setIsTypeModalOpen(false)}
        />
      )}
    </div>
  );
}

// MembershipTypeForm component
function MembershipTypeForm({ membershipType, onSubmit, onClose }) {
  const [name, setName] = useState(membershipType?.name || '');
  const [price, setPrice] = useState(membershipType?.price || '');
  const [duration, setDuration] = useState(membershipType?.duration || '');
  const [features, setFeatures] = useState(membershipType?.features?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !duration) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    const featuresArray = features.split(',').map((f) => f.trim()).filter((f) => f.length > 0);
    onSubmit({ name, price: Number(price), duration, features: featuresArray });
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
        <div className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-lg font-semibold leading-6 text-gray-900">
              {membershipType ? 'Editar Tipo de Membresía' : 'Nueva Tipo de Membresía'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duración</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Características (separadas por coma)</label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
