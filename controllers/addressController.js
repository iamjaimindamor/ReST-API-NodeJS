const addService = require(`../services/addressService`);

//>>>>>>>>>>>    ADDRESS CRUD FUNCTIONALITY <<<<<<<<<<<<<<<<//

class addressController {
  //create....
  async create(req, res) {
    try {
      const address = await addService.create(req.body);
      res.status(201).json(address);
      console.log("New Entry Created...");
    } catch (error) {
      res.status(500).json({ error: 'FAILED in create fun address1213' });
    }
  }

  //reading all address details using findAll method.....
  async findAll(req, res) {
    try {
      const addresses = await addService.findAll();
      res.json(addresses);
    } catch (error) {
      console.log("515151561sd6 in address")
      res.status(500).json({ error: 'no data found' });
    }
  }

  //reading specific by using [findById() in which we pass id by requesting from the header parameter from user request] ....
  async findById(req, res) {
    try {
      const address = await addService.findById(req.params.id);
      if (!address) return res.status(404).json({ error: 'no data found' });
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: 'failed in findbyfun' });
    }
  }

  async findbyaddid(req,res){
    try {
      const address = await addService.findbyaddid(req.params.add_id);
      if (!address) return res.status(404).json({ error: 'no data found' });
      res.json(address);
      
    } catch (error) {
      throw error;
    }
  }

  //updating...
  async update(req, res) {
    try {
      const address = await addService.update(req.params.id, req.body);
      if (!address) return res.status(404).json({ error: 'no data found' });
      console.log("USER ADDRESS UPDATED..../")
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: 'failed in updatefun' });
    }
  }
  //deleting...
  async delete(req, res) {
    try {
      const address = await addService.delete(req.params.id);
      if (!address) return res.status(404).json({ error: 'no data found' });
      res.json({ message: 'USER DELETED' });
    } catch (error) {
      res.status(500).json({ error: 'failed in deletefun' });
    }
  }

};

module.exports = new addressController();