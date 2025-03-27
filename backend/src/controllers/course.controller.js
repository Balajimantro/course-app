const Course = require("../model/course");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { className, subject, board, latitude, longitude } = req.body;
    const course = new Course({
      className,
      subject,
      board,
      latitude,
      longitude,
      createdBy: req.user.id,
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCoursesByUser = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCourses = async (req, res) => {
  
  try {
    let { lat, long } = req.query;
  
    lat = parseFloat(lat);
    long = parseFloat(long);
    const radius = 10 / 3963.2; 

    const courses = await Course.find({
     
    });

    // latitude: { $gte: lat - radius, $lte: lat + radius },
    // longitude: { $gte: long - radius, $lte: long + radius },

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { className, subject, board, latitude, longitude } = req.body;
    const course = await Course.findById(req.params.id);
    if (course) {
      course.className = className;
      course.subject = subject;
      course.board = board;
      course.latitude = latitude;
      course.longitude = longitude;
      await course.save();
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}    

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

