import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x04884a4B5B2E771B45003FC52336897b907856eE"
);

export default instance;