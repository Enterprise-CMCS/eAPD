// This is a list of property paths that cannot be changed with this endpoint.
// Any patches pointing at these paths will be ignored.
const staticFields = ['/createdAt', '/updatedAt', '/status', '/stateId'];

export default staticFields;
