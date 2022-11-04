const ObjectId = require('mongoose').Types.ObjectId;

const mnAPD = require('./01-mnAPD.json');
const akAPD = require('./02-akAPD.json');
const akMMIS = require('./03-akMMIS.json');
const finalAPD = require('./04-finalAPD.json');

const mnAPDId = '21ad69c0682b10ba1c54aa2d';
const akAPDId = 'eeac3c9865059f26eccb0600';
const akMMISId = '600eeac3c9865059f26eccb0';
const finalAPDId = 'de66754e9513b78d72875bcf';
const badAPDId = '0123456789abcdef01234567';

const data = [
  {
    _id: ObjectId(mnAPDId),
    // William Howard Taft becomes the only person to serve as both
    // President and Chief Justice of the Supreme Court
    createdAt: '1921-07-11T07:00:00Z',
    // Teddy Roosevelt returns to New York after travels through Europe
    // and Africa
    updatedAt: '1910-06-18T09:00:00Z',
    stateId: 'mn',
    status: 'draft',
    ...mnAPD
  },
  {
    _id: ObjectId(akAPDId),
    // The 13th Amendment to the US Constitution is officially ratified,
    // formally outlawing slavery
    createdAt: '1865-12-06T00:00:00Z',
    // The 19th Amendment to the US Constitution is officially ratified,
    // extending the right to vote to women
    updatedAt: '1919-06-04T16:30:00Z',
    stateId: 'ak',
    status: 'draft',
    ...akAPD
  },
  {
    _id: ObjectId(akMMISId),
    // The 13th Amendment to the US Constitution is officially ratified,
    // formally outlawing slavery
    createdAt: '1865-12-06T00:00:00Z',
    // The 19th Amendment to the US Constitution is officially ratified,
    // extending the right to vote to women
    updatedAt: '1919-06-04T16:30:00Z',
    stateId: 'ak',
    status: 'draft',
    ...akMMIS
  },
  {
    _id: ObjectId(finalAPDId),
    // Jesse Owens wins his first gold medal of the Berlin Olympics
    createdAt: '1936-08-03T00:00:00Z',
    // Jackie Robinson joins the Brooklyn Dodgers
    updatedAt: '1947-04-10T00:00:00Z',
    stateId: 'ak',
    status: 'approved',
    ...finalAPD
  }
];

module.exports = {
  data,
  mnAPDId,
  akAPDId,
  akMMISId,
  finalAPDId,
  badAPDId
};
