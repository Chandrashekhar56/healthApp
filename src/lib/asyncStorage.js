import AsyncStorage from '@react-native-async-storage/async-storage';

const setLocalStorage = async ({key, value} = {}) => {
  try {
    await AsyncStorage.setItem(key, value);
    return 'stored';
  } catch (e) {
    console.log('🚀 ~ file: asyncStorage.js:8 ~ setLocalStorage ~ e:', e);
    // saving error
  }
};

AsyncStorage.getItem('userLogin').then((res) => {
  console.log("🚀 ~ file: asyncStorage.js:14 ~ AsyncStorage.getItem ~ res:", res)
})
const getLocalStorage = async ({key} = {}) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("🚀 ~ file: asyncStorage.js:19 ~ getLocalStorage ~ value:", value)
    return value;
  } catch (e) {
    console.log("🚀 ~ file: asyncStorage.js:21 ~ getLocalStorage ~ e:", e)
    // error reading value
  }
};

const clearLocalStorage = async () => {
  try {
    const value = await AsyncStorage.clear();
    return value;
  } catch (e) {
    console.log("🚀 ~ file: asyncStorage.js:26 ~ clearLocalStorage ~ e:", e)
    // error clearing value
  }
};

const getAllLocalStorageKeys = async () => {
  try {
    const value = await AsyncStorage.getAllKeys();
    return value;
  } catch (e) {
    console.log("🚀 ~ file: asyncStorage.js:26 ~ clearLocalStorage ~ e:", e)
    // error in getting keys
  }
};

export {setLocalStorage, getLocalStorage, clearLocalStorage,getAllLocalStorageKeys};
