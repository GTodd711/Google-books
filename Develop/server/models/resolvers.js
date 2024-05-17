const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get a single user by ID or username
    getUser: async (_, { id, username }) => {
      if (id) {
        return await User.findById(id);
      } else if (username) {
        return await User.findOne({ username });
      } else {
        throw new Error('Provide either ID or username.');
      }
    },
  },
  Mutation: {
    // Create a new user
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Login a user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Incorrect email or password.');
      }
      const token = signToken(user);
      return { token, user };
    },
    // Save a book to a user's savedBooks
    saveBook: async (_, { userId, book }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedBooks: book } },
        { new: true }
      );
      return updatedUser;
    },
    // Remove a book from a user's savedBooks
    removeBook: async (_, { userId, bookId }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
