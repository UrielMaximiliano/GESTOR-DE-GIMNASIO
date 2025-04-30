import { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import useStudentStore from '../stores/studentStore';
import usePaymentStore from '../stores/paymentStore';
import useMembershipStore from '../stores/membershipStore';

export default function Dashboard() {
  const { students } = useStudentStore();
  const { payments, pendingPayments } = usePaymentStore();
  const { activeMemberships, getExpiringMemberships } = useMembershipStore();

  const [expiringMemberships, setExpiringMemberships] = useState([]);

  useEffect(() => {
    setExpiringMemberships(getExpiringMemberships());
  }, [activeMemberships, getExpiringMemberships]);

  const totalMonthlyIncome = payments.reduce((total, payment) => {
    const paymentDate = new Date(payment.date);
    const now = new Date();
    return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
      ? total + payment.amount
      : total;
  }, 0);

  const stats = [
    {
      name: 'Alumnos Activos',
      value: students.length.toString(),
      icon: UserGroupIcon,
      change: '',
      changeType: 'positive',
    },
    {
      name: 'Ingresos Mensuales',
      value: `$${totalMonthlyIncome}`,
      icon: CurrencyDollarIcon,
      change: '',
      changeType: 'positive',
    },
    {
      name: 'Membresías por Vencer',
      value: expiringMemberships.length.toString(),
      icon: ClockIcon,
      change: '',
      changeType: 'negative',
    },
    {
      name: 'Pagos Pendientes',
      value: pendingPayments.length.toString(),
      icon: ExclamationCircleIcon,
      change: '',
      changeType: 'negative',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute p-3 bg-indigo-500 rounded-md">
                <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="flex items-baseline ml-16">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              {stat.change && (
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </p>
              )}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
