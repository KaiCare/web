export const getKnowledge = (outputs: any) => {
  return outputs.map((output: any) => {
    return `Exercise title: ${output.exercise_title}. Description: ${output.exercise_description}.`;
  });
};
