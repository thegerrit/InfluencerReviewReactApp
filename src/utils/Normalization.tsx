const convertFieldsToLowercase = (data: any) => {
    const newData = { ...data };
    for (const key in newData) {
      if (typeof newData[key] === 'string') {
        newData[key] = newData[key].toLowerCase();
      }
    }
    return newData;
};

const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
};


export { convertFieldsToLowercase, capitalizeFirstLetter };
