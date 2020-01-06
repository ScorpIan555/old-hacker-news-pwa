import Link from "next/link";
import { withRouter } from "next/router";

const Header = ({ router: { pathname } }) => (
  <header className="flex-container">
    <div>
      <Link href="/">
        <a className={pathname === "/" ? "is-active" : ""}>Hacker News</a>
      </Link>
    </div>
    <div>
      <Link href="/client-only">
        <a className={pathname === "/client-only" ? "is-active" : ""}>new</a>
      </Link>
    </div>
    <div>
      <Link href="/about">
        <a className={pathname === "/about" ? "is-active" : ""}>past</a>
      </Link>
    </div>

    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>comments</a>
    </Link>
    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>ask</a>
    </Link>
    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>show</a>
    </Link>
    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>jobs</a>
    </Link>
    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>submit</a>
    </Link>
    <Link href="/login" className="login">
      <a className={pathname === "/about" ? "is-active" : ""}>login</a>
    </Link>
    <style jsx>{`
      header {
        margin-bottom: 25px;
        background-color: orange;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
      .login {
        position: absolute;
        right: 0px;
        left: 300px;
        background-color: blue;
      }
      .flex-container {
        display: flex;
      }
    `}</style>
  </header>
);

export default withRouter(Header);
