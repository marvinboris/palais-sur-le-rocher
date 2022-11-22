import Logo from "../../../ui/logo";

export default function Footer() {
    return <footer>
        <div className="container py-8 md:py-16 md:flex space-y-3 md:space-y-0 flex-wrap items-center justify-between border-t border-secondary-100 dark:border-secondary-200/20">
            <div>
                <Logo />
            </div>

            <div>© {new Date().getFullYear()} Copyright - <span className="font-semibold">Palais sur le Rocher</span></div>
        </div>
    </footer>
}