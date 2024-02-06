import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        lastname: "",
        email: "",
        phone_number: "",
        work_institution: "",
        college_institution: "",
        academic_degree: "Estudiante Universitario",
        birth_date: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="mb-4">
                <Link href="/" className="flex items-center justify-center">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="lastname" value="Apellidos" />

                    <TextInput
                        id="lastname"
                        name="lastname"
                        value={data.lastname}
                        className="mt-1 block w-full"
                        autoComplete="lastname"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.lastname} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Teléfono" />

                    <TextInput
                        id="phone_number"
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1 block w-full"
                        autoComplete="phone_number"
                        type="number"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError
                        message={errors.phone_number}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="work_institution"
                        value="Institución de trabajo"
                    />

                    <TextInput
                        id="work_institution"
                        name="work_institution"
                        value={data.work_institution}
                        className="mt-1 block w-full"
                        autoComplete="work_institution"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError
                        message={errors.work_institution}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="college_institution"
                        value="Institución de estudio"
                    />

                    <TextInput
                        id="college_institution"
                        name="college_institution"
                        value={data.college_institution}
                        className="mt-1 block w-full"
                        autoComplete="college_institution"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError
                        message={errors.college_institution}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="academic_degree"
                        value="Grado académico"
                    />

                    <select
                        id="academic_degree"
                        name="academic_degree"
                        value={data.academic_degree}
                        className="mt-1 block w-full"
                        autoComplete="academic_degree"
                        onChange={handleOnChange}
                        required
                    >
                        <option value="Estudiante Universitario">
                            Estudiante Universitario
                        </option>
                        <option value="Bachiller">Bachiller</option>
                        <option value="Maestro">Maestro</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <InputError
                        message={errors.academic_degree}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="birth_date"
                        value="Fecha de nacimiento"
                    />

                    <TextInput
                        id="birth_date"
                        name="birth_date"
                        value={data.birth_date}
                        className="mt-1 block w-full"
                        autoComplete="birth_date"
                        onChange={handleOnChange}
                        type="date"
                        required
                    />

                    <InputError
                        message={errors.college_institution}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 col-span-2 flex items-center justify-center">
                    <PrimaryButton
                        className="w-full flex justify-center"
                        disabled={processing}
                    >
                        Registrar
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-2 text-center mb-4">
                <Link
                    href={route("login")}
                    className="text-blue-600 text-sm underline hover: hover:text-gray-900"
                >
                    Ir a Login
                </Link>
            </div>
        </GuestLayout>
    );
}
