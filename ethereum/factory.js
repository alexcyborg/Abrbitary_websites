import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x1f34f01bEebd23D2e2b4bB72F8D677c74712A9f7"
);

export default instance;