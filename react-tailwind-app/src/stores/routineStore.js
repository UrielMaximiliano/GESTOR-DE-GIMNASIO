import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRoutineStore = create(
  persist(
    (set) => ({
      routines: [],
      selectedRoutine: null,
      isLoading: false,
      error: null,

      // Actions
      setRoutines: (routines) => set({ routines }),
      setSelectedRoutine: (routine) => set({ selectedRoutine: routine }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // CRUD Operations
      addRoutine: (routine) =>
        set((state) => ({
          routines: [...state.routines, { ...routine, id: Date.now() }],
        })),

      updateRoutine: (updatedRoutine) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === updatedRoutine.id ? updatedRoutine : routine
          ),
        })),

      deleteRoutine: (routineId) =>
        set((state) => ({
          routines: state.routines.filter((routine) => routine.id !== routineId),
        })),

      // Get routines by student
      getRoutinesByStudent: (studentId) => {
        const { routines } = useRoutineStore.getState();
        return routines.filter((routine) => routine.studentId === studentId);
      },

      // Get routines by type
      getRoutinesByType: (type) => {
        const { routines } = useRoutineStore.getState();
        return routines.filter((routine) => routine.type === type);
      },

      // Add exercise to routine
      addExerciseToRoutine: (routineId, exercise) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === routineId
              ? {
                  ...routine,
                  exercises: [...routine.exercises, { ...exercise, id: Date.now() }],
                }
              : routine
          ),
        })),

      // Update exercise in routine
      updateExerciseInRoutine: (routineId, exerciseId, updatedExercise) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === routineId
              ? {
                  ...routine,
                  exercises: routine.exercises.map((exercise) =>
                    exercise.id === exerciseId ? updatedExercise : exercise
                  ),
                }
              : routine
          ),
        })),

      // Delete exercise from routine
      deleteExerciseFromRoutine: (routineId, exerciseId) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === routineId
              ? {
                  ...routine,
                  exercises: routine.exercises.filter(
                    (exercise) => exercise.id !== exerciseId
                  ),
                }
              : routine
          ),
        })),
    }),
    {
      name: 'routine-storage',
    }
  )
);

export default useRoutineStore; 