const Tour = require('../models/tourModel');
// const fs = require('fs');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// 2) ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.query);
    // BUILD QUERY
    // 1A）Filtering
    const queryObj = {...req.query}
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el])

    // 2B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));
    // 2) Sorting 
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting 
    if (req.query.fields) {
       const fields = req.query.fields.split(',').join(' ');
       query = query.select(fields);
    } else {
      // 减去带下划线v的项
      query = query.select('-__v');
    }

    // 4）Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=3&limit10, 1-10, page 1, 11-20, page 2, 21-30, page 3
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // EXECUTE QUERY
    const tours = await query;

    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    // SEND RESPONSE
    res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  }); 
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getTour = async (req, res) => {
  // const id = +req.params.id;

  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.createTour = async (req, res) => {
  // console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
  

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
  
};

exports.deleteTour = async (req, res) => {
  // const id = +req.params.id;

  try {
    // const tour = await Tour.deleteOne({id: req.params.id})
    await Tour.findByIdAndDelete(req.params.id);

    // 204表示没有内容，不发送任何内容
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};