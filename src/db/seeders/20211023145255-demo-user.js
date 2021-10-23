'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      username: 'MickoGilmor',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    await queryInterface.bulkInsert('Students', [{
      city: 'Podgorica',
      country: 'Montenegro',
      address: 'Zmaj Jovina 285',
      zipCode: '81000',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Students', null, {});
  },
};
