
const authService = require(`../services/authService`);

class AuthController {

  //find all users.........................................................................
  async findAll(req, res) {
    try {
      const users = await authService.findAll();
      res.json(users);
    } catch (error) {
      console.log("515151561sd6")
      res.status(500).json({ error: 'no data found' });
    }
  }

  //Registration API
  async create(req, res) {
    try {
      const user = await authService.create(req, res
      );
      res.status(201).json({ user });
    } catch (err) {
      console.log(err);
    }
  };

  //Login API........................................................................................................
  async validate(req, res) {
    try {
      const user = await authService.validate(req, res);

    } catch (err) {
      console.log(err);

    }
  }

  //refresh
  async refresh(req,res){
    try {
      const user = await authService.refresh(req,res);
    } catch (error) {
      throw error;
    }
  }
}


module.exports = new AuthController();

