/**
 * DROP ALL TABLES ARE CRATE THEM AGAIN
 */
import sequelize from 'src/models';

console.log('RESETTING DATABASE!');
sequelize.sync({force: true});
