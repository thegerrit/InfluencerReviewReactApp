const convertFieldsToLowercase = (data: any) => {
    const newData = { ...data };
    for (const key in newData) {
      if (typeof newData[key] === 'string') {
        newData[key] = newData[key].toLowerCase();
      }
    }
    return newData;
  };

export default convertFieldsToLowercase;
