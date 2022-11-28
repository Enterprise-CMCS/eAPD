import chalk from 'chalk'; // eslint-disable-line import/no-unresolved
import loggerFactory from '../../logger';
import states from '../../util/states';

const logger = loggerFactory('state seeder');

const seed = async knex => {
  logger.verbose(`Beginning to seed the ${chalk.cyan('states')} table`);
  const total = await knex('states').count('id').first();
  logger.verbose(`${chalk.cyan('states')} table currently has ${total.count}`);
  if (total.count.toString() === '0') {
    await knex('states').insert(states);
    logger.verbose(`Completed seeding the ${chalk.cyan('states')} table`);
  } else {
    logger.verbose(`Skipping seeding the ${chalk.cyan('states')} table`);
  }
};

export default seed;
