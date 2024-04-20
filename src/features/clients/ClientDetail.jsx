import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import ClientDataBox from "./ClientDataBox";
import { useClient } from "./useClient";
import { useLocalization } from "../../context/LocalizationContext";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ClientDetail() {
  const { language } = useLocalization();
  const { client, isLoading } = useClient();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!client) return <Empty resourceName="client" />;
  console.log("client123", client);

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">
            {client.lastName} {client.firstName} {client.middleName}
          </Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>
          &larr; {language === "en" ? "Back" : "Назад"}
        </ButtonText>
      </Row>

      <ClientDataBox client={client} />
    </>
  );
}

export default ClientDetail;
