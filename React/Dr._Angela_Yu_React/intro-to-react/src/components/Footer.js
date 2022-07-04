function Footer({ author, year }) {
  return (
    <>
      <div className="footer">
        <footer>
          <p>This website was created by {author}</p>
          <p>© {year}</p>
        </footer>
      </div>
    </>
  );
}

export default Footer;
