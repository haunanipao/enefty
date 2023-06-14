import { Flex, Text, useColorModeValue, HStack } from '@chakra-ui/react'
import { NAV_LOGO } from "@/consts/parameters";
import type { FC } from "react";

export const Footer: FC = ({

}) => {
  return (
    <Flex
      p={"20px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap="2"
      direction="row"
      bg={useColorModeValue("brand.50", "brand.900")}
      color={useColorModeValue("brand.700", "brand.200")}
    >
        <Text>{NAV_LOGO}</Text>
        <Text>© 2023 Copyright</Text>
      <HStack gap="3">
        <Text>Twitter</Text>
        <Text>Discord</Text>
      </HStack>
    </Flex>
  )
}