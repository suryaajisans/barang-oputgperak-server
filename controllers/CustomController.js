const { History } = require('../models')

class CustomController {
  static async historiesFetch(req, res, next) {
    try {
      const response = await History.findAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async historyDetail(req, res, next) {
    try {
      const response = await History.findByPk(+req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async historyCreate(req, res, next) {
    try {
      const payload = {
        name_item: req.body.name_item,
        type: req.body.type,
        piece: req.body.piece,
        stock: req.body.stock,
        username: req.body.username,
        date: req.body.date
      };

      const response = await History.create(payload);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomController;
