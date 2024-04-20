import { useLocalization } from "../context/LocalizationContext";
import ClientsTable from "../features/clients/ClientsTable";
import Heading from "../ui/Heading";
import SearchBar from "../ui/SearchBar";

function Clients() {
  const { language } = useLocalization();
  return (
    <>
      <SearchBar />
      <Heading as="h1">
        {language === "en" ? "Your clients" : "Ваши клиенты"}
      </Heading>
      <ClientsTable />
    </>
  );
}

export default Clients;
