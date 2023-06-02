const express = require('express');
const router = express.Router();
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  checkID,
  checkBody
} = require('../controllers/tourController');

router.param('id', checkID);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

// Before the tour is created, check the body
router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').patch(updateTour).delete(deleteTour).get(getTour);
module.exports = router;
