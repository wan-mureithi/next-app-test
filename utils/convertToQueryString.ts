export const convertToQueryString = (params: any): string => {
    if (!params) {
      return '';
    }
  
    const keys = Object.keys(params);
    if (keys.length === 0) {
      return '';
    }
    let queryString = '?';
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      queryString += `${key}=${params[key]}`;
      if (index < keys.length - 1) {
        queryString += '&';
      }
    }
    return queryString;
  }