import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="px-4 py-2 text-white hover:bg-secondary rounded-lg transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;