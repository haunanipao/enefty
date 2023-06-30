import { FC } from "react";
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { Button, Flex, Link} from "@chakra-ui/react";

interface INavNFTProps {
  id: number;
  prevId: number;
  nextId: number;
  totalNFTs: number;
  contractMetadata: any;
}

export const NavNFT: FC<INavNFTProps> = ({
  id, 
  prevId, 
  nextId, 
  totalNFTs, 
  contractMetadata,
}) => {
 
  return (
    <Flex p={10} gap={10} bg="brand.50" justifyContent="space-around" alignItems="center">
      {id > 0 && (
        <Link href={`/nft/${prevId}`}>
          <Button leftIcon={<ArrowBackIcon />}  colorScheme="brand">
          {contractMetadata?.name} {prevId}
          </Button>
        </Link>
      )}
      <Link href="/">
        <Button rightIcon={<ArrowUpIcon/>} variant="outline" colorScheme="brand">
                Collection Home</Button>
      </Link>
      {totalNFTs > nextId && (
        <Link href={`/nft/${nextId}`}>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="brand">
          {contractMetadata?.name} {nextId}
          </Button>
        </Link>
      )}
    </Flex>
  )
}
