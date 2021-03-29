export const getIsAdmin = ({
  user: {
    data: { role }
  }
}) => {
  return role === 'admin';
};

// Adding this for now. Should consider removing specific role checks
// in favor of a generic getRole selector.
export const getIsFedAdmin = ({
  user: {
    data: { role }
  }
}) => {
  return role === 'eAPD Federal Admin';
};

export const getUserStateOrTerritory = ({
  user: { data: { state = null } = {} }
}) => state;

export const getUserAffiliationForCurrentState = ({
  user: {
    data: { state: { id = null } = {}, affiliations }
  }
}) => {
  return affiliations
    ? affiliations.find(affiliation => affiliation.state_id === id)
    : null;
};

export const getUserStateOrTerritoryStatus = state => {
  const { status = null } = getUserAffiliationForCurrentState(state);
  return status;
};

export const getUserStateOrTerritoryRole = state => {
  const { role = null } = getUserAffiliationForCurrentState(state);
  return role;
};

export const getCanUserViewStateAdmin = ({
  user: {
    data: { activities }
  }
}) => {
  if (activities) {
    return activities.find(activity => activity === 'view-affiliations')
      ? true
      : null;
  }
  return null;
};
