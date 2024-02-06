import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Show(props) {
    const { event, auth } = props;
    const eventsField = [
        { label: "Nombre", value: event.name },
        { label: "Presupuesto", value: event.budget },
        { label: "País", value: event.country.name },
        { label: "Región", value: event.region },
        { label: "Fecha de Inicio", value: event.start_date },
        { label: "Fecha de Fin", value: event.end_date },
        { label: "Institución", value: event.institution },
        { label: "Resumen", value: event.summary },
        { label: "CRL", value: event.crl.name },
        { label: "TRL", value: event.trl.name },
        {
            label: "OCDE",
            value: event.ocde.map((item) => item.code).join(", "),
        },
        {
            label: "ODS",
            value: event.ods.map((item) => item.name).join(", "),
        },
        {
            label: "Estado",
            value: event.status === 1 ? "Vigente" : "No Vigente",
        },
        { label: "Publicación", value: event.publication },
        { label: "Ir al sitio", name: "link", value: event.link },
        {
            label: "Archivo",
            name: "file_path",
            value: event.file_path,
        },
        { label: "Creación del registro", value: event.created_at },
        { label: "Otros", value: event.others },
    ];


    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/events/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Registro Eliminado",
                            text: "Se elimino el registro",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        return Swal.fire({
                            icon: "Error",
                            title: "Oops...",
                            text: "Algo salió mal",
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Informacion del Evento
                </h2>
            }
        >
            <Head title="Info Evento" />
            <div className="py-6 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {eventsField.map((field, i) => (
                            <div key={i}>
                                <h2 className="text-lg font-medium text-gray-900">
                                    {field.label}
                                </h2>
                                {field.name === "file_path" && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        <a
                                            href={field.value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            Descargar
                                        </a>
                                    </p>
                                )}
                                {field.name === "link" ? (
                                    <a
                                        href={field.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 text-sm text-blue-500"
                                    >
                                        {field.label}
                                    </a>
                                ) : Array.isArray(field.value) ? (
                                    <ul className="mt-1 text-sm text-gray-600">
                                        {field.value.map((item) => (
                                            <li key={item.id}>
                                                {item.name || item.description}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    field.name !== "file_path" && (
                                        <p className="mt-1 text-sm text-gray-600">
                                            {field.value}
                                        </p>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    {auth.user.role_id == 1&& (
                        <button
                            onClick={() => handleDelete(event.id)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
