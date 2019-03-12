const ganache = require("ganache-cli");
const Web3 = require("web3");
const assert = require("assert");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", () => {
  it("deploys a contract", () => {
    // ok checks if address is a defined value
    assert.ok(lottery.options.address);
  });

  it("alllows one account to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether")
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("alllows multiple accounts to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether")
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether")
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether")
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);

    assert.equal(accounts[1], players[1]);

    assert.equal(accounts[2], players[2]);

    assert.equal(3, players.length);
  });

  it("requires a minimun amount of ether to enter the game", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("only manager can call the pickwinner function", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("sends money to the winner and resets the game", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether")
    });
    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);

    const difference = finalBalance - initialBalance;

    assert(difference > web3.utils.toWei("1.8", "ether"));
  });

  it("cleans the players array", async () => {
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(players.length, 0);
  });

  it("check the balance of the contract was sent", async () => {
    const totalBalance = await web3.eth.getBalance(lottery._address);

    // balance must be equal to 0 because all the ether were sent to the winner
    assert.equal(totalBalance, 0);
  });
});
