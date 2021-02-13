const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let projectSchema = new Schema({
    projectId: {
      type: String,
      default: '',
      index: true,
      unique: true,
      required: true
    },
    title: {
      type: String,
      default: '',
      trim: true,
      required: [true, 'Project title cannot be blank'],
    },
    createdOn: {
      type: Date,
      default: '',
    },
    updatedOn: {
        type: Date,
        default: ''
    },
    listOfTodos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Todo'
      }
    ],
    createdBy: {
        type: String,
        default: ''
    },
});
  
mongoose.model('Project', projectSchema);