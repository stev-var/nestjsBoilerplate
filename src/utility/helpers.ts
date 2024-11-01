import { Types } from 'mongoose';
//Fuction to create generate unique value
export function generateUniqueString(trxType: string, num: number): string {
  const prefix = trxType.charAt(0).toUpperCase();
  const incrementedNumber = num.toString();
  const randomPart = Math.random().toString(16).substr(2, 6); // Generate 6 random characters

  const uniqueString = `${prefix}0x${incrementedNumber}${randomPart}`;

  return uniqueString;
}

// Function to change string to ObjectId
export const toObjectId = (id: string): Types.ObjectId => {
  return new Types.ObjectId(id);
};
