import * as React from "react";

function Header() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>Copyright &copy; {currentYear}</p>
    </footer>
  );
}

export default Header;
