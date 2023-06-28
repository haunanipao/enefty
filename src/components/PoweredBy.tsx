import { chain, contractAddress } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export const PoweredBy: FC = () => {
  return (
    <a href={`https://thirdweb.com/${chain}/${contractAddress}`}
      target="_blank"
      rel="noreferrer">
      <HStack gap="4">  
        <Image w="50px" src="/thirdweb.svg" alt="thirdweb" />
        <VStack alignItems="left">
          <Text>thirdweb</Text>
          <Text>{truncateAddress(contractAddress)}</Text>
        </VStack>
      </HStack>
    </a>
  );
};
