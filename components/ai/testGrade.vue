<template>
    <div>
      <h2 class="text-2xl font-bold mb-8">Test Answer Grader</h2>
      <form @submit.prevent="gradeAnswer">

        <TextInput type="text" id="question" label="Question" v-model="question" required/>
        <br />

        <label for="answer">Answer:</label><br/>
        <textarea id="answer" v-model="answer" required class="w-[400px]"></textarea>
        <br />

        <label for="gradeLevel">Grade Level:</label>
        <input type="number" id="gradeLevel" v-model="gradeLevel" required />
        <br />

        <button type="submit">Grade Answer</button>
      </form>

      <div v-if="graded">
        <h3>Grade: {{ grade }}</h3>
        <h4>Feedback:</h4>
        <p>{{ feedback }}</p>
      </div>
    </div>
  </template>

  <script>

  export default {
    data() {
      return {
        question: '',
        answer: '',
        gradeLevel: '',
        graded: false,
        grade: 0,
        feedback: '',
      };
    },
    methods: {
      async gradeAnswer() {
        const prompt = `Grade and provide feedback for the following answer to the question with a focus on grammar and spelling, then secondary is general writing tips and style"${this.question}" for a student at grade level ${this.gradeLevel}:\n\nAnswer: ${this.answer}\n\nGrade (0-100): `;
        const response = await $fetch('https://api.openai.com/v1/chat/completions', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer API HERE`,
          },
          method: 'POST',
          body: {
            model: 'gpt-3.5-turbo',
            messages: [{'role':'user', 'content': prompt}],
            },
        });
        const completion = response.choices[0].message.content;
        const [gradeValue, feedbackText] = completion.split('\n');
        this.grade = parseInt(gradeValue);
        this.feedback = feedbackText;
        this.graded = true;
      },
    },
  };
  </script>