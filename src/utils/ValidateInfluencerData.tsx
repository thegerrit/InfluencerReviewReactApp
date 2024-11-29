import { PLATFORMS } from './Constants';
import WriteInfluencerData from '../model/WriteInfluencerData';

function validateInfluencerData(data: WriteInfluencerData): [string, string] {
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

  // Check for at least 5 tags
  if (data.tags.length < 5) {
    return ["1", "At least 5 tags are required."];
  }

  // If all checks pass
  return ["0", "Data is valid."];
}

export default validateInfluencerData;
