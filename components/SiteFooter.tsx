export default function SiteFooter() {
  return (
    <footer className="page-grid">
      {/*
       * The rule closes the page off, running out to the frame like the rules
       * between a page's sections: the negative margin takes it there and the
       * matching padding brings the text back onto the columns. An empty module
       * row sits between the two.
       */}
      <div className="col-wide -mx-line border-t border-blue px-line pt-(--grid-row)">
        <p className="flex lines-2 items-center text-xs">
          &copy; 2026 Steven Winnick
        </p>
      </div>
    </footer>
  );
}
