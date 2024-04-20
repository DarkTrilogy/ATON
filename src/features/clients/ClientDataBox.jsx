import styled from "styled-components";
import DataItem from "../../ui/DataItem";
import { MdAccountCircle } from "react-icons/md";

import { useLocalization } from "../../context/LocalizationContext";
import { CiCalendar } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { TbNumber } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

function ClientDataBox({ client }) {
  const { language } = useLocalization();
  let {
    accountNumber,
    lastName,
    firstName,
    middleName,
    birthDate,
    inn,
    status,
  } = client;

  if (status === "IN_WORK") {
    status = language === "en" ? "In work" : "В работе";
  } else if (status === "REJECT") {
    status = language === "en" ? "Reject" : "Отказ";
  } else if (status === "DEAL_CLOSED") {
    status = language === "en" ? "The deal is closed" : "Сделка закрыта";
  } else if (status === "NOT_IN_WORK") {
    status = language === "en" ? "Not in work" : "Не в работе";
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <TbNumber />
          <p>{accountNumber}</p>
        </div>
      </Header>

      <Section>
        <DataItem
          icon={<MdAccountCircle color="var(--color-brand-600)" size={32} />}
          label={language === "en" ? "Lastname" : "Фамилия"}
        >
          {lastName}
        </DataItem>
        <DataItem
          icon={<MdAccountCircle color="var(--color-brand-600)" size={32} />}
          label={language === "en" ? "Firstname" : "Имя"}
        >
          {firstName}
        </DataItem>
        <DataItem
          icon={<MdAccountCircle color="var(--color-brand-600)" size={32} />}
          label={language === "en" ? "Middlename" : "Отчество"}
        >
          {middleName}
        </DataItem>
        <DataItem
          icon={<CiCalendar color="var(--color-brand-600)" size={32} />}
          label={language === "en" ? "Birth date" : "День рождения"}
        >
          {birthDate}
        </DataItem>
        <DataItem
          icon={<IoIosDocument color="var(--color-brand-600)" size={32} />}
          label={language === "en" ? "INN" : "ИНН"}
        >
          {inn}
        </DataItem>
        <DataItem
          icon={<GrStatusGood color="var(--color-brand-600)" size={32} />}
          label={language === "en" ? "Status" : "Статус"}
        >
          {status}
        </DataItem>
      </Section>
    </StyledBookingDataBox>
  );
}

export default ClientDataBox;
