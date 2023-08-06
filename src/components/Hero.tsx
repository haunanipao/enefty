import { Box, Button, Flex, FormControl, FormLabel, FormHelperText,Heading, Input, InputGroup, InputLeftElement, Text} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { Form, redirect } from 'react-router-dom'
export default function Hero() {
  return (
    <Flex
      direction="column"
      w={'auto'}
      bg="brand.100"
      justifyContent={'center'}
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      m={10}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
        mb={10}
      >
        Collections{' '}
        <Text as={'span'} color={'brand.700'}>
          made easy
        </Text>
      </Heading>
      <Form method="post" action="/create">
        <FormControl mb="40px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
            <Search2Icon color="brand.600" />
            </InputLeftElement>
            <Input
              w={'500px'}
              type="text"
              name="collection address"
              size="lg"
              bg="white.50"
              color="brand.700"
              borderColor="brand.900"
              placeholder="What's the collection address?"
              _placeholder={{ color: 'inherit' }}
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme="brand">
          Find The NFTs
        </Button>
      </Form>
    </Flex>
      )
    }