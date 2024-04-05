import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

/**
 * @param shopId
 * @returns {Promise<{Setting}>}
 */
export async function selectAllSetting(shopId) {
  try {
    const settingDocs = await settingRef
      .where('shopId', '==', shopId)
      .limit(1)
      .get();
    if (settingDocs.empty) {
      return null;
    }
    const settingDoc = settingDocs.docs[0];
    const settingData = settingDoc.data();
    return {
      id: settingDoc.id,
      ...settingData
    };
  } catch (error) {
    console.error('Error updating setting:', error);
    return null;
  }
}

/**
 * INSERT setting VALUES () ...
 * @param {Setting} values - The values of the new setting
 * @return {Promise<Setting>} - The inserted setting
 */
export async function insertSetting(values) {
  try {
    const newSettingRef = await settingRef.add(values);
    const newSettingDoc = await newSettingRef.get();
    const newSettingData = newSettingDoc.data();
    return newSettingData;
  } catch (error) {
    console.error('Error inserting setting:', error);
    return null;
  }
}

/**
 * UPDATE settings SET ... WHERE ...
 * @param {id: string; {Setting}} values
 * @return
 */
export async function updateSetting(shopId, values) {
  try {
    if (!shopId) throw new Error('ID is required');

    const settingDocs = await settingRef
      .where('shopId', '==', shopId)
      .limit(1)
      .get();
    if (settingDocs.empty) {
      return null;
    }
    const settingDoc = settingDocs.docs[0];
    await settingDoc.ref.update(values.data);
    return settingDoc.data();
  } catch (error) {
    console.error('Error updating setting:', error);
    return null;
  }
}
