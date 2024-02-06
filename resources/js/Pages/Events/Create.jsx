import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from 'sweetalert2'

export default function ContestableFundCreate(props) {
    const { crlOptions, trlOptions, ocdes, odss, countries } = props;
    const [crls, setCrls] = useState(crlOptions);
    const [trls, setTrls] = useState(trlOptions);
    const initialState = {
        institution: "",
        name: "",
        summary: "",
        start_date: "",
        end_date: "",
        status: "1",
        budget: "",
        link: "",
        others: "-",
        ods: [],
        ocde: [],
        trl: "",
        crl: "",
        publication: "",
        country: "",
        region: "",
        file: null,
    }
    const [formData, setFormData] = useState({...initialState});

    const crlSelect = useRef();
    const trlSelect = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({ ...prevData, file }));
    };

    const handleChange2 = (event) => {
        const { name, options } = event.target;
        const selectedValues = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedValues,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submit = () => {
        event.preventDefault();
        const formData1 = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key];
                if (Array.isArray(value)) {
                    value.forEach((val, index) => {
                        formData1.append(`${key}[${index}]`, val);
                    });
                } else {
                    formData1.append(key, value);
                }
            }
        }
        router.post("/events-store", formData1,
            {
                onSuccess: () => {
                    setFormData({...initialState})
                    return Swal.fire({
                        title: "Registro realizado",
                        text: "Nuevo evento añadido",
                        icon: "success"
                      });
                },
                onError:() => {
                    return Swal.fire({
                        icon: "Error",
                        title: "Oops...",
                        text: "Algo salió mal",
                      });
                }
            }
        );
    };

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
                    Registrar Evento
                </h2>
            }
        >
            <Head title="Registro Evento" />
            <div className="py-6 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Organización o Institución
                                </h2>
                                <input
                                    required
                                    autoFocus={false}
                                    value={formData.institution}
                                    onChange={handleChange}
                                    type="text"
                                    id="institution"
                                    name="institution"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Llenado de los detalles.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Nombre Evento
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="summary"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Resumen del evento
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                required
                                                value={formData.summary}
                                                onChange={handleChange}
                                                id="summary"
                                                name="summary"
                                                rows="4"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            País
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.country}
                                                onChange={handleChange}
                                                id="country"
                                                name="country"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Selecciona un país
                                                </option>
                                                {countries.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Región
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.region}
                                                onChange={handleChange}
                                                type="text"
                                                id="region"
                                                name="region"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="crl"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            CRL (Commercial Readiness Level)
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                ref={crlSelect}
                                                value={formData.crl}
                                                id="crl"
                                                name="crl"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm overflow-hidden"
                                            >
                                                <option value="" disabled>
                                                    Select CRL
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
                                            TRL (Technology Readiness Levels)
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                ref={trlSelect}
                                                value={formData.trl}
                                                id="trl"
                                                name="trl"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Select TRL
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
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="ocde"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Área de Conocimiento OCDE
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                multiple
                                                value={formData.ocde}
                                                id="ocde"
                                                name="ocde"
                                                onChange={handleChange2}
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Select multiple ocde
                                                    (ctrl+click)
                                                </option>
                                                {ocdes.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.code} -{" "}
                                                        {item.name}
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
                                            ODS (Objetivo de Desarrollo
                                            Sostenible)
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                multiple
                                                value={formData.ods}
                                                id="ods"
                                                name="ods"
                                                onChange={handleChange2}
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Select multiple ods
                                                    (ctrl+click)
                                                </option>
                                                {odss.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name} -{" "}
                                                        {item.description}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                                                value={formData.start_date}
                                                onChange={handleChange}
                                                type="date"
                                                id="start_date"
                                                name="start_date"
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
                                                value={formData.end_date}
                                                onChange={handleChange}
                                                type="date"
                                                id="end_date"
                                                name="end_date"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Estado de Evento
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                required
                                                value={formData.status}
                                                onChange={handleChange}
                                                id="status"
                                                name="status"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="1">
                                                    Active
                                                </option>
                                                <option value="0">
                                                    Inactive
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="budget"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Presupuesto
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.budget}
                                                onChange={handleChange}
                                                type="number"
                                                step="0.01"
                                                id="budget"
                                                name="budget"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
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
                                                value={formData.publication}
                                                onChange={handleChange}
                                                id="publication"
                                                name="publication"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Selecciona
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
                                            htmlFor="link"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Link
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                required
                                                value={formData.link}
                                                onChange={handleChange}
                                                type="url"
                                                id="link"
                                                name="link"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-4">
                                    <label
                                        htmlFor="others"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Otros
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            required
                                            value={formData.others}
                                            onChange={handleChange}
                                            id="others"
                                            name="others"
                                            rows="4"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="file"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Archivo
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="file"
                                            id="file"
                                            name="file"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
