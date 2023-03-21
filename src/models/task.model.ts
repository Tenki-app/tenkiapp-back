
const { Schema, model } = require('mongoose');
import { pomodoroSchema } from './pomodoro.model';
const taskSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:false
  },
  state: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date_task: {
    type: String,
    required: true
  },
  date_created: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  is_pomodoro: {
    type: Boolean,
    required: true
  },
  pomodoro: {
    type: pomodoroSchema,
    required: true
  }
});

module.exports = model('tasks', taskSchema);
export {taskSchema};