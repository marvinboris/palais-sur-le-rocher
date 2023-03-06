import Logo from "../../../ui/logo";

export default function Footer() {
  return (
    <footer>
      <div className="container flex-wrap items-center justify-between space-y-3 border-t border-secondary-100 py-8 dark:border-secondary-200/20 md:flex md:space-y-0 md:py-16">
        <div>
          <Logo />
        </div>

        <div>
          © {new Date().getFullYear()} Copyright -{" "}
          <span className="font-semibold">Palais sur le Rocher</span>
        </div>
      </div>
    </footer>
  );
}
