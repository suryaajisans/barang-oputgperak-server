const { User } = require('../models');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, username, password, phone, photo, status, role } =
        req.body;

      const response = await User.create({
        name,
        email,
        username,
        password,
        role,
        photo,
        phone,
        status,
      });

      const result = {
        name: response.name,
        email: response.email,
        username: response.username,
        role: response.role,
        photo: response.photo,
        phone: response.phone,
        status: response.status,
      };

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const response = await User.findOne({
        where: {
          username,
        },
      });

      if (!response) {
        throw { name: 'InvalidInput' };
      }

      if (!comparePassword(password, response.password)) {
        throw { name: 'InvalidInput' };
      }

      const payload = {
        id: response.id,
        email: response.email,
        username: response.username,
        role: response.role,
        photo: response.photo,
        phone: response.phone,
        status: response.status,
      };

      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const id = +req.params.id;
      const response = await User.findByPk(id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const response = await User.findAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async editUser(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        phone: req.body.phone,
        photo: req.body.photo,
        role: req.body.role,
        status: req.body.status,
      };

      const foundUser = await User.findOne({
        where: { id: +req.params.id },
      });

      if (!foundUser) {
        throw { name: 'UserNotFound' };
      }

      const response = await User.update(payload, {
        where: { id: +req.params.id },
        returning: true
      });

      res.status(200).json({ message: `Data with id ${+req.params.id} has been changed`});
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const foundUser = await User.findOne({
        where: { id: +req.params.id },
      });

      if (!foundUser) {
        throw { name: 'UserNotFound' };
      }

      await User.destroy({
        where: { id: +req.params.id },
      });

      res
        .status(200)
        .json({ message: `User with id ${req.params.id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async changePass(req, res, next) {
    try {
      const { password, newPassword } = req.body;
      const id = +req.params.id;

      const foundUser = await User.findByPk(id);

      if (!foundUser) {
        throw { name: 'UserNotFound' };
      }

      if (!comparePassword(password, foundUser.password)) {
        throw { name: 'InvalidPass' };
      }

      const newPass = hashPassword(newPassword);

      const response = await User.update(
        { password: newPass },
        {
          where: { id },
        }
      );

      res
        .status(200)
        .json({ message: `user with id ${id} password has been changed` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
