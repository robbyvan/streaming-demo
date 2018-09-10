const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Objectid = mongoose.Schema.ObjectId;

const CameraSchema = new mongoose.Schema({
  name: String,
  public: Boolean,
  userId: String,
  live: { type: Boolean, default: false },
  streamingKey: { type: Objectid, default: new ObjectId() },
  connected: { type: Boolean, default: false },
  lastConnected: { type: String, default: '' },
  meta: {
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
  }
});

CameraSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Camera', CameraSchema);