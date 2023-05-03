import { Flex, VStack } from "@chakra-ui/react";
import { Field } from "@snek-at/jaen";
import { HotelItem } from "../";

export const HotelItems = () => {
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
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          width: "100%",
          justifyContent: "center",
        }}
        props={{
          display: {
            base: "none",
            md: "flex",
          },
        }}
        sectionProps={(props) => ({
          ...props,
          justifyContent: "center",
          alignItems: "center",
        })}
        blocks={[HotelItem]}
      />
    </>
  );
};
