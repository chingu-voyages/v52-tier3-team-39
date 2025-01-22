import UnauthorizedError from "@/components/errors/UnauthorizedError";

export default function Unauthorized() {
  return <UnauthorizedError msg="You are unauthorized to view this page" />;
}
