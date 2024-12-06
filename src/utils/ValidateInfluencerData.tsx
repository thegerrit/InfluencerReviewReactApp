import { PLATFORMS } from './Constants';
import WriteInfluencerData from '../model/WriteInfluencerData';

function validateInfluencerData(data: WriteInfluencerData): [string, string] {
  // trim leading and trailing whitespace from all firstName and lastName
  data.firstName = data.firstName.trim();
  data.lastName = data.lastName.trim();

  // Check for first name
  if (!data.firstName.trim()) {
    return ["1", "First name is required."];
  }



  // Check for at least one valid social media handle
  const hasValidPlatform = PLATFORMS.some(platform => {
    const platformKey = platform.toLowerCase() as keyof WriteInfluencerData;
    const platformValue: string = String(data[platformKey]);
    return data[platformKey] && platformValue.trim() !== '';
  });

  if (!hasValidPlatform) {
    return ["1", "At least one valid social media handle is required."];
  }

  // check that social media handles only contain valid characters
  const validHandleRegex = /^[a-zA-Z0-9_.-]+$/;
  for (const platform of PLATFORMS) {
    const platformKey = platform.toLowerCase() as keyof WriteInfluencerData;
    const platformValue: string = String(data[platformKey]);
    if (platformValue.trim() !== "" && !validHandleRegex.test(platformValue)) {
      return ["1", `${platform} handle contains invalid characters. Please only use letters, numbers, and the following symbols: . - _`];
    }
  }

  // Check for at least 5 tags
  if (data.tags.length < 5) {
    return ["1", "At least 5 tags are required."];
  }

  // remove empty handles from otherMediaHandles
  data.otherMediaHandles = data.otherMediaHandles.filter((handle: { handle: string; platform: string; }) => handle.handle !== "" && handle.platform !== "");


  // check that otherMediaHandles only contain valid characters
  for (const handle of data.otherMediaHandles) {
    console.log("testing handle: ", handle );
    if (handle.platform.trim() !== "" && !validHandleRegex.test(handle.platform)) {
      return ["1", `${handle.platform} is not a valid website name. Please only use letters, numbers, and the following symbols: . - _`];
    }
    if (handle.handle.trim() !== "" && !validHandleRegex.test(handle.handle)) {
      return ["1", `${handle.platform} handle contains invalid characters. Please only use letters, numbers, and the following symbols: . - _`];
    }
  }

  // If all checks pass
  return ["0", "Data is valid."];
}

export default validateInfluencerData;
