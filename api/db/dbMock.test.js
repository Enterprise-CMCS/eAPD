import { createSandbox, stub } from 'sinon';

const sandbox = createSandbox();
const db = stub();

const reset = () => {
  sandbox.resetBehavior();
  sandbox.resetHistory();
};

const getQueryBuilder = () => ({
  andWhere: sandbox.stub(),
  count: sandbox.stub(),
  delete: sandbox.stub(),
  first: sandbox.stub(),
  insert: sandbox.stub(),
  returning: sandbox.stub(),
  select: sandbox.stub(),
  update: sandbox.stub(),
  where: sandbox.stub(),
  whereIn: sandbox.stub(),
  whereRaw: sandbox.stub(),
  leftJoin: sandbox.stub(),
  whereNot: sandbox.stub(),
  whereNotIn: sandbox.stub(),
  orWhereNull: sandbox.stub()
});

const creator = table => {
  const queryBuilder = getQueryBuilder();
  db.withArgs(table).returns(queryBuilder);

  const fn = (...args) => db(...args);
  Object.keys(queryBuilder).forEach(prop => {
    fn[prop] = queryBuilder[prop];
  });

  fn.transaction = async () => {
    fn.commit = async () => {};
    return fn;
  };

  return fn;
};

creator.reset = reset;

export default creator;
