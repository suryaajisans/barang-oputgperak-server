const {
  Type_Item,
  Item,
  Piece_Item,
  History,
  User,
  Department,
} = require('../models');
class TypeController {
  static async typeFetch(req, res, next) {
    try {
      const response = await Type_Item.findAll({
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async typeDetail(req, res, next) {
    try {
      const response = await Type_Item.findByPk(+req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async typeCreate(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        user_id: req.user.id,
      };

      const response = await Type_Item.create(payload);

      if (response) {
        await History.create({
          name_item: payload.name,
          username: req.user.name,
          mode: 'Create Type',
        });
      }

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async typeUpdate(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
      };

      const foundType = await Type_Item.findOne({
        where: { id: +req.params.id },
      });

      if (!foundType) {
        throw { name: 'ItemNotFound' };
      }

      const response = await Type_Item.update(payload, {
        where: { id: +req.params.id },
      });

      if (response) {
        await History.create({
          name_item: payload.name,
          username: req.user.name,
          mode: 'Update Type',
        });
      }

      res
        .status(200)
        .json({ message: `Data with id ${+req.params.id} has been changed` });
    } catch (err) {
      next(err);
    }
  }

  static async typeDelete(req, res, next) {
    try {
      const foundType = await Type_Item.findOne({
        where: { id: +req.params.id },
      });

      if (!foundType) {
        throw { name: 'ItemNotFound' };
      }

      await Type_Item.destroy({
        where: { id: +req.params.id },
      });

      await History.create({
        name_item: foundType.name,
        username: req.user.name,
        mode: 'Delete Type',
      });

      res
        .status(200)
        .json({ message: `Item with id ${req.params.id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

class PieceController {
  static async pieceFetch(req, res, next) {
    try {
      const response = await Piece_Item.findAll({
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async pieceDetail(req, res, next) {
    try {
      const response = await Piece_Item.findByPk(+req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async pieceCreate(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        user_id: req.user.id,
      };

      const response = await Item.create(payload);

      if (response) {
        await History.create({
          name_item: payload.name,
          username: req.user.name,
          mode: 'Create Piece',
        });
      }

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async pieceUpdate(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        user_id: req.user.id,
      };

      const foundPiece = await Piece_Item.findOne({
        where: { id: +req.params.id },
      });

      if (!foundPiece) {
        throw { name: 'ItemNotFound' };
      }

      const response = await Piece_Item.update(payload, {
        where: { id: +req.params.id },
      });

      if (response) {
        await History.create({
          name_item: payload.name,
          username: req.user.name,
          mode: 'Update Piece',
        });
      }

      res
        .status(200)
        .json({ message: `Data with id ${+req.params.id} has been changed` });
    } catch (err) {
      next(err);
    }
  }

  static async pieceDelete(req, res, next) {
    try {
      const foundPiece = await Piece_Item.findOne({
        where: { id: +req.params.id },
      });

      if (!foundPiece) {
        throw { name: 'ItemNotFound' };
      }

      await Piece_Item.destroy({
        where: { id: +req.params.id },
      });

      await History.create({
        name_item: foundPiece.name,
        username: req.user.name,
        mode: 'Delete Piece',
      });

      res
        .status(200)
        .json({ message: `Item with id ${req.params.id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

class ItemController {
  static async itemFetch(req, res, next) {
    try {
      const response = await Item.findAll({
        include: [
          {
            model: Type_Item,
            attributes: ['name'],
          },
          {
            model: Piece_Item,
            attributes: ['name'],
          },
          {
            model: User,
            attributes: ['name'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async itemDetail(req, res, next) {
    try {
      const response = await Item.findByPk(+req.params.id, {
        include: [
          {
            model: Type_Item,
            attributes: ['name'],
          },
          {
            model: Piece_Item,
            attributes: ['name'],
          },
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async itemCreate(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        type_id: req.body.type_id,
        piece_id: req.body.piece_id,
        stock: req.body.stock,
        last_stock: 0,
        user_id: req.user.id,
      };

      const response = await Item.create(payload);

      if (response) {
        const foundItem = await Item.findByPk(response.id, {
          include: [Type_Item, Piece_Item],
        });

        await History.create({
          name_item: foundItem.name,
          type: foundItem.Type_Item.name,
          piece: foundItem.Piece_Item.name,
          stock: foundItem.stock,
          username: req.user.name,
          mode: 'Create Item',
        });
      }

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async itemUpdate(req, res, next) {
    try {
      const foundItem = await Item.findOne({
        where: { id: +req.params.id },
      });

      if (!foundItem) {
        throw { name: 'ItemNotFound' };
      }

      const payload = {
        name: req.body.name,
        type_id: req.body.type_id,
        piece_id: req.body.piece_id,
        stock: req.body.stock,
        last_stock: foundItem.stock
      };

      const response = await Item.update(payload, {
        where: { id: +req.params.id },
      });

      if (response) {
        const foundItem = await Item.findByPk(response.id, {
          include: [Type_Item, Piece_Item],
        });

        await History.create({
          name_item: foundItem.name,
          type: foundItem.Type_Item.name,
          piece: foundItem.Piece_Item.name,
          stock: foundItem.stock,
          username: req.user.name,
          mode: 'Update Item',
        });
      }

      res
        .status(200)
        .json({ message: `Data with id ${+req.params.id} has been changed` });
    } catch (err) {
      next(err);
    }
  }

  static async itemDelete(req, res, next) {
    try {
      const foundItem = await Item.findOne({
        where: { id: +req.params.id },
        include: [Type_Item, Piece_Item],
      });

      if (!foundItem) {
        throw { name: 'ItemNotFound' };
      }

      await Item.destroy({
        where: { id: +req.params.id },
      });

      await History.create({
        name_item: foundItem.name,
        type: foundItem.Type_Item.name,
        piece: foundItem.Piece_Item.name,
        stock: foundItem.stock,
        username: req.user.name,
        mode: 'Delete Item',
      });

      res
        .status(200)
        .json({ message: `Item with id ${req.params.id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

class DepartmentController {
  static async DepartmentFetch(req, res, next) {
    try {
      const response = await Department.findAll({
        order: [['name', 'ASC']],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async DepartmentDetail(req, res, next) {
    try {
      const response = await Department.findByPk(+req.params.id, {});

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async DepartmentCreate(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        user_id: req.user.id,
      };

      const response = await Department.create(payload);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async DepartmentUpdate(req, res, next) {
    try {
      const payload = { name: req.body.name };

      const foundItem = await Department.findOne({
        where: { id: +req.params.id },
      });

      if (!foundItem) {
        throw { name: 'ItemNotFound' };
      }

      const response = await Department.update(payload, {
        where: { id: +req.params.id },
        returning: true,
      });

      res
        .status(200)
        .json({ message: `Data with id ${+req.params.id} has been changed` });
    } catch (err) {
      next(err);
    }
  }

  static async DepartmentDelete(req, res, next) {
    try {
      const foundItem = await Department.findOne({
        where: { id: +req.params.id },
      });

      if (!foundItem) {
        throw { name: 'ItemNotFound' };
      }

      await Department.destroy({
        where: { id: +req.params.id },
      });

      res
        .status(200)
        .json({
          message: `Department with id ${req.params.id} has been deleted`,
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  TypeController,
  PieceController,
  ItemController,
  DepartmentController,
};
