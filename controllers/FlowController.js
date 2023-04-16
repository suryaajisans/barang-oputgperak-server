const { Op } = require("sequelize");
const { Item_In, Item_Out, Item, User, History, Type_Item, Piece_Item, Department } = require("../models");

class EnterItemController {
  static async enterItemFetch(req, res, next) {
    try {
      const { search } = req.query
      let options = {
        where: {},
        include: [Item, User, Department],
        order: [['createdAt', 'DESC']],
      }

      if(search) {
        options.where.name = { [Op.iLike]: `%${search}%` }
      }

      const response = await Item_In.findAll(options);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async enterItemDetail(req, res, next) {
    try {
      const response = await Item_In.findByPk(+req.params.id, {
        include: [Item, User],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async enterItemCreate(req, res, next) {
    try {
      const payload = {
        date: req.body.date,
        item_id: req.body.item_id,
        total: req.body.total,
        status: req.body.status,
        user_id: req.user.id,
        department_id: req.body.department_id
      };

      const response = await Item_In.create(payload);

      if (response) {
        const foundItem = await Item.findByPk(response.item_id, {
          include: [Type_Item, Piece_Item]
        })

        if(foundItem) {
          const itemPayload = {
            stock: foundItem.stock + response.total,
            last_stock: foundItem.stock
          }
          await Item.update(itemPayload, {
            where: { id: foundItem.id }
          })

          await History.create({
            name_item: foundItem.name,
            type: foundItem.Type_Item.name,
            piece: foundItem.Piece_Item.name,
            stock: itemPayload.stock,
            total: payload.total,
            username: req.user.name,
            mode: 'Create Item In',
          });
        }
      }

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async enterItemUpdate(req, res, next) {
    try {
      const payload = {
        date: req.body.date,
        item_id: req.body.item_id,
        total: req.body.total,
        status: req.body.status,
        user_id: req.user.id,
      };

      const foundItemIn = await Item_In.findOne({
        where: { id: +req.params.id },
      });

      if (!foundItemIn) {
        throw { name: "ItemNotFound" };
      }

      const response = await Item_In.update(payload, {
        where: { id: +req.params.id },
        returning: true
      });

      if (response) {
        const foundItem = await Item.findByPk(response.item_id, {
          include: [Type_Item, Piece_Item]
        })

        if(foundItem) {
          await History.create({
            name_item: foundItem.name,
            type: foundItem.Type_Item.name,
            piece: foundItem.Piece_Item.name,
            stock: foundItem.stock,
            total: payload.total,
            username: req.user.name,
            mode: 'Update Item In',
          });
        }
      }


      res.status(200).json(response[1]);
    } catch (err) {
      next(err);
    }
  }

  static async enterItemDelete(req, res, next) {
    try {
      const foundItemIn = await Item_In.findOne({
        where: { id: +req.params.id },
      });

      if (!foundItemIn) {
        throw { name: "ItemNotFound" };
      }

      await Item_In.destroy({
        where: { id: +req.params.id },
      });

      res
        .status(200)
        .json({ message: `Item with id ${req.params.id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

class ExitItemController {
  static async exitItemFetch(req, res, next) {
    try {
      const { search } = req.query
      let options = {
        where: {},
        include: [Item, User, Department],
        order: [['createdAt', 'DESC']],
      }

      if(search) {
        options.where.name = { [Op.iLike]: `%${search}%` }
      }

      const response = await Item_Out.findAll(options);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async exitItemDetail(req, res, next) {
    try {
      const response = await Item_Out.findByPk(+req.params.id, {
        include: [Item, User],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async exitItemCreate(req, res, next) {
    try {
      const payload = {
        date: req.body.date,
        item_id: req.body.item_id,
        total: req.body.total,
        status: req.body.status,
        user_id: req.user.id,
        department_id: req.body.department_id
      };

      const response = await Item_Out.create(payload);

      if (response) {
        const foundItem = await Item.findByPk(response.item_id, {
          include: [Type_Item, Piece_Item]
        })

        if(foundItem) {
          const itemPayload = {
            stock: foundItem.stock - response.total,
            last_stock: foundItem.stock
          }
          await Item.update(itemPayload, {
            where: { id: foundItem.id }
          })
          
          await History.create({
            name_item: foundItem.name,
            type: foundItem.Type_Item.name,
            piece: foundItem.Piece_Item.name,
            stock: foundItem.stock,
            total: payload.total,
            username: req.user.name,
            mode: 'Create Item Out',
          });
        }
      }

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async exitItemUpdate(req, res, next) {
    try {
      const payload = {
        date: req.body.date,
        item_id: req.body.item_id,
        total: req.body.total,
        status: req.body.status,
        user_id: req.user.id,
      };

      const foundItemOut = await Item_Out.findOne({
        where: { id: +req.params.id },
        include: [Type_Item, Piece_Item]
      });

      if (!foundItemOut) {
        throw { name: "ItemNotFound" };
      }

      const response = await Item_Out.update(payload, {
        where: { id: +req.params.id },
        returning: true
      });

      if (response) {
        await History.create({
          name_item: foundItemOut.name,
          type: foundItemOut.Type_Item.name,
          piece: foundItemOut.Piece_Item.name,
          stock: foundItemOut.stock,
          total: payload.total,
          username: req.user.name,
          mode: 'Update Item Out',
        });
      }

      res.status(200).json(response[1]);
    } catch (err) {
      next(err);
    }
  }

  static async exitItemDelete(req, res, next) {
    try {
      const foundItemOut = await Item_Out.findOne({
        where: { id: +req.params.id },
      });

      if (!foundItemOut) {
        throw { name: "ItemNotFound" };
      }

      await Item_Out.destroy({
        where: { id: +req.params.id },
      });

      res
        .status(200)
        .json({ message: `Item with id ${req.params.id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { EnterItemController, ExitItemController };
