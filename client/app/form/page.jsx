import Form from "@/components/form/Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function FormView() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <h1>Form View</h1>
      <Form />
    </div>
  );
}
