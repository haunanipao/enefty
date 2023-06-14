import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { FC} from "react";
import { Link } from "react-router-dom";
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Flex, Heading, HStack, Image, Skeleton, Spacer, Text,} from "@chakra-ui/react";

interface INFTCardProps {
  nft: NFT;
}

export const NFTCard: FC<INFTCardProps> = ({ nft }) => {
  
  return (
    
    <Flex direction={"column"} spacing={"4"} maxW={"300px"} >
      <Card>
        <CardHeader>          
            <Link to={`/nft/${nft.metadata.id}`}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                borderRadius="20px"
              />
            </Link>
        </CardHeader>
        <CardBody>  
            <Heading as="h3" size="md">{String(nft.metadata.name)}</Heading>
            <Text>{String(nft.metadata.description)}</Text>
        </CardBody>
        <CardFooter>
          <ButtonGroup>      
            <HStack>
              <Button variant="ghost" leftIcon={<ViewIcon />}>
                Watch
              </Button>
              <Spacer />
              <Button>Claim</Button>
            </HStack>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};
