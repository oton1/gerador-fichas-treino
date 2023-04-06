// workoutPlanModule.js

const workoutPlanModule = (() => {
    // Initialize an empty object to store workout plans
    const users = {};
  
    // Function to create a new user and their workout plan
    const createUser = (userId) => {
      users[userId] = {
        workoutPlan: [],
      };
    };
  
    // Function to add an exercise to a user's workout plan
    const addExercise = (userId, exercise) => {
      // If the user doesn't exist, create a new user
      if (!users[userId]) {
        createUser(userId);
      }
      // Add the exercise to the user's workout plan
      users[userId].workoutPlan.push(exercise);
    };
  
    // Function to remove an exercise from a user's workout plan
    const removeExercise = (userId, index) => {
      // If the user doesn't exist, return
      if (!users[userId]) {
        return;
      }
      // Remove the exercise from the user's workout plan
      users[userId].workoutPlan.splice(index, 1);
    };
  
    // Function to get a user's workout plan
    const getWorkoutPlan = (userId) => {
      // If the user doesn't exist, return an empty array
      if (!users[userId]) {
        return [];
      }
      // Return the user's workout plan
      return users[userId].workoutPlan;
    };
  
    return {
      createUser,
      addExercise,
      removeExercise,
      getWorkoutPlan,
    };
  })();
  
  module.exports = workoutPlanModule;
  