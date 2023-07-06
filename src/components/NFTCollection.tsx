import { FC } from "react";
import useDebounce from "@/hooks/useDebounce";
import { truncateAddress } from "@/utils/truncateAddress";
import { MediaRenderer, useContract,  useContractRead, useMetadata, useTotalCount} from "@thirdweb-dev/react";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, Heading, HStack, Image, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";

// Collection Information

interface ICollectionProps {
  contractMetadata: string;
  contractAddress: string;
  lastNFT: string;
  totalCount: string;
}

export const NFTCollection: FC<ICollectionProps> = ({contractMetadata, contractAddress, lastNFT, totalCount}) => {

   return (
    <Card direction="row">
          <CardHeader w="25%">
            <Image 
            src={contractMetadata?.image || lastNFT?.metadata.image} 
            alt={contractMetadata?.name || lastNFT?.metadata.name} />
          </CardHeader>
          <CardBody w="50%">
            <Flex direction="column" gap={10}>
              <Heading
                bgGradient="linear(to-l, #DC0092, #8108B7)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >{contractMetadata?.name}</Heading>
              <Text fontSize="2xl">{contractMetadata?.description}</Text>
            </Flex>
          </CardBody>
          <CardFooter w="25%">
            <Flex justifyContent={"top"} direction="column" gap={5} borderColor="brand.700" fontSize="2xl" wrap="wrap">
              <Text fontWeight="bold">Collection Address </Text>
              <Text>{truncateAddress(contractAddress)} </Text>
              <HStack>
                <Text fontWeight="bold">Symbol</Text>          
                <Text>{contractMetadata?.symbol}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="brand.600" fontSize="2xl" alignItems={"top"}>{totalCount?.toNumber()}</Text>
                <Text>NFTs in Collection</Text>
              </HStack>
            </Flex>
          </CardFooter>
        </Card>
  );
};
