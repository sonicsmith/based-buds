import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { TOKEN_ADDRESS } from "../constants";

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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

export const getHasCheckMark = async (address: string) => {
  const balance = await publicClient.readContract({
    address: TOKEN_ADDRESS,
    abi,
    functionName: "balanceOf",
    args: [address, 1],
  });
  return (balance as bigint) > 0;
};
