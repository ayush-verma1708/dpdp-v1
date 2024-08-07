import axios from 'axios';

const API_URL_ASSET_IN_ASSETDETAILS = 'http://localhost:8021/api/v1/assetDetails/assets/';
const API_URL_SCOPED_IN_ASSETDETAILS = 'http://localhost:8021/api/v1/assetDetails/scoped/';

export const getAssetInAssetDetails = async () => {
  const response = await axios.get(`${API_URL_ASSET_IN_ASSETDETAILS}`);
  return response.data;
};

export const getScopedInAssetDetails = async (assetId) => {
    const response = await axios.get(`${API_URL_SCOPED_IN_ASSETDETAILS}${assetId}`);
    return response.data;
  };
