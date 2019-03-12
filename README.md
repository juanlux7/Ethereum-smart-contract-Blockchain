# Ethereum smart contract | Blockchain Dapp with Solidity

![alt text](https://user-images.githubusercontent.com/40801686/54182923-27d2df80-44a3-11e9-9e6b-8efbc93fd278.jpg)

A Decentralized Application with Solidity, Javascript and ReactJS. This is a simple lottery game with a couple of interesting functions,
testing part with Mocha framework.

## In this project, I create a Dapp with Solidity and React in order to play with Smart contracts and Ethereum.


### description of the dapp:

this project consists in a simple Smart contract, that handles some logic regarding an online lottery game. In order to participate in this game, a specific user needs to pay a certain amount of Ether (about 1 ether, but there is a minimun), then a payable funcion is invoked and that user can enter the game. Of course, those ethers are now part of the Smart contract balance (and you can access the Smart contract address to get the total balance, depending on the amount of users participating). 

"ALL INTEREACTIONS THAT CHANGE THE STRUCTURE OF A CONTRACT COSTS SOME AMOUNT OF ETHER"

All users are stored in an array of type address, and another function will randomly pick a winner and transer it the total balance collected in the game.

Of course, this smart contract has a manager, who is the person that initially deployed the contract, spending some gas in the process (a bit of Wei to be more precise). This manager is initialized in the constructor, and only this manager can call the pickwinner funciton.



### Versions used in this project:

  - Solidity Compiler (solc): 0.4.25
  - React 16
  - Mocha test 6
  
 
 I had to use Solidity compiler 0.4.25 instead of ^0.5.0 because there were many breaking changes between versions and it is
 really hard to adapt versions.
 
 the Solidity code was written at remix.ethereum.org, an online Solidity IDE really insteresting with many useful features.
 
 
 
 
 
 
