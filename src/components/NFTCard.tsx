import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { FC } from "react";
import { Link } from "react-router-dom";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Divider, Flex, Heading, HStack, Image, Skeleton, Spacer, Text,} from "@chakra-ui/react";

interface INFTCardProps {
  nft: NFT;
}

export const NFTCard: FC<INFTCardProps> = ({ nft }) => {
  
  return (
    
    <Flex direction={"column"} spacing={"4"} maxW={"300px"} maxH={"600px"} color="brand.400">
      <Card>
        <CardHeader>          
            <Link to={`/nft/${nft.metadata.id}`}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
              />
            </Link>
        </CardHeader>
        <CardBody>  
            <Heading as="h3" size="md" mb={4}>{String(nft.metadata.name)}</Heading>
            {/* <Text>{String(nft.metadata.description)}</Text> */}
        </CardBody>
        {/* <Divider borderColor="brand.200" />
        <CardFooter>
          <ButtonGroup>      
            <HStack>
              <Button variant="ghost" colorScheme="brand" leftIcon={<ViewIcon />}>
                Watch
              </Button>
              <Spacer />
              <Button colorScheme="brand">Claim</Button>
            </HStack>
          </ButtonGroup>
        </CardFooter> */}
      </Card>
    </Flex>
  );
};
