import React, { useState, useEffect } from 'react';
import { saveWorkoutPlan } from './getApi.js';
import { getWorkoutPlan } from './getPlans.js';

function App() {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [exerciseSeries, setExerciseSeries] = useState('');

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      const workoutPlan = await getWorkoutPlan();
      setWorkoutPlan(workoutPlan);
    };

    fetchWorkoutPlan();
  }, []);

  const handleAddExercise = async () => {
    // Create a new exercise object
    const newExercise = {
      name: exerciseName,
      reps: exerciseReps,
      series: exerciseSeries
    };
    // Add the new exercise to the workout plan
    const newWorkoutPlan = [...workoutPlan, newExercise];
    setWorkoutPlan(newWorkoutPlan);
    // Clear the inputs
    setExerciseName('');
    setExerciseReps('');
    setExerciseSeries('');
    // Save the new workout plan to the API
    await saveWorkoutPlan(newWorkoutPlan);
  };

  return (
    <div>
      <h1>Workout Planner</h1>
      <input
        type="text"
        placeholder="Coloque o nome do exercício"
        value={exerciseName}
        onChange={(event) => setExerciseName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Coloque o número de repetições"
        value={exerciseReps}
        onChange={(event) => setExerciseReps(event.target.value)}
      />
      <input
        type="number"
        placeholder="Coloque o número de séries"
        value={exerciseSeries}
        onChange={(event) => setExerciseSeries(event.target.value)}
      />
      <button onClick={handleAddExercise}>Adicionar exercício</button>
      <ul>
        {workoutPlan.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.reps} reps - {exercise.series} series
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;