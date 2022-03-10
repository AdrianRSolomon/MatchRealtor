
import Link from 'next/link';
import Image from 'next/image'
import { Flex, Box, Text, Button, Stack, Heading, useBreakpointValue, } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner =({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl })=> (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300" color="white">
        <Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }){
  return (
    <div>
    <Stack p={8}  direction={{ base: 'column', md: 'row' }}>
      <Flex  flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              color={'blue.900'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'yellow.400',
                zIndex: -1,
              }}>
              Rental Homes for
            </Text>
            <br />{' '}
            <Text color={'blue.900'} as={'span'}>
              Everyone
            </Text>{' '}
          </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Explore from Apartments, builder floors, villas and more
            </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
               <Link href='/search?purpose=for-rent'>
               <Button
                  rounded={'full'}
                  bg={'blue.900'}
                  color={'white'}
                  _hover={{
                    bg: 'yellow.400',
                  }}>
                  Rent
                </Button>
               </Link>
                <Link href='/search?purpose=for-sale'>
                  <Button
                   rounded={'full'}
                   color={'blue.900'}
                   _hover={{
                    bg: 'yellow.400',
                  }}>
                    Buy
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'Login Image'}
              src='/assets/header.jpg'
              width={800}
              height={600}
            />
          </Flex>
        </Stack>
      <Box>
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    <Flex flexWrap='wrap'>
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
    </div>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

