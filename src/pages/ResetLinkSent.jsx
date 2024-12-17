import { useParams } from "react-router";

const ResetLinkSent = () => {
  const params = useParams();
  const email = params.email;

  return (
    <section>
      <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sent✅
          </h2>
          <p className="text-center text-sm leading-normal text-gray-600 mt-2">
            A reset link has been sent to your email address at [{email}].
            Please check your inbox for further instructions. If you haven't
            received the email, please make sure to check your spam folder.
            <br />
            <br />
            <a href="mailto:maimidance@festival.com">
              mailto:maimidance@festival.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetLinkSent;
