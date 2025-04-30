import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStudentStore = create(
  persist(
    (set) => ({
      students: [],
      selectedStudent: null,
      searchQuery: '',
      isLoading: false,
      error: null,

      // Actions
      setStudents: (students) => set({ students }),
      setSelectedStudent: (student) => set({ selectedStudent: student }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // CRUD Operations
      addStudent: (student) =>
        set((state) => ({
          students: [...state.students, { ...student, id: Date.now() }],
        })),

      updateStudent: (updatedStudent) =>
        set((state) => ({
          students: state.students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          ),
        })),

      deleteStudent: (studentId) =>
        set((state) => ({
          students: state.students.filter((student) => student.id !== studentId),
        })),

      // Filtered students based on search query
      getFilteredStudents: () => {
        const { students, searchQuery } = useStudentStore.getState();
        if (!searchQuery) return students;
        
        const query = searchQuery.toLowerCase();
        return students.filter(
          (student) =>
            student.name.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query) ||
            student.phone.includes(query)
        );
      },
    }),
    {
      name: 'student-storage',
    }
  )
);

export default useStudentStore; 