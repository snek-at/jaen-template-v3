import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, connectBlock, connectPage, useField } from "@snek-at/jaen";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const StarsDivider = () => (
  <HStack pt="4">
    {new Array(5).fill(0).map((_, i) => (
      <StarIcon key={i} boxSize="8" color="#958247" />
    ))}
  </HStack>
);

const IMAGE =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80";

const HotelItem = connectBlock(
  (props: BoxProps) => {
    const hiddenUrlField = useField<string>("hiddenUrl", "IMA:TextField");

    const card = (
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            boxSize={{
              // Set the box size to 12rem for screens smaller than md (300px / 25px = 12rem)
              base: "12rem",
              // Set the box size to 14rem for screens equal to or larger than md, but smaller than lg
              md: "14rem",
              // Set the box size to 16rem for screens equal to or larger than lg, but smaller than xl
              lg: "16rem",
              // Set the box size to 18rem for screens equal to or larger than xl, but smaller than 2xl
              xl: "18rem",
              // Set the box size to 20rem for screens equal to or larger than 2xl (500px / 25px = 20rem)
              "2xl": "28rem",
            }}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Field.Image
              name={"image"}
              label="Image"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "50%",
                borderRadius: "1em",
              }}
              imgStyle={{
                borderRadius: "1em",
              }}
              defaultValue={undefined}
            />
          </Box>

          <VStack pt={10} spacing={6} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              <Field.Text name={"lead"} defaultValue={"Lead"} label="Lead" />
            </Text>
            <Heading fontSize={"3xl"} fontFamily={"heading"} fontWeight={500}>
              <Field.Text
                name={"title"}
                defaultValue={"City Pension"}
                label="Heading"
              />
            </Heading>
            <Text color={"gray.500"} textAlign="center">
              <Field.Text
                name={"address"}
                defaultValue={"Addresse"}
                label="Address"
              />
            </Text>
            <Box height={16} w="full">
              <Field.Image
                name={"logoimage"}
                label="Logo"
                objectFit={"contain"}
                imgStyle={{
                  objectFit: "contain",
                }}
                defaultValue={undefined}
              />
            </Box>
            <Field.Text name="hiddenUrl" defaultValue="Empty" label="URL" />
          </VStack>
        </Box>
      </Center>
    );

    const value = (
      hiddenUrlField.value ||
      hiddenUrlField.staticValue ||
      ""
    ).replace(/<\/?[^>]+(>|$)/g, "");

    if (hiddenUrlField.isEditing || !value) {
      return card;
    }

    return (
      <a href={value} target="_blank">
        {card}
      </a>
    );
  },
  {
    name: "HotelCard",
    label: "Hotel Card",
  }
);

const HotelItems = () => {
  return (
    <>
      <Field.Section
        name="hotelfield"
        label="Hotels"
        as={VStack}
        props={{
          display: {
            base: "flex",
            md: "none",
          },
        }}
        blocks={[HotelItem]}
      />
      <Field.Section
        name="hotelfield"
        label="Hotels"
        as={Flex}
        props={{
          display: {
            base: "none",
            md: "flex",
          },
        }}
        sectionProps={(props) => ({
          m: 2,
          mt:
            props.count === 1 || props.count === props.totalSections
              ? undefined
              : 16,
          w: `${100 / props.totalSections}%`,
          objectFit: "cover",
        })}
        blocks={[HotelItem]}
      />
    </>
  );
};

export default connectPage(
  () => {
    const impressumDisclosure = useDisclosure();

    return (
      <Box
        bg={useColorModeValue("white", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          mb={2}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Heading
            as="h2"
            size="xs"
            textTransform="uppercase"
            fontWeight={"thin"}
            textAlign={"center"}
          >
            <Field.Text name="text1" defaultValue="Hotels" label="Pre" />
          </Heading>
          <Heading
            w="full"
            as="h1"
            fontSize={{
              base: "2xl",
              md: "3xl",
              lg: "6xl",
            }}
            textAlign={"center"}
            mt={10}
            color="#958247"
          >
            <Field.Text
              name="title"
              defaultValue="Vienna Hotels"
              label="Heading"
            />
          </Heading>
          <Heading
            as="h2"
            size="xs"
            textTransform="uppercase"
            fontWeight={"thin"}
            textAlign={"center"}
          >
            <Field.Text
              name="text2"
              defaultValue="Hotels in Vienna"
              label="Text"
            />
          </Heading>

          <StarsDivider />
        </Container>

        <Box my="4">
          <HotelItems />
        </Box>

        <StaticImage src="../images/skyline.jpeg" alt="Skyline of Vienna" />
        <Box>
          <Modal
            isOpen={impressumDisclosure.isOpen}
            onClose={impressumDisclosure.onClose}
            size="4xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Impressum</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Field.Text
                  name="impressum"
                  rtf
                  defaultValue={`<p>Impressum gemäß § 25 Mediengesetz:</p><p>Medieninhaber und Herausgeber:</p><p>MATE Beherbergungsbetriebe GmbH City Pension Bauernmarkt 10, 1010 Wien Telefon: +43 1 533 9521 E-Mail: <a href="mailto:welcome@citypension.at">welcome@citypension.at</a> Web: <a target="_blank" rel="noopener noreferrer" href="http://www.citypension.at/">www.citypension.at</a></p><p>Firmenbuchnummer: FN 405266t Firmenbuchgericht: Handelsgericht Wien UID-Nummer: ATU68442134</p><p>Unternehmensgegenstand: Beherbergung, Frühstückspension, Bed &amp; Breakfast</p><p>Mitglied bei der Wirtschaftskammer Wien</p><p>Behörde gem. ECG (E-Commerce Gesetz): Magistratisches Bezirksamt des I. Bezirkes</p><p>Berufsrecht: Gewerbeordnung: <a target="_blank" rel="noopener noreferrer" href="http://www.ris.bka.gv.at/">www.ris.bka.gv.at</a></p><p>Die MATE Beherbergungsbetriebe GmbH ist ein in Österreich ansässiges Unternehmen.</p><p>Offenlegung nach § 25 Mediengesetz: Die Website dient der Darstellung und Bewerbung des Unternehmens und bietet Informationen über die angebotenen Leistungen.</p><p>Für den Inhalt verantwortlich: MATE Beherbergungsbetriebe GmbH</p><p>Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>`}
                  label="Impressum"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Box
            borderTopWidth={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Container
              as={Stack}
              maxW={"6xl"}
              py={4}
              direction={{ base: "column", md: "row" }}
              spacing={4}
              justify={{ base: "center", md: "space-between" }}
              align={{ base: "center", md: "center" }}
            >
              <HStack>
                <Text as={Link} onClick={impressumDisclosure.onToggle}>
                  Impressum
                </Text>
              </HStack>
              <Text>© 2022 snek.at. All rights reserved</Text>

              <Stack direction={"row"} spacing={6}></Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    );
  },
  {
    label: "HomePage",
  }
);

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`;
