import { useContentContext } from "../../../app/contexts/content";

export default function Footer() {
  const { content } = useContentContext();
  const {
    cms: {
      global: { company_name },
      backend: {
        footer: { all_rights, copyright },
      },
    },
  } = content!;

  return (
    <footer className="hidden pl-9 md:block">
      <div className="flex items-center border-t border-secondary-700/20 py-5 pl-[76px]">
        <div className="mr-4 text-2xl font-bold">&copy;</div>

        <div className="text-lg">
          {copyright} {new Date().getFullYear()}. {all_rights}{" "}
          <span className="font-bold text-primary-600">{company_name}</span>
        </div>
      </div>
    </footer>
  );
}
