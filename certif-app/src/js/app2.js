import Web3 from ‘web3’;

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function load() {
    await loadWeb3();
    updateStatus('Ready!');
}

function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
    console.log(status);
}

load();

async function loadContract() {
    return await new window.web3.eth.Contract([
        {
          "constant": true,
          "inputs": [],
          "name": "getCertif",
          "outputs": [
            {
              "internalType": "string[]",
              "name": "",
              "type": "string[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "value",
              "type": "string"
            }
          ],
          "name": "addCertif",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ],'0x9600160858C66494C165a719CFdd2578E2E65328');
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus('Ready!');
}

async function getCertif() {
    updateStatus('fetching certif...');
    const getCertif = await window.contract.methods.getCertif().call();
    updateStatus(`certif: ${getCertif}`);
}

async function addCertif() {
    const value = Math.floor(Math.random() * 100);
    updateStatus(`Updating certif with ${value}`);
    const account = await getCurrentAccount();
    const certif = await window.contract.methods.addCertif(value).send({ from: account });
    updateStatus('Updated.');
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}