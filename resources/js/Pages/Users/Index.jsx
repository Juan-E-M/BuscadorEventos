import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from '@inertiajs/react';

export default function Index(props) {
    const users = props.users;

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Usuarios
                </h2>
            }
        >
            <Head title="Usuarios" />

            <div className="p-6 mt-12 max-w-7xl mx-auto sm:px-6 lg:px-8 overflow-hidden rounded-lg shadow-md">
                <table className="w-full shadow">
                    <thead>
                        <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Nombre
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Apellidos
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                Email
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">
                                Telefono
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Más
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-gray-700">
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.name}
                                    </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.lastname}
                                    </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.email}
                                    </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm hidden sm:table-cell">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {user.phone_number}
                                    </p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="text-blue-600 underline whitespace-no-wrap hover:text-gray-900"
                                    >
                                        Information
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
