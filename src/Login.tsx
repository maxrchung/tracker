import { Authenticator, Flex } from "@aws-amplify/ui-react";

export default function Login() {
  return (
    <Flex height="100vh" justifyContent="center">
      <Authenticator />
    </Flex>
  );
}
