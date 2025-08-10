import GetApi from "@/lib/api";
import UserWrapper from "@/components/UsersWrapper";


export default async function Home() {

  const users = await GetApi();

  return <UserWrapper initialUsers={users} />;
}
