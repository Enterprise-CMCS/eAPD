// REPLACE '/years'
// REMOVE `/years/${index}`
// ADD '/keyStatePersonnel/keyPersonnel/-'
// REPLACE `/keyStatePersonnel/keyPersonnel/${index}`
// REMOVE `/keyStatePersonnel/keyPersonnel/${index}`
// ADD /activities/-'
// REPLACE `/activities/${activityIndex}`
// REMOVE `/activities/${activityIndex}`
// REPLACE `/activities/${activityIndex}/fundingSource`
// ADD `/activities/${activityIndex}/contractorResources/-`
// REPLACE `/activities/${activityIndex}/contractorResources/${contractorIndex}`
// REMOVE `/activities/${activityIndex}/contractorResources/${contractorIndex}`
// ADD `/activities/${activityIndex}/expenses/-`
// REPLACE `/activities/${activityIndex}/expenses/${nonPersonnelIndex}`
// REMOVE `/activities/${activityIndex}/expenses/${nonPersonnelIndex}`
// ADD `/activities/${activityIndex}/statePersonnel/-`
// REPLACE `/activities/${activityIndex}/statePersonnel/${personnelIndex}`
// REMOVE `/activities/${activityIndex}/statePersonnel/${personnelIndex}`
// REPLACE `/activities/${activityIndex}/costAllocation/${year}/ffp/federal`
// REPLACE `/activities/${activityIndex}/costAllocation/${year}/ffp/state`
// REPLACE `/activities/${activityIndex}/costAllocation/${year}/other`
// REPLACE `/activities/${activityIndex}/quarterlyFFP/years/${year}/${quarter}/inHouse`
// REPLACE `/activities/${activityIndex}/quarterlyFFP/years/${year}/${quarter}/contractors`

const budgetPaths = [
  /^\/years$/,
  /^\/years\/\d+$/,
  /^\/keyStatePersonnel\/keyPersonnel\/(-|\d+)$/,
  /^\/activities\/(-|\d+)$/,
  /^\/activities\/\d+\/fundingSource$/,
  /^\/activities\/\d+\/contractorResources\/(-|\d+)$/,
  /^\/activities\/\d+\/expenses\/(-|\d+)$/,
  /^\/activities\/\d+\/statePersonnel\/(-|\d+)$/,
  /^\/activities\/\d+\/costAllocation\/\d{4}\/(ffp\/federal|ffp\/state|other)$/,
  /^\/activities\/\d+\/quarterlyFFP\/\d{4}\/[1-4]\/(inHouse|contractors)$/
];

// iterating using some will short circuit when it finds a match

export const hasBudgetUpdate = patches =>
  patches.some(({ path }) =>
    budgetPaths.find(pathRegex => path.match(pathRegex))
  );
