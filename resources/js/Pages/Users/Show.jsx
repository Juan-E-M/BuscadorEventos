import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function Show(props) {
    const user = usePage().props.user;
    const userFields = [
        { label: "Nombre", value: user.name },
        { label: "Apellido", value: user.lastname },
        { label: "Email", value: user.email },
        { label: "Número de Teléfono", value: user.phone_number },
        { label: "Institución de Trabajo", value: user.work_institution },
        { label: "Institución Educativa", value: user.college_institution },
        { label: "Grado Académico", value: user.academic_degree },
        { label: "Fecha de Nacimiento", value: user.birth_date },
    ];

    const formatDate = (date) => {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth() + 1; // Sumar 1 ya que en JavaScript los meses comienzan desde 0
        const year = parsedDate.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const formatField = (field) => {
        if (field.label === "Fecha de Nacimiento") {
            return formatDate(field.value);
        } else {
            return field.value;
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Información Usuario
                </h2>
            }
        > 
            <Head title="Info Usuario" />
            <section className="p-6 mt-2 max-w-7xl mx-auto sm:px-6 lg:px-8 rounded-lg shadow-md">
                <div className="mx-auto grid grid-cols-2 md:grid-cols-2 gap-4 mt-6 justify-center text-center">
                    {userFields.map((field, key) => (
                        <div key={key}>
                            <h2 className="text-lg font-medium text-gray-900">
                                {field.label}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">{formatField(field)}</p>
                        </div>
                    ))}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
