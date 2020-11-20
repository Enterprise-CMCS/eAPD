export const getIsAdmin = ({
  user: {
    data: { role }
  }
}) => {
  return role === 'admin';
};

export const getUserStateOrTerritory = ({
  user: {
    data: { state }
  }
}) => state;

export const getUserAffiliationForCurrentState = ({
  user: {
    data: {
      state: { id = null } = {},
      affiliations
    } = {}
  } = {}
}) => {
  return affiliations ? affiliations.find(affiliation => affiliation.state_id === id) : null;
};

export const getIsStateAccessApprover = ({
  user: {
    data: { 
      state: { id = null } = {},
      permissions
    } = {}
  } = {}
}) => {
  return permissions ? permissions[id].find(permission => permission === 'approve-state-access') : null;
};

export const getUserStateOrTerritoryStatus = ({
  user: {
    data: {
      state: { id = null } = {},
      affiliations = null
    } = {}
  } = {}
}) => {
  const { status } = affiliations.find(
    affiliation => affiliation.state_id === id
  );
  return status;
};