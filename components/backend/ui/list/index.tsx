import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useContentContext } from "../../../../app/contexts/content";
import { classNames } from "../../../../app/helpers/utils";

import Button from "../form/button";
import Input from "../form/input";

let timeout: NodeJS.Timeout | null;

type ListProps = {
  total: number;
  title: string;
  subtitle?: string;
  data: string;
  add: string;
  loading?: boolean;
  link: string;
  fields: { key: string; name: string; className?: string }[];
  array: { [key: string]: ReactNode }[];

  icon: (props: ComponentProps<"svg">) => JSX.Element;
  get: (page: number, show: string | number, search: string) => void;
};

export default function List({
  total,
  get,
  icon: Icon,
  data,
  title,
  subtitle,
  fields,
  array,
  add,
  link,
  loading,
}: ListProps) {
  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: { list: cms },
      },
    },
  } = content!;

  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageFirst, setPageFirst] = useState(1);
  const [pageSecond, setPageSecond] = useState(2);
  const [pageLast, setPageLast] = useState(3);

  const [search, setSearch] = useState("");
  const [show, setShow] = useState<string | number>(10);

  useEffect(() => {
    if (show !== "All") setPageNumber(Math.ceil(total / +show));
    else setPageNumber(1);
  }, [show, total]);

  const inputChangedHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    firstPageHandler();
    if (name === "show") {
      get(page, value, search);
      return setShow(value);
    }
    if (name === "search") {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        get(page, show, value);
        clearTimeout(timeout!);
      }, 1000);
      return setSearch(value);
    }
  };

  const previousPageHandler = () => {
    if (page <= 1) return;
    pageChangeHandler(page - 1);
  };

  const nextPageHandler = () => {
    const lastPage = pageNumber;
    if (page >= lastPage) return;
    pageChangeHandler(page + 1);
  };

  const firstPageHandler = () => {
    if (page <= 1) return;
    pageChangeHandler(1);
  };

  const lastPageHandler = () => {
    const lastPage = pageNumber;
    if (page >= lastPage) return;
    pageChangeHandler(lastPage);
  };

  const pageChangeHandler = (page: number) => {
    const lastPage = pageNumber;
    let pageFirst;
    if (page < 3) pageFirst = 1;
    else if (page === lastPage) pageFirst = lastPage - 2;
    else pageFirst = page - 1;
    const pageSecond = pageFirst + 1,
      pageLast = pageFirst + 2;
    setPage(page);
    setPageFirst(pageFirst);
    setPageSecond(pageSecond);
    setPageLast(pageLast);
    get(page, +show, search);
  };

  const onClick = (e: Event) => {
    e.preventDefault();

    const target = e!.target! as EventTarget & HTMLAnchorElement;

    const url = target.href;
    exportData(url);
  };

  const exportData = async (url: string) => {
    const format = url.split("/")[url.split("/").length - 1];
    const name = `${title}.${format}`;
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();

      formData.append("data", data);
      formData.append("name", name);

      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: formData,
        headers: { "x-auth-token": token! },
      });

      const resData = await res.blob();

      const downloadLink = URL.createObjectURL(resData);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadLink;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadLink);
    } catch (err) {
      console.log(err);
    }
  };

  const modulo = total % +show;
  const entries = total === 0 ? total : modulo !== 0 ? modulo : show;

  return (
    <>
      <input type="hidden" id="table-page" value={page} />
      <input type="hidden" id="table-show" value={show} />
      <input type="hidden" id="table-search" value={search} />

      <div className="mb-[25px] rounded-[30px] bg-white py-8 px-[38.36px] shadow-2xl dark:bg-secondary-800">
        <div className="mb-[30.89px] flex flex-wrap items-center justify-between">
          <div className="order-2 space-y-[4.63px] md:order-1">
            <div className="text-[25px] font-bold md:text-[22.21px] md:font-medium">
              {title}
            </div>

            {subtitle && <div className="text-[12.96px]">{subtitle}</div>}

            <div className="h-[6.5732px] w-[30.24px] rounded-xl bg-yellow" />
          </div>

          <div className="order-1 ml-auto mb-8 flex items-center md:order-2 md:ml-0 md:mb-0">
            <div className="hidden h-12 items-center rounded-[6.5732px] bg-secondary-500/[0.06] md:flex">
              <div className="divide-x-secondary-300 flex items-center divide-x-[0.5px] text-sm">
                <div className="flex h-[39px] items-center justify-center px-3">
                  {cms.show}
                </div>

                <div className="relative flex h-[39px] w-[59px] items-center justify-center">
                  <select
                    name="show"
                    id="show"
                    onChange={inputChangedHandler}
                    value={show}
                    className="border-0 bg-transparent p-0 font-bold outline-none"
                  >
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="All">{cms.all}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mr-[12.83px] ml-4 hidden md:block">
              <Input
                type="search"
                name="search"
                icon={MagnifyingGlassIcon}
                onChange={inputChangedHandler}
                value={search}
                placeholder={cms.search}
              />
            </div>

            <div className="flex space-x-3 md:block md:space-x-0">
              <div className="md:hidden">
                <Input
                  type="search"
                  name="search"
                  icon={MagnifyingGlassIcon}
                  onChange={inputChangedHandler}
                  value={search}
                  placeholder={cms.search}
                />
              </div>
              {add && (
                <div>
                  <Link href={link}>
                    <Button icon={PlusIcon} color="yellow">
                      <span className="hidden md:inline">{add}</span>
                      <span>
                        <Icon className="inline-block w-8 md:hidden" />
                      </span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto pb-5 scrollbar-thin scrollbar-track-primary-100 scrollbar-thumb-primary-600">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="relative z-0 after:absolute after:inset-0 after:-z-10 after:rounded-lg after:bg-secondary-500/10">
                <th className="pt-[12.49px] pb-[10.98px] pl-1.5 pr-1.5 text-left font-bold first:pl-[14.64px] last:pr-[14.64px]">
                  SL
                </th>
                {fields.map(({ name }, i) => (
                  <th
                    key={`table-thead-th-${i}`}
                    className="pt-[12.49px] pb-[10.98px] pl-1.5 pr-1.5 text-left font-bold first:pl-[14.64px] last:pr-[14.64px]"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-secondary-800">
              {array &&
                array.map((row, i) => (
                  <tr key={`table-tbody-tr-${i}`} className="group">
                    <td className="border-b border-secondary-100 py-3 pl-1.5 pr-1.5 first:pl-[14.64px] last:pr-[14.64px] group-last:border-0 dark:border-secondary-700">
                      {(show !== "All" ? (page - 1) * +show : 0) + i + 1}
                    </td>
                    {fields.map(({ key, className }, j) => (
                      <td
                        key={`table-tbody-tr-${i}-td-${j}`}
                        className={classNames(
                          "truncate border-b border-secondary-100 py-3 pl-1.5 pr-1.5 first:pl-[14.64px] last:pr-[14.64px] group-last:border-0 dark:border-secondary-700",
                          className || "max-w-[250px]"
                        )}
                      >
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {cms.showing} {+page < pageNumber ? show : entries} {cms.from} {total}{" "}
          {total > 1 ? cms.entries.plural : cms.entries.singular}.
        </div>

        <div className="d-flex justify-content-end pt-2">
          {show !== "All" && (
            <div className="relative z-0 inline-flex items-center space-x-2.5 overflow-hidden rounded-3xl border border-yellow/40 bg-white p-1 text-sm after:absolute after:inset-0 after:-z-10 after:bg-yellow/20 dark:bg-secondary-800">
              {page !== 1 && (
                <>
                  <div
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary-600 text-white"
                    onClick={firstPageHandler}
                  >
                    <ChevronDoubleLeftIcon className="w-3.5" />
                  </div>
                  <div
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-yellow text-white"
                    onClick={previousPageHandler}
                  >
                    <ChevronLeftIcon className="w-3.5" />
                  </div>
                </>
              )}

              <div
                className={classNames(
                  "w-7 cursor-pointer text-center font-bold",
                  page === pageFirst
                    ? "text-yellow"
                    : "opacity-30 dark:text-white dark:opacity-70"
                )}
                onClick={() => pageChangeHandler(pageFirst)}
              >
                {pageFirst}
              </div>

              {pageNumber > 1 && (
                <>
                  <div
                    className={classNames(
                      "w-7 cursor-pointer text-center font-bold",
                      page === pageSecond
                        ? "text-yellow"
                        : "opacity-30 dark:text-white dark:opacity-70"
                    )}
                    onClick={() => pageChangeHandler(pageSecond)}
                  >
                    {pageSecond}
                  </div>

                  {pageNumber > 2 && (
                    <div
                      className={classNames(
                        "w-7 cursor-pointer text-center font-bold",
                        page === pageLast
                          ? "text-yellow"
                          : "opacity-30 dark:text-white dark:opacity-70"
                      )}
                      onClick={() => pageChangeHandler(pageLast)}
                    >
                      {pageLast}
                    </div>
                  )}

                  {page !== pageNumber && (
                    <>
                      <div
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-yellow text-white"
                        onClick={nextPageHandler}
                      >
                        <ChevronRightIcon className="w-3.5" />
                      </div>
                      <div
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary-600 text-white"
                        onClick={lastPageHandler}
                      >
                        <ChevronDoubleRightIcon className="w-3.5" />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
