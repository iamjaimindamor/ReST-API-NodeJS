//importing services.....
const userService = require(`../services/userService`);

//again class userController for fulfilling res. and req. and export them
//NOTE: Business Logic is never defined in controller...

class UserController {
  //create....
  async create(req, res) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
      console.log("New Entry Created...");
    } catch (error) {
      res.status(500).json({ error: 'FAILED in create fun' });
    }
  }

  //reading.....
  async findAll(req, res) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'no data found' });
    }
  }

  //reading specific....
  async findById(req, res) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'no data found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'failed in findbyfun' });
    }
  }

  async findname(req, res) {
    try {
      const name = req.params.name;
      console.log('Username from route parameter:', req.params.name);
      const user = await userService.findOne({ name });
      if (!user) return res.status(404).json({ error: 'no data found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Hiii there testing name' });
    }
  }

  //updating...
  async update(req, res) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: 'no data found' });
      console.log("User Updated../");
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'failed in updatefun' });
    }
  }

  //deleting...
  async delete(req, res) {
    try {
      const user = await userService.delete(req.params.id);
      if (!user) return res.status(404).json({ error: 'no data found' });
      res.json({ message: 'USER DELETED'});
    } catch (error) {
      res.status(500).json({ error: 'failed in deletefun' });
    }
  }
};


module.exports = new UserController();

