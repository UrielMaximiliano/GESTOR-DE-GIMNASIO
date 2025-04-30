import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Alumnos Activos',
    value: '150',
    icon: UserGroupIcon,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Ingresos Mensuales',
    value: '$45,000',
    icon: CurrencyDollarIcon,
    change: '+8%',
    changeType: 'positive',
  },
  {
    name: 'Membresías por Vencer',
    value: '23',
    icon: ClockIcon,
    change: '-5%',
    changeType: 'negative',
  },
  {
    name: 'Pagos Pendientes',
    value: '12',
    icon: ExclamationCircleIcon,
    change: '+3%',
    changeType: 'negative',
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Actividad Reciente</h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-indigo-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          Nuevo alumno registrado
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          Juan Pérez se unió al gimnasio
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Hoy
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Próximas Renovaciones</h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-yellow-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          María García
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          Membresía vence en 3 días
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Pronto
                        </span>
                      </div>
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