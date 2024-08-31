import { Button } from "../components/ui/button";
const Page = () => {
  return (
    <div className="flex flex-col space-y-5">
      <Button>Primary style</Button>
      <Button variant="outline">Outline style</Button>
      <Button variant="destructive">Destructive style</Button>
    </div>
  );
};

export default Page;
