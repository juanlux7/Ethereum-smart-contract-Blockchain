const HdWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HdWalletProvider(
  "you secret key wallet",
  "https://rinkeby.infura.io/v3/c59a796db2504e33bada752b80ffe89d"
);

const web3 = new Web3(provider);

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "6500000", from: accounts[0] });

  console.log("contract deployed to: ", result.options.address);
}

deploy();
