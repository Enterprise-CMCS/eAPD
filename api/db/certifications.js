/* eslint-disable camelcase */
const knex = require('./knex');

const { updateAuthAffiliation } = require('./affiliations');

const addStateAdminCertification = (data, { db = knex } = {}) => {
  return db('state_admin_certifications')
    .insert({ ...data }, ['id'])
    .then(ids => {
      return db('state_admin_certifications_audit').insert({
        changeDate: new Date(),
        changedBy: data.uploadedBy,
        changeType: 'add',
        certificationId: ids[0].id
      });
    });
};

const archiveStateAdminCertification = async (data, { db = knex } = {}) => {
  const record = await db('state_admin_certifications')
    .select('status', 'affiliationId')
    .where('id', data.id)
    .first();
  if (record.affiliationId !== null) {
    return { error: 'certification is already matched' };
  }
  if (record.status === 'archived') {
    return { error: 'certification is already archived' };
  }
  return db('state_admin_certifications')
    .where('id', data.id)
    .first()
    .update({ status: 'archived' })
    .then(() => {
      return db('state_admin_certifications_audit').insert({
        changeDate: new Date(),
        changedBy: data.archived_by,
        changeType: 'remove',
        certificationId: data.id
      });
    });
};

// Update the state admin certification and the associated auth affiliation
const matchStateAdminCertification = async (
  data,
  { db = knex, updateAffiliation = updateAuthAffiliation } = {}
) => {
  const transaction = await db.transaction();

  try {
    await transaction('state_admin_certifications')
      .where({ id: data.certificationId })
      .update({ affiliationId: data.affiliationId });

    await transaction('state_admin_certifications_audit').insert({
      changeDate: new Date(),
      changedBy: data.changedBy,
      changeType: 'match',
      certificationId: data.certificationId
    });

    await updateAffiliation({ ...data, transaction });

    await transaction.commit();
    return { error: null };
  } catch (error) {
    await transaction.rollback();

    return {
      error: 'failed one or more transactions needed to complete match'
    };
  }
};

const getStateAdminCertifications = ({ db = knex } = {}) => {
  const subQuery = db('auth_affiliations')
    .select([
      'auth_affiliations.user_id',
      'auth_affiliations.state_id',
      'auth_affiliations.id'
    ])
    .leftOuterJoin('auth_roles', 'auth_roles.id', 'auth_affiliations.role_id')
    .where('auth_roles.name', '=', 'eAPD State Staff')
    .orWhere('auth_affiliations.status', '=', 'requested')
    .orWhere(function () {
      this.where('auth_affiliations.status', '=', 'approved').andWhere(
        'auth_roles.name',
        '=',
        'eAPD State Admin'
      );
    })
    .as('affiliations');

  return db('state_admin_certifications')
    .select([
      'state_admin_certifications.id',
      'state_admin_certifications.name',
      'state_admin_certifications.email',
      'state_admin_certifications.phone',
      'state_admin_certifications.state',
      'state_admin_certifications.affiliationId',
      'state_admin_certifications.fileUrl',
      'state_admin_certifications.ffy'
    ])
    .where('status', '=', 'active')
    .countDistinct('affiliations.id as potentialMatches')
    .leftOuterJoin('okta_users', function oktaCertificationsJoin() {
      this.on('okta_users.email', '=', 'state_admin_certifications.email').orOn(
        'okta_users.displayName',
        '=',
        'state_admin_certifications.name'
      );
    })

    .leftOuterJoin(subQuery, function oktaAffiliationJoin() {
      this.on('okta_users.user_id', '=', 'affiliations.user_id').andOn(
        'state_admin_certifications.state',
        '=',
        'affiliations.state_id'
      );
    })

    .groupBy('state_admin_certifications.id');
};

module.exports = {
  addStateAdminCertification,
  getStateAdminCertifications,
  matchStateAdminCertification,
  archiveStateAdminCertification
};
