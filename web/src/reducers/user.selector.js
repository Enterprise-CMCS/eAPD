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
      state: { id },
      affiliations
    }
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
    return activities.find(
      activity =>
        activity == 'view-affiliations'
    )
      ? true
      : false;
  } else {
    return false;
  }
};
