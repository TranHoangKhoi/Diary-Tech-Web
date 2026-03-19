export const appRoute = {
  home: "/home",
  login: "/login",
  map: "/map",
  diary: "/diary",
  addDiary: "/diary/add",
  ownerDiary: "/owner/diary",
  ownerAddDiary: "/owner/diary/add",
  ownerAddAccount: "/owner/account",
};

export const API_INTERNAL = "/api/internal";

export const API_URL = {
  // api: "http://localhost:5000/",
  api: "https://diarytech.bittechx.cloud/",
  // Auth
  login: "api/auth/login",
  getProfile: "api/auth/profile",
  // Get Farm
  getFarm: "api/map/getFarm",
  getFarmByUser: "api/farm/byUser",
  getFarmByOwner: "api/farm/byOwner",
  // Prodution Logs
  createProductionLogs: "api/productionLogs",
  getProductionLogs: "api/productionLogs/farm",
  getProductionLogsDetails: "api/productionLogs",
  getProductionLogsRecent: "api/productionLogs/recent",
  getProductionLogsByOwnerId: "api/productionLogs/owner",
  getProductionLogsRecentByOwnerId: "api/productionLogs/owner/logs/recent",
  // Activities
  getActivitiByFarmType: "api/activity/farmtype",
  // Production Book
  getBookByFarm: "api/productionBook/farm",
  // FarmType
  getFarmType: "api/farmtype",
  // Provinces
  getProvince: "api/map/provinces",
  getWards: "api/map/wards",
  // Account
  createFarm: "api/farm",
  // Crops
  getCropsCate: "api/crop",
};
