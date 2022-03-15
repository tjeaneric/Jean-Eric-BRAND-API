const Message = require('../models/messageModel');
const factory = require('./handlerFactory');

exports.getAllMessages = factory.getAll(Message);
exports.getOneMessage = factory.getOne(Message);
exports.createMessage = factory.createOne(Message);
exports.deleteMessage = factory.deleteOne(Message);
