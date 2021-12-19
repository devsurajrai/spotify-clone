import { getProviders, signIn } from "next-auth/react";
function login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <img
        className="w-52 mb-5 "
        src="https://links.papareact.com/9xl"
        alt=""
      />
      {console.log(providers)}

      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button
              className="bg-[#18D860] text-white p-5 rounded-full"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
            {console.log(providers.id)}
          </div>
        );
      })}
    </div>
  );
}

export default login;
export async function getServerSideProps() {
  const providers = await getProviders();
  console.log("providers", providers);
  return {
    props: {
      providers,
    },
  };
}
