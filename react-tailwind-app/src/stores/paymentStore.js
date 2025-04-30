import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaymentStore = create(
  persist(
    (set) => ({
      payments: [],
      pendingPayments: [],
      selectedPayment: null,
      isLoading: false,
      error: null,

      // Actions
      setPayments: (payments) => set({ payments }),
      setPendingPayments: (payments) => set({ pendingPayments: payments }),
      setSelectedPayment: (payment) => set({ selectedPayment: payment }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // CRUD Operations for Payments
      addPayment: (payment) =>
        set((state) => ({
          payments: [...state.payments, { ...payment, id: Date.now() }],
        })),

      updatePayment: (updatedPayment) =>
        set((state) => ({
          payments: state.payments.map((payment) =>
            payment.id === updatedPayment.id ? updatedPayment : payment
          ),
        })),

      deletePayment: (paymentId) =>
        set((state) => ({
          payments: state.payments.filter((payment) => payment.id !== paymentId),
        })),

      // CRUD Operations for Pending Payments
      addPendingPayment: (payment) =>
        set((state) => ({
          pendingPayments: [...state.pendingPayments, { ...payment, id: Date.now() }],
        })),

      updatePendingPayment: (updatedPayment) =>
        set((state) => ({
          pendingPayments: state.pendingPayments.map((payment) =>
            payment.id === updatedPayment.id ? updatedPayment : payment
          ),
        })),

      deletePendingPayment: (paymentId) =>
        set((state) => ({
          pendingPayments: state.pendingPayments.filter(
            (payment) => payment.id !== paymentId
          ),
        })),

      // Get payments by student
      getPaymentsByStudent: (studentId) => {
        const { payments } = usePaymentStore.getState();
        return payments.filter((payment) => payment.studentId === studentId);
      },

      // Get pending payments by student
      getPendingPaymentsByStudent: (studentId) => {
        const { pendingPayments } = usePaymentStore.getState();
        return pendingPayments.filter((payment) => payment.studentId === studentId);
      },

      // Get payments by date range
      getPaymentsByDateRange: (startDate, endDate) => {
        const { payments } = usePaymentStore.getState();
        return payments.filter((payment) => {
          const paymentDate = new Date(payment.date);
          return paymentDate >= startDate && paymentDate <= endDate;
        });
      },

      // Get total revenue
      getTotalRevenue: () => {
        const { payments } = usePaymentStore.getState();
        return payments.reduce((total, payment) => total + payment.amount, 0);
      },

      // Get total pending payments
      getTotalPendingPayments: () => {
        const { pendingPayments } = usePaymentStore.getState();
        return pendingPayments.reduce((total, payment) => total + payment.amount, 0);
      },

      // Get overdue payments
      getOverduePayments: () => {
        const { pendingPayments } = usePaymentStore.getState();
        const today = new Date();
        return pendingPayments.filter((payment) => {
          const dueDate = new Date(payment.dueDate);
          return dueDate < today;
        });
      },

      // Mark payment as completed
      markPaymentAsCompleted: (paymentId) =>
        set((state) => {
          const payment = state.pendingPayments.find((p) => p.id === paymentId);
          if (!payment) return state;

          return {
            pendingPayments: state.pendingPayments.filter((p) => p.id !== paymentId),
            payments: [
              ...state.payments,
              {
                ...payment,
                status: 'Completado',
                completedDate: new Date().toISOString(),
              },
            ],
          };
        }),
    }),
    {
      name: 'payment-storage',
    }
  )
);

export default usePaymentStore; 