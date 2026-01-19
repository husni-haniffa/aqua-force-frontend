
import Submissions from "@/components/user/components/Submissions";
import SubmissionForm from "@/components/user/forms/SubmissionForm";

export default function Home() {
  return (
    <div className="container">
      <SubmissionForm/>
      <Submissions/>
    </div>
  );
}
