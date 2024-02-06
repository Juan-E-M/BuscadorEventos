import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ExcelReportButton from "./ExcelReportButton";

const defaultValues = {
    ocde: "",
    ods: "",
    trl: "",
    crl: "",
    startDate: "",
    endDate: "",
    status: "",
    publication: ""
};

export default function Index(props) {
    const { events, crlOptions, trlOptions, ocdes, odss, countries } =
        props;
    const [crls, setCrls] = useState(crlOptions);
    const [trls, setTrls] = useState(trlOptions);
    const [odsOptions, setOdsOptions] = useState(odss);
    const [ocdeOptions, setOcdeOptions] = useState(ocdes);
    const [searchFilters, setSearchFilters] = useState({ ...defaultValues });
    const crlSelect = useRef();
    const trlSelect = useRef();
    const odsSelect = useRef();
    const ocdeSelect = useRef();

    const handleClean = () => {
        setSearchFilters({ ...defaultValues });
    };

    const handleSearch = (e) => {
        setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
    };

    let data = events.filter((event) => {
        const ocdeMatch = !searchFilters.ocde
            ? true
            : event.ocde.some(
                  (ocde) => ocde.id == searchFilters.ocde
              );
        const odsMatch = !searchFilters.ods
            ? true
            : event.ods.some((ods) => ods.id == searchFilters.ods);
        const trlMatch = !searchFilters.trl
            ? true
            : event.trl_id == searchFilters.trl;
        const crlMatch = !searchFilters.crl
            ? true
            : event.crl_id == searchFilters.crl;
        const startDateMatch = !searchFilters.startDate
            ? true
            : event.start_date == searchFilters.startDate;
        const endDateMatch = !searchFilters.endDate
            ? true
            : event.end_date == searchFilters.endDate;
        const publicationMatch = !searchFilters.publication
            ? true
            : event.publication == searchFilters.publication;
        const statusMatch =
            searchFilters.status === ""
                ? true
                : event.status == searchFilters.status;
        return (
            ocdeMatch &&
            odsMatch &&
            trlMatch &&
            crlMatch &&
            startDateMatch &&
            endDateMatch &&
            publicationMatch &&
            statusMatch
        );
    });

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength - 3) + "...";
        }
        return text;
    };

    useEffect(() => {
        const handleResize = () => {
            if (crlSelect.current) {
                const selectWidth1 = crlSelect.current.offsetWidth;
                const chars1 = Math.floor(selectWidth1 / 6.9);
                const arrayConNuevaClave = crls.map((objeto) => ({
                    ...objeto,
                    truncatedText: truncateText(
                        objeto.name + " - " + objeto.description,
                        chars1
                    ),
                }));
                setCrls(arrayConNuevaClave);
            }
            if (trlSelect.current) {
                const selectWidth2 = trlSelect.current.offsetWidth;
                const chars2 = Math.floor(selectWidth2 / 6.9);
                const arrayConNuevaClave1 = trls.map((objeto) => ({
                    ...objeto,
                    truncatedText: truncateText(
                        objeto.name + " - " + objeto.description,
                        chars2
                    ),
                }));
                setTrls(arrayConNuevaClave1);
            }
            if (odsSelect.current) {
                const selectWidth3 = odsSelect.current.offsetWidth;
                const chars3 = Math.floor(selectWidth3 / 6.9);
                const arrayConNuevaClave3 = odsOptions.map((objeto) => ({
                    ...objeto,
                    truncatedText: truncateText(
                        objeto.name + " - " + objeto.description,
                        chars3
                    ),
                }));
                setOdsOptions(arrayConNuevaClave3);
            }
            if (ocdeSelect.current) {
                const selectWidth4 = ocdeSelect.current.offsetWidth;
                const chars4 = Math.floor(selectWidth4 / 6.9);
                const arrayConNuevaClave4 = ocdeOptions.map((objeto) => ({
                    ...objeto,
                    truncatedText: truncateText(
                        objeto.code + " - " + objeto.name,
                        chars4
                    ),
                }));
                setOcdeOptions(arrayConNuevaClave4);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Buscador de Reconocimientos
                </h2>
            }
        >
            <Head title="Eventos" />
            <div className="py-6 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 inline-flex w-full overflow-hidden rounded-lg bg-white shadow-md">
                        <div className="flex items-center justify-center bg-blue-500">
                            <svg
                                className="h-6 w-6 fill-current text-white"
                                viewBox="0 0 40 40"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"></path>
                            </svg>
                        </div>

                        <div className="px-4 flex-grow">
                            <div className="border-b border-gray-900/10 pb-2">
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                    <div>
                                        <label
                                            htmlFor="crl"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            CRL
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                onChange={handleSearch}
                                                value={searchFilters.crl}
                                                ref={crlSelect}
                                                id="crl"
                                                name="crl"
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {crls.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.truncatedText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="trl"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            TRL
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={searchFilters.trl}
                                                ref={trlSelect}
                                                id="trl"
                                                name="trl"
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {trls.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.truncatedText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="ocde"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            OCDE
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={searchFilters.ocde}
                                                ref={ocdeSelect}
                                                id="ocde"
                                                name="ocde"
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {ocdeOptions.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.truncatedText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="ods"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            ODS
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={searchFilters.ods}
                                                ref={odsSelect}
                                                id="ods"
                                                name="ods"
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                {odsOptions.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.truncatedText}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                    <div>
                                        <label
                                            htmlFor="publication"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Publicación en revista
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                onChange={handleSearch}
                                                value={searchFilters.publication}
                                                id="publication"
                                                name="publication"
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="">
                                                    Seleccionar todos
                                                </option>
                                                
                                                <option value="si">
                                                    si
                                                </option>
                                                <option value="no">
                                                    no
                                                </option>
                                                <option value="no indica">
                                                    no indica
                                                </option>
                                              
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="start_date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Fecha de Inicio
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={searchFilters.startDate}
                                                type="date"
                                                id="start_date"
                                                onChange={handleSearch}
                                                name="startDate"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="end_date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Fecha de Fin
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={searchFilters.endDate}
                                                type="date"
                                                id="end_date"
                                                onChange={handleSearch}
                                                name="endDate"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Estado
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={searchFilters.status}
                                                onChange={handleSearch}
                                                className="block w-full rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-indigo-600 sm:text-sm"
                                                name="status"
                                            >
                                                <option value="">Todos</option>
                                                <option value={1}>
                                                    Vigente
                                                </option>
                                                <option value={0}>
                                                    No Vigente
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div className="col-span-2 flex items-center justify-end">
                                        <p className="mr-3 text-sm text-gray-500">{`(${
                                            data.length ? data.length : 0
                                        } registros)`}</p>
                                        <ExcelReportButton data={data} />
                                        <button
                                            onClick={handleClean}
                                            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Institución
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Nombre Convocatoria
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                        Fecha de Inicio
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                        Fecha de Fin
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                        Estado
                                    </th>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Más
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((event) => (
                                    <tr
                                        key={event.id}
                                        className="text-gray-700"
                                    >
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {event.institution}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {event.name}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {event.start_date}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {event.end_date}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    event.status == 1
                                                }
                                                disabled
                                                className="mr-1"
                                            />
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <Link
                                                className="text-blue-600 underline whitespace-no-wrap hover:text-gray-900"
                                                href={route(
                                                    "events.show",
                                                    { id: event.id }
                                                )}
                                            >
                                                Información
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
