const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TASK_STATUS = ['todo', 'completed'];

let todoSchema = new Schema({
    todoId: {
      type: String,
      default: '',
      index: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      required: [true, 'description cannot be blank'],
    },
    status: {
      type: String,
      default: 'todo',
      enum: {values: TASK_STATUS, message: 'status is required and it can be either todo or completed'},
      trim: true
    },
    projectId: {
        type: String,
        default: '',
        required: true
        // type: Schema.Types.ObjectId,
        // ref: 'Project'
    },
    createdOn: {
      type: Date,
      default: '',
    },
    updatedOn: {
      type: Date,
      default: ''
    }
});
  
mongoose.model('Todo', todoSchema);