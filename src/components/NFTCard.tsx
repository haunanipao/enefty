import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Divider, Flex, Heading, HStack, Image, Skeleton, Spacer, Text,} from "@chakra-ui/react";

interface INFTCardProps {
  nft: NFT;
}

export const NFTCard: FC<INFTCardProps> = ({ nft }) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    
    <Flex direction={"column"} spacing={"4"} maxW={"300px"} maxH={"400px"} color="brand.400">
      <Card>
        <CardHeader 
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>          
            <Link to={`/nft/${nft.metadata.id}`}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
              />
              {hover && (
              <Box bg="brand.200">
                  {/* <Text fontWeight="bold">
                    {String(nft.metadata.id).split(" ")[0]}
                  </Text> */}
                  <Text fontWeight="bold">
                    {String(nft.metadata.name).split(" ")[1]}
                  </Text>
              </Box>  
              )}
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
