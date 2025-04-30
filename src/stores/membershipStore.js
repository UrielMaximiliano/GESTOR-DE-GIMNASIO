import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMembershipStore = create(
  persist(
    (set) => ({
      membershipTypes: [],
      activeMemberships: [],
      selectedMembership: null,
      isLoading: false,
      error: null,

      // Actions
      setMembershipTypes: (types) => set({ membershipTypes: types }),
      setActiveMemberships: (memberships) => set({ activeMemberships: memberships }),
      setSelectedMembership: (membership) => set({ selectedMembership: membership }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // CRUD Operations for Membership Types
      addMembershipType: (type) =>
        set((state) => ({
          membershipTypes: [...state.membershipTypes, { ...type, id: Date.now() }],
        })),

      updateMembershipType: (updatedType) =>
        set((state) => ({
          membershipTypes: state.membershipTypes.map((type) =>
            type.id === updatedType.id ? updatedType : type
          ),
        })),

      deleteMembershipType: (typeId) =>
        set((state) => ({
          membershipTypes: state.membershipTypes.filter((type) => type.id !== typeId),
        })),

      // CRUD Operations for Active Memberships
      addActiveMembership: (membership) =>
        set((state) => ({
          activeMemberships: [...state.activeMemberships, { ...membership, id: Date.now() }],
        })),

      updateActiveMembership: (updatedMembership) =>
        set((state) => ({
          activeMemberships: state.activeMemberships.map((membership) =>
            membership.id === updatedMembership.id ? updatedMembership : membership
          ),
        })),

      deleteActiveMembership: (membershipId) =>
        set((state) => ({
          activeMemberships: state.activeMemberships.filter(
            (membership) => membership.id !== membershipId
          ),
        })),

      // Get membership by student
      getMembershipByStudent: (studentId) => {
        const { activeMemberships } = useMembershipStore.getState();
        return activeMemberships.find((membership) => membership.studentId === studentId);
      },

      // Get memberships by type
      getMembershipsByType: (typeId) => {
        const { activeMemberships } = useMembershipStore.getState();
        return activeMemberships.filter((membership) => membership.typeId === typeId);
      },

      // Get expiring memberships
      getExpiringMemberships: (daysThreshold = 7) => {
        const { activeMemberships } = useMembershipStore.getState();
        const today = new Date();
        return activeMemberships.filter((membership) => {
          const endDate = new Date(membership.endDate);
          const daysUntilExpiration = Math.ceil(
            (endDate - today) / (1000 * 60 * 60 * 24)
          );
          return daysUntilExpiration <= daysThreshold && daysUntilExpiration >= 0;
        });
      },

      // Get expired memberships
      getExpiredMemberships: () => {
        const { activeMemberships } = useMembershipStore.getState();
        const today = new Date();
        return activeMemberships.filter((membership) => {
          const endDate = new Date(membership.endDate);
          return endDate < today;
        });
      },
    }),
    {
      name: 'membership-storage',
    }
  )
);

export default useMembershipStore; 