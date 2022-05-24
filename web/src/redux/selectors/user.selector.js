export const getIsFederal = ({
  user: {
    data: { state: { id = null } = {} }
  }
}) => {
  return id === 'fd';
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

export const getIsSysAdmin = ({
  user: {
    data: { role }
  }
}) => {
  return role === 'eAPD System Admin';
};

export const getUserStateOrTerritory = ({
  user: { data: { state = null } = {} }
}) => state;

export const getUserAffiliationForCurrentState = ({
  user: { data: { state: { id = null } = {}, states = [] } = {} } = {}
}) => {
  return { status: states[id] };
};

export const getUserStateOrTerritoryStatus = state => {
  console.log({ state });
  const { status = null } = getUserAffiliationForCurrentState(state) || {};
  console.log({ status });
  return status;
};

export const getUserStateOrTerritoryRole = state => {
  const { role = null } = getUserAffiliationForCurrentState(state) || {};
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

export const getCanUserEditAPD = ({
  user: {
    data: { activities }
  }
}) => {
  if (activities) {
    return activities.find(activity => activity === 'edit-document')
      ? true
      : null;
  }
  return null;
};
