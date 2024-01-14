import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <div className="flex justify-between m-10 item-center">
        <div>WatchFlix logo</div>
        <Link href="/api/auth/signin">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
