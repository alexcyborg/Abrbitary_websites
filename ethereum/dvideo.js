import web3 from './web3';
import DVideo from './build/DVideo.json';

const instance = new web3.eth.Contract(
    DVideo.abi,
    "0xFF274f59B5CeB1E1c451289102B7e21cE8c73f9f"
);

export default instance;