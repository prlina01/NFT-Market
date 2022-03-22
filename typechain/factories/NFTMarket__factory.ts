/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTMarket, NFTMarketInterface } from "../NFTMarket";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "ItemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "MarketItemCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "createMarketItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "createMarketSale",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsCreated",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526658d15e1762800060045534801561001b57600080fd5b50600160008190555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061198c806100746000396000f3fe6080604052600436106100555760003560e01c80630f08efe01461005a57806312e8558514610085578063202e3740146100b057806358eb2df5146100db578063c23b139e146100f7578063f064c32e14610113575b600080fd5b34801561006657600080fd5b5061006f61013e565b60405161007c91906115d5565b60405180910390f35b34801561009157600080fd5b5061009a61046a565b6040516100a79190611677565b60405180910390f35b3480156100bc57600080fd5b506100c5610474565b6040516100d291906115d5565b60405180910390f35b6100f560048036038101906100f09190611302565b610824565b005b610111600480360381019061010c91906112c6565b610b88565b005b34801561011f57600080fd5b50610128610e47565b60405161013591906115d5565b60405180910390f35b6060600061014c60016111f7565b9050600061015a60026111f7565b61016460016111f7565b61016e9190611732565b90506000808267ffffffffffffffff8111156101b3577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156101ec57816020015b6101d961121b565b8152602001906001900390816101d15790505b50905060005b8481101561045f57600073ffffffffffffffffffffffffffffffffffffffff166005600060018461022391906116dc565b815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561044c5760006005600060018461028491906116dc565b81526020019081526020016000206000015490506000600560008381526020019081526020016000209050806040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600582015481526020016006820160009054906101000a900460ff16151515158152505084868151811061042f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525060018561044791906116dc565b945050505b8080610457906117c0565b9150506101f2565b508094505050505090565b6000600454905090565b6060600061048260016111f7565b905060008060005b8381101561052b57600560006001836104a391906116dc565b815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156105185760018361051591906116dc565b92505b8080610523906117c0565b91505061048a565b5060008267ffffffffffffffff81111561056e577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156105a757816020015b61059461121b565b81526020019060019003908161058c5790505b50905060005b84811015610819573373ffffffffffffffffffffffffffffffffffffffff16600560006001846105dd91906116dc565b815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108065760006005600060018461063e91906116dc565b81526020019081526020016000206000015490506000600560008381526020019081526020016000209050806040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600582015481526020016006820160009054906101000a900460ff1615151515815250508486815181106107e9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525060018561080191906116dc565b945050505b8080610811906117c0565b9150506105ad565b508094505050505090565b6002600054141561086a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086190611637565b60405180910390fd5b6002600081905550600081116108b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ac90611657565b60405180910390fd5b60045434146108f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f090611617565b60405180910390fd5b6109036001611205565b600061090f60016111f7565b90506040518060e001604052808281526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020013373ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200183815260200160001515815250600560008381526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816005015560c08201518160060160006101000a81548160ff0219169083151502179055509050508373ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401610af09392919061159e565b600060405180830381600087803b158015610b0a57600080fd5b505af1158015610b1e573d6000803e3d6000fd5b50505050828473ffffffffffffffffffffffffffffffffffffffff16827f045dfa01dcba2b36aba1d3dc4a874f4b0c5d2fbeb8d2c4b34a7d88c8d8f929d1336000876000604051610b729493929190611559565b60405180910390a4506001600081905550505050565b60026000541415610bce576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc590611637565b60405180910390fd5b6002600081905550600060056000838152602001908152602001600020600501549050600060056000848152602001908152602001600020600201549050813414610c4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c45906115f7565b60405180910390fd5b60006005600085815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610ccf573d6000803e3d6000fd5b508473ffffffffffffffffffffffffffffffffffffffff166323b872dd3033856040518463ffffffff1660e01b8152600401610d0d9392919061159e565b600060405180830381600087803b158015610d2757600080fd5b505af1158015610d3b573d6000803e3d6000fd5b50505050336005600086815260200190815260200160002060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060016005600086815260200190815260200160002060060160006101000a81548160ff021916908315150217905550610dcd6002611205565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050158015610e37573d6000803e3d6000fd5b5050505060016000819055505050565b60606000610e5560016111f7565b905060008060005b83811015610efe573373ffffffffffffffffffffffffffffffffffffffff1660056000600184610e8d91906116dc565b815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610eeb57600183610ee891906116dc565b92505b8080610ef6906117c0565b915050610e5d565b5060008267ffffffffffffffff811115610f41577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610f7a57816020015b610f6761121b565b815260200190600190039081610f5f5790505b50905060005b848110156111ec573373ffffffffffffffffffffffffffffffffffffffff1660056000600184610fb091906116dc565b815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156111d95760006005600060018461101191906116dc565b81526020019081526020016000206000015490506000600560008381526020019081526020016000209050806040518060e0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600582015481526020016006820160009054906101000a900460ff1615151515815250508486815181106111bc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101819052506001856111d491906116dc565b945050505b80806111e4906117c0565b915050610f80565b508094505050505090565b600081600001549050919050565b6001816000016000828254019250508190555050565b6040518060e0016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000151581525090565b6000813590506112ab81611928565b92915050565b6000813590506112c08161193f565b92915050565b600080604083850312156112d957600080fd5b60006112e78582860161129c565b92505060206112f8858286016112b1565b9150509250929050565b60008060006060848603121561131757600080fd5b60006113258682870161129c565b9350506020611336868287016112b1565b9250506040611347868287016112b1565b9150509250925092565b600061135d83836114ad565b60e08301905092915050565b61137281611778565b82525050565b61138181611778565b82525050565b61139081611766565b82525050565b61139f81611766565b82525050565b60006113b0826116a2565b6113ba81856116ba565b93506113c583611692565b8060005b838110156113f65781516113dd8882611351565b97506113e8836116ad565b9250506001810190506113c9565b5085935050505092915050565b61140c8161178a565b82525050565b61141b8161178a565b82525050565b600061142e6038836116cb565b915061143982611838565b604082019050919050565b60006114516024836116cb565b915061145c82611887565b604082019050919050565b6000611474601f836116cb565b915061147f826118d6565b602082019050919050565b6000611497601d836116cb565b91506114a2826118ff565b602082019050919050565b60e0820160008201516114c3600085018261153b565b5060208201516114d66020850182611387565b5060408201516114e9604085018261153b565b5060608201516114fc6060850182611369565b50608082015161150f6080850182611369565b5060a082015161152260a085018261153b565b5060c082015161153560c0850182611403565b50505050565b611544816117b6565b82525050565b611553816117b6565b82525050565b600060808201905061156e6000830187611378565b61157b6020830186611378565b611588604083018561154a565b6115956060830184611412565b95945050505050565b60006060820190506115b36000830186611396565b6115c06020830185611396565b6115cd604083018461154a565b949350505050565b600060208201905081810360008301526115ef81846113a5565b905092915050565b6000602082019050818103600083015261161081611421565b9050919050565b6000602082019050818103600083015261163081611444565b9050919050565b6000602082019050818103600083015261165081611467565b9050919050565b600060208201905081810360008301526116708161148a565b9050919050565b600060208201905061168c600083018461154a565b92915050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b60006116e7826117b6565b91506116f2836117b6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561172757611726611809565b5b828201905092915050565b600061173d826117b6565b9150611748836117b6565b92508282101561175b5761175a611809565b5b828203905092915050565b600061177182611796565b9050919050565b600061178382611796565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006117cb826117b6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156117fe576117fd611809565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f506c65617365207375626d6974207468652061736b696e67207072696365207460008201527f6f20636f6d706c65746520746865207075726368617365210000000000000000602082015250565b7f5072696365206d75737420626520657175616c20746f206c697374696e67207060008201527f7269636500000000000000000000000000000000000000000000000000000000602082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b7f5072696365206d757374206265206174206c6561737420312077656921000000600082015250565b61193181611766565b811461193c57600080fd5b50565b611948816117b6565b811461195357600080fd5b5056fea2646970667358221220889a1c089f9b875c82a926048df2fce1ac7b66b1fd3c468b2b0b17f7d98d0cc264736f6c63430008040033";

export class NFTMarket__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFTMarket> {
    return super.deploy(overrides || {}) as Promise<NFTMarket>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NFTMarket {
    return super.attach(address) as NFTMarket;
  }
  connect(signer: Signer): NFTMarket__factory {
    return super.connect(signer) as NFTMarket__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMarketInterface {
    return new utils.Interface(_abi) as NFTMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMarket {
    return new Contract(address, _abi, signerOrProvider) as NFTMarket;
  }
}