import { contractAddress } from "@/consts/parameters";
import {
  ConnectWallet,
  useContract,

  useNFT,
} from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { NAV_LOGO } from "@/consts/parameters";
import { Box, Flex, Heading, InputGroup, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@/icons/SearchIcon";
import { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  return (
    
    <Flex p={10} justifyContent={"space-between"} alignItems={'center'}
          bg={useColorModeValue('purple.50', 'purple.900')}
          color={useColorModeValue('purple.700', 'purple.200')}> 
      <Link to="/">
        <Heading as="h1" size="lg">{NAV_LOGO}</Heading>
      </Link>
      <Flex>
        <InputGroup gap={4} alignItems={'center'} >
          <inputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <input type="text" width="600px"
              onChange={(e) => {
                if (
                  e.target.value.match(/^[0-9]*$/) &&
                  Number(e.target.value) > 0
                ) {
                  setSearch(e.target.value);
                } else {
                  setSearch("");
                }
              }}
              placeholder="Search by ID"
          />
        </InputGroup>
      </Flex>
      <ConnectWallet colorScheme="purple" theme="dark" />
    </Flex>
  );
};
