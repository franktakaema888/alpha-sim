import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button 
      onClick={() => loginWithRedirect()}
      className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition"
    >
      Log In
    </button>
  );
};

export default LoginButton;