import { FC } from "react";
import { MediaRenderer, useContract,  useContractRead, useMetadata, useTotalCount} from "@thirdweb-dev/react";
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Container, Flex, Heading, HStack, Image, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";

// Collection Information
const { contract } = useContract(contractAddress); // interact with smart contract
const { data: contractMetadata, isLoading: contractLoading } = useMetadata(contract); // get collection metadata eg image and description
const { data: totalCount } = useTotalCount(contract); // how many nft in collection
const { data: totalMinted } = useContractRead(contract,"totalMinted"); // how many nft minted

interface ICollectionProps {
  collection: string;
}


export const Collection: FC<ICollectionProps> = ({ collection }) => {
// export default function Collection() {

  return (
    <Card direction="row">
    <CardHeader w="25%">
      <Skeleton isLoaded={!contractLoading}>
        <Image src={contractMetadata?.image} alt={contractMetadata?.name} borderradius="20px"/>
      </Skeleton>
    </CardHeader>
    <CardBody w="50%">
      <Flex direction="column" gap={10}>
      <Skeleton isLoaded={!contractLoading}>
        <Heading
          bgGradient="linear(to-l, #DC0092, #8108B7)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >{contractMetadata?.name}</Heading>
        </Skeleton>
        <Skeleton isLoaded={!contractLoading}>
          <Text fontSize="2xl">{contractMetadata?.description}</Text>
        </Skeleton>
      </Flex>
    </CardBody>
    <CardFooter w="25%">
      <Flex direction="column" gap={10} borderColor="brand.700" fontSize="1xl" wrap="wrap">
        <Skeleton isLoaded={!contractLoading} fontSize="20px"> 
          <HStack>                 
            <Text fontWeight="bold">Collection Address </Text>
            <Text>{truncateAddress(contractAddress)} </Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Symbol</Text>          
            <Text>{contractMetadata?.symbol}</Text>
          </HStack>
          <Text>{totalCount?.toNumber()} NFTs in Collection  </Text>
          <Text>{totalMinted?.toNumber()} NFTs Minted from Collection </Text>
        </Skeleton>
      </Flex>
    </CardFooter>
  </Card>
  );
};
