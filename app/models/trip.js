var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('underscore');

var TripSchema = new Schema({
    trip_id:            String,
    start_station:   { type: String},
    end_station:     { type: String},
    start_time:      { type: String},
    end_time:        { type: String},
    duration:        { type: String},
    created_at:      { type: Date, default: Date.now }
});

mongoose.model('Trip', TripSchema);
