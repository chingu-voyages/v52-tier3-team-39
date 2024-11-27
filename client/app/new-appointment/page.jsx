import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Form from "@/components/form/Form";

export default async function FormView() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>You must be signed in to make an appointment</p>;
  }
  return (
    <div>
      <h1>Form View</h1>
      <Form email={session.user.email} />
    </div>
  );
}
