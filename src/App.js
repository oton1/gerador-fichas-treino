import React, { useState, useEffect, useRef } from 'react';
import { saveWorkoutPlan } from './getApi.js';
import { getWorkoutPlan } from './getPlans.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import workoutPlanModule from './workplanmodule.js';

function App() {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [exerciseSeries, setExerciseSeries] = useState('');
  const workoutPlanRef = useRef(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      const storedWorkoutPlan = localStorage.getItem('workoutPlan');
      if (storedWorkoutPlan) {
        setWorkoutPlan(JSON.parse(storedWorkoutPlan));
      } else {
        const workoutPlan = await getWorkoutPlan();
        setWorkoutPlan(workoutPlan);
      }
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
    localStorage.setItem('workoutPlan', JSON.stringify(newWorkoutPlan));
  };
  
  const handleRemoveExercise = async (index) => {
    const newWorkoutPlan = [...workoutPlan];
    newWorkoutPlan.splice(index, 1);
    setWorkoutPlan(newWorkoutPlan);
    await saveWorkoutPlan(newWorkoutPlan);
  };
  
  function handleExportPDF () {
    const input = workoutPlanRef.current;
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('treino{fulano}.pdf');
    });
  }


  return (
    <div>
      <h1>Gerador de Fichas</h1>
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
      <button onClick={handleExportPDF}>Exportar arquivo como PDF</button>
      <ul ref={workoutPlanRef}>
        {workoutPlan.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.reps} reps - {exercise.series} series
            <button onClick={() => handleRemoveExercise(index)}>Remover exercício</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;