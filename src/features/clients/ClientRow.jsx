import styled from "styled-components";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

import { useNavigate } from "react-router-dom";
import { useDeleteClient } from "./useDeleteClient";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useLocalization } from "../../context/LocalizationContext";

const Nickname = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function ClientRow({ client }) {
  const { language } = useLocalization();
  console.log("CLIENT12", client);
  const navigate = useNavigate();
  const { isLoading: isDeleting, deleteClient } = useDeleteClient();
  const {
    id: clientId,
    accountNumber,
    lastName,
    firstName,
    middleName,
    birthDate,
    inn,
    status,
  } = client;

  let newStatus;
  if (status === "IN_WORK") {
    newStatus = language === "en" ? "In work" : "В работе";
  } else if (status === "REJECT") {
    newStatus = language === "en" ? "Reject" : "Отказ";
  } else if (status === "DEAL_CLOSED") {
    newStatus = language === "en" ? "Deal closed" : "Сделка закрыта";
  } else if (status === "NOT_IN_WORK") {
    newStatus = language === "en" ? "Not in work" : "Не в работе";
  }

  return (
    <Table.Row>
      <Nickname>
        {accountNumber.length > 10
          ? accountNumber.slice(0, 10) + "..."
          : accountNumber}
      </Nickname>
      <Nickname>
        {lastName.length > 10 ? lastName.slice(0, 10) + "..." : lastName}
      </Nickname>
      <Nickname>
        {firstName.length > 10 ? firstName.slice(0, 10) + "..." : firstName}
      </Nickname>
      <Nickname>
        {middleName.length > 10 ? middleName.slice(0, 10) + "..." : middleName}
      </Nickname>
      <Nickname>
        {birthDate.length > 10 ? birthDate.slice(0, 10) + "..." : birthDate}
      </Nickname>
      <Nickname>{inn.length > 10 ? inn.slice(0, 10) + "..." : inn}</Nickname>
      <Nickname>
        {newStatus.length > 10 ? newStatus.slice(0, 10) + "..." : newStatus}
      </Nickname>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={clientId} />
          <Menus.List id={clientId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/clients/${clientId}`)}
            >
              {language === "en" ? "See details" : "Посмотреть детали"}
            </Menus.Button>
            <Menus.Button
              icon={<HiPencil />}
              onClick={() => navigate(`/clients/change/${clientId}`)}
            >
              {language === "en" ? "Change details" : "Изменить детали"}
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>
                {language === "en" ? "Delete client" : "Удалить клиента"}
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="client"
            disabled={isDeleting}
            onConfirm={() =>
              deleteClient({
                clientId,
              })
            }
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ClientRow;
