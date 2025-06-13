export const MESSAGES = {
  SUCCESS: {
    CREATE: 'Successfully Created!',
    UPDATE: 'Successfully Updated!',
    DELETE: 'Successfully Deleted!',
    RETRIVE: 'Successfully Retrived!',
    LOGIN: 'Successfully Logged In!',
  },
  ERROR: {
    CREATE: '',
    UPDATE: '',
    DELETE: '',
    RETRIVE: '',
    SERVER: '',
    BAD_REQUEST: 'Invalid Request!',
    INVALID_CREDENTIAL: 'Invalid Credential!',
    UNAUTHORIZED: 'Unauthorized Access!',
  },
} as const;
