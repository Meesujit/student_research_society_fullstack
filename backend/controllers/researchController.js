const Research = require('../models/Research');

exports.createResearch = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const research = new Research({
      title: req.body.title,
      description: req.body.description,
      status: 'pending',
      user: req.user.id,
      file: req.file.path, // Assuming you're saving the file
    });

    await research.save();
    res.status(201).json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getResearches = async (req, res) => {
  try {

    if (req.user.role === 'admin') {
      // Admin: Fetch all research papers
      const researches = await Research.find().populate('user', 'name email'); // Optionally, populate user info
      return res.json(researches);
    }

    // User: Fetch only their own research papers
    const researches = await Research.find({ user: req.user.id });
    res.json(researches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.approveResearch = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ msg: 'Research not found' });

    research.status = 'approved';
    await research.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteResearch = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ msg: 'Research not found' });

    await research.deleteOne({_id: req.params.id});
    res.json({ message: 'Research deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
