import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import type { ComponentProps, FC, ReactElement } from "react";

import Layout, { Head } from "../../components/frontend/navigation/layout";

const params = {
  link: "/explore/mission-statement",
  title: "Palais sur le Rocher | Objet de la mission",
  description: "La mission qu'a donnée l'Eternel à notre commission.",
};

const Li: FC<ComponentProps<"li">> = ({ children }) => (
  <li>
    <ChevronRightIcon className="mr-2 inline-block w-4 text-primary-600" />
    {children}
  </li>
);

const MissionStatementPage = () => {
  return (
    <>
      <Head {...params} />
      <main id="explore-mission-statement" className="page-main">
        <header className="relative">
          <div className="bg-img">
            <Image
              width={1920}
              height={1920}
              src="/images/aaron-burden-9zsHNt5OpqE-unsplash.jpg"
              alt="A propos"
              className="image-cover"
            />
          </div>

          <div className="container relative z-10 text-secondary-50">
            <p className="text-xs uppercase sm:text-sm">Explorer</p>

            <h1 className="text-4xl font-extrabold md:text-6xl">
              Objet de la mission
            </h1>

            <p className="mt-8 text-xs sm:text-sm">{params.description}</p>
          </div>
        </header>

        <section className="section">
          <div className="container space-y-8">
            <div className="">
              <h2 className="section-subtitle">Notre vision</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                ipsum officiis, voluptate alias est sapiente itaque ducimus
                cupiditate. Mollitia explicabo aliquam exercitationem veniam.
                Suscipit sunt natus tempora molestias esse dicta.
              </p>
            </div>
            <div className="">
              <h2 className="section-subtitle">Nos engagements</h2>
              <ul className="section-list">
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
              </ul>
            </div>
            <div className="">
              <h2 className="section-subtitle">Notre objectif</h2>
              <ul className="section-list">
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
                <Li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Li>
              </ul>
            </div>
            <div className="">
              <h2 className="section-subtitle">Notre mission</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                ipsum officiis, voluptate alias est sapiente itaque ducimus
                cupiditate. Mollitia explicabo aliquam exercitationem veniam.
                Suscipit sunt natus tempora molestias esse dicta.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

MissionStatementPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MissionStatementPage;
