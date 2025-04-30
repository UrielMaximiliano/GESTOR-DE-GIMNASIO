import { useState, useEffect } from 'react';

export default function RoutineForm({ routine, onSubmit, onClose }) {
  const [student, setStudent] = useState(routine?.student || '');
  const [type, setType] = useState(routine?.type || '');
  const [schedule, setSchedule] = useState(routine?.schedule || '');
  const [duration, setDuration] = useState(routine?.duration || '');
  const [exercises, setExercises] = useState(routine?.exercises || []);

  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [rest, setRest] = useState('');

  useEffect(() => {
    if (routine) {
      setStudent(routine.student || '');
      setType(routine.type || '');
      setSchedule(routine.schedule || '');
      setDuration(routine.duration || '');
      setExercises(routine.exercises || []);
    }
  }, [routine]);

  const addExercise = () => {
    if (!exerciseName) {
      alert('Por favor, ingrese el nombre del ejercicio.');
      return;
    }
    setExercises([
      ...exercises,
      { id: Date.now(), name: exerciseName, sets, reps, weight, rest },
    ]);
    setExerciseName('');
    setSets('');
    setReps('');
    setWeight('');
    setRest('');
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };
