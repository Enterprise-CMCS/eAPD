import React from 'react';
import {
  BackgroundImage,
  Badge,
  BlockLink,
  Box,
  Button,
  ButtonCircle,
  ButtonOutline,
  Card,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Label,
  Message,
  Radio,
  Select,
  Slider,
  Small,
  Subhead,
  Tabs,
  TabItem,
  Text,
  Textarea,
  Tooltip,
  Truncate,
  fontSizes
} from 'rebass';

const scale = [...fontSizes].reverse();
const photo =
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20';

// eslint-disable-next-line react/prop-types
const Section = ({ children, name }) => (
  <Container is="section" id={name} py={4}>
    <Heading>
      <BlockLink href={`#${name}`}>{name}</BlockLink>
    </Heading>
    {children}
  </Container>
);

const Demo = () => (
  <Box py={4}>
    <Tabs mb={4}>
      <TabItem active>Beep</TabItem>
      <TabItem>Boop</TabItem>
      <TabItem>Bop</TabItem>
    </Tabs>

    <Heading mb={4}>
      Hello
      <Badge>Beep</Badge>
    </Heading>

    <Message mb={4}>
      Message: a verbal, written, or recorded communication sent to or left for
      a recipient who cannot be contacted directly
    </Message>

    <Flex wrap mx={-2} mb={4}>
      {'abcd'.split('').map(x => (
        <Box key={x} p={2} w={[1, 1 / 2, 1 / 4]}>
          <Card>
            <BackgroundImage src={photo} />
            <Box p={2}>
              <Subhead>Card {x.toUpperCase()}</Subhead>
              <Small>Small meta text</Small>
            </Box>
          </Card>
        </Box>
      ))}
    </Flex>

    <Box mb={4}>
      <Button mr={2}>Hello</Button>
      <ButtonCircle mr={2}>Hello</ButtonCircle>
      <ButtonOutline mr={2}>Hello</ButtonOutline>
      <Tooltip text="Hello">
        <Text>Hover Me</Text>
      </Tooltip>
    </Box>

    <Heading mb={2}>Form elements</Heading>
    <form>
      <Box mb={3}>
        <Label>Input</Label>
        <Input defaultValue="Hello" />
      </Box>
      <Box mb={3}>
        <Label>Select</Label>
        <Select defaultValue="Hello">
          <option>Hello</option>
          <option>World</option>
        </Select>
      </Box>
      <Box mb={3}>
        <Label>Input</Label>
        <Textarea defaultValue="Hello" />
      </Box>
      <Box mb={3}>
        <Label>
          <Checkbox />
          Check it
        </Label>
      </Box>
      <Box mb={3}>
        <Label>
          <Radio name="foo" defaultChecked />
          Pick me
        </Label>
        <Label>
          <Radio name="foo" />
          Pick me
        </Label>
      </Box>
      <Box mb={3}>
        <Label>Slider</Label>
        <Slider />
      </Box>
    </form>

    <Section name="Typographic Scale">
      <Text>
        The default typographic scale is basedo n a 16px base and common sizes,
        well suited for responsive typography that helps maintain a natural
        feeling visual rhythm.
      </Text>
      {scale.map(f => (
        <Truncate key={f} f={f} bold mb={2}>
          {f}px The quick brown fox jumped over the lazy dog.
        </Truncate>
      ))}
    </Section>
  </Box>
);

export default Demo;
