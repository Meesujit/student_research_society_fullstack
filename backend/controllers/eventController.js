const Event = require('../models/Event');


exports.createEvent = async (req, res) => {
  console.log("creatEvent called: ", req.body);
  const { name, description, date } = req.body;

  if(!req.user){
    return res.status(401).json({ message: 'User Not Authenticated' });
  }

  try {
    const event = new Event({
      name,
      description,
      date,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
    .populate('participants', 'name email')
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.participateInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already participated' });
    }
    
    event.participants.push(req.user.id);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
