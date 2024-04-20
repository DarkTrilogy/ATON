import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import ClientRow from "./ClientRow";
import { useClients } from "./useClients";
import { useLocalization } from "../../context/LocalizationContext";
import Button from "../../ui/Button";
import {
  ACCOUNTNUMBER_EN,
  ACCOUNTNUMBER_RU,
  BIRTHDATE_EN,
  BIRTHDATE_RU,
  FIRSTNAME_EN,
  FIRSTNAME_RU,
  INN_EN,
  INN_RU,
  LASTNAME_EN,
  LASTNAME_RU,
  MIDDLENAME_EN,
  MIDDLENAME_RU,
  STATUS_EN,
  STATUS_RU,
} from "../../utils/constants";

function ClientsTable() {
  const navigate = useNavigate();
  const { language } = useLocalization();
  let { clients, isLoading } = useClients();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 2fr 2fr 2fr 0.1fr">
        <Table.Header>
          <div>{language === "en" ? ACCOUNTNUMBER_EN : ACCOUNTNUMBER_RU}</div>
          <div>{language === "en" ? LASTNAME_EN : LASTNAME_RU}</div>
          <div>{language === "en" ? FIRSTNAME_EN : FIRSTNAME_RU}</div>
          <div>{language === "en" ? MIDDLENAME_EN : MIDDLENAME_RU}</div>
          <div>{language === "en" ? BIRTHDATE_EN : BIRTHDATE_RU}</div>
          <div>{language === "en" ? INN_EN : INN_RU}</div>
          <div>{language === "en" ? STATUS_EN : STATUS_RU}</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={clients}
          render={(client) => (
            <ClientRow
              key={client.id}
              client={client}
              onClick={() => navigate(`/clients/${client.id}`)}
            />
          )}
        />
        <Table.Footer>
          <Button size="large" onClick={() => navigate("/client/new")}>
            Add client
          </Button>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ClientsTable;
