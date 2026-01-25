import { Button, Input, Link, Card, CardBody } from '@heroui/react'
import { ThemeSwitch } from "@/components/theme-switch"

const Register = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white font-sans selection:bg-yellow-500/30 p-4 relative">

            {/* BOTÓN DE TEMA */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeSwitch />
            </div>

            {/* CONTENEDOR CENTRAL */}
            <div className="max-w-[500px] w-full flex flex-col gap-10">

                {/* HEADER REFINADO Y ELEGANTE */}
                <header className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-light tracking-[0.2em] text-white uppercase mb-2">
                        Nueva <span className="font-bold text-yellow-600">Cuenta</span>
                    </h2>
                    <div className="h-px w-12 bg-yellow-600/40 mb-4" />
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] font-medium leading-relaxed">
                        Registro Técnico de Operaciones
                    </p>
                </header>

                <Card className="bg-transparent border-none shadow-none" radius="none">
                    <CardBody className="p-0 flex flex-col gap-5">
                        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

                            <Input
                                isRequired
                                type="email"
                                placeholder="Correo electrónico"
                                variant="bordered"
                                radius="sm"
                                size="lg"
                                classNames={{
                                    inputWrapper: "h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all",
                                    input: "text-sm font-normal placeholder:text-zinc-600 text-white"
                                }}
                            />

                            <Input
                                isRequired
                                placeholder="Nombre"
                                variant="bordered"
                                radius="sm"
                                size="lg"
                                classNames={{
                                    inputWrapper: "h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all",
                                    input: "text-sm font-normal placeholder:text-zinc-600 text-white"
                                }}
                            />

                            <Input
                                isRequired
                                placeholder="Apellido"
                                variant="bordered"
                                radius="sm"
                                size="lg"
                                classNames={{
                                    inputWrapper: "h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all",
                                    input: "text-sm font-normal placeholder:text-zinc-600 text-white"
                                }}
                            />

                            <Input
                                isRequired
                                type="password"
                                placeholder="Contraseña"
                                variant="bordered"
                                radius="sm"
                                size="lg"
                                classNames={{
                                    inputWrapper: "h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all",
                                    input: "text-sm font-normal placeholder:text-zinc-600 text-white"
                                }}
                            />

                            <Input
                                isRequired
                                type="password"
                                placeholder="Confirmar contraseña"
                                variant="bordered"
                                radius="sm"
                                size="lg"
                                classNames={{
                                    inputWrapper: "h-14 border-zinc-800 bg-[#121212] group-data-[focus=true]:border-yellow-600 transition-all",
                                    input: "text-sm font-normal placeholder:text-zinc-600 text-white"
                                }}
                            />

                            <Button
                                color="warning"
                                variant="solid"
                                type="submit"
                                className="w-full font-bold text-sm tracking-widest h-14 rounded-lg mt-2 transition-transform active:scale-95 bg-yellow-600 hover:bg-yellow-500 text-black uppercase"
                            >
                                Crear cuenta
                            </Button>
                        </form>

                        {/* Bloque inferior */}
                        <div className="w-full border border-zinc-900 py-6 px-6 text-center mt-4 rounded-sm bg-[#050505]/50">
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">
                                ¿Ya tienes una cuenta?
                                <Link href="/login" className="text-yellow-600 font-bold text-xs ml-2 hover:text-yellow-500 transition-colors uppercase tracking-widest">
                                    Ingresar
                                </Link>
                            </p>
                        </div>
                    </CardBody>
                </Card>

                <footer className="flex flex-col items-center gap-4 mt-12">

                    <img
                        src="./images/LEBAUX-LOGO.png"
                        alt="Logo Lebaux"
                        className="h-10 w-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                    />

                    <div className="flex flex-col items-center gap-1.5">
                        <div className="h-px w-24 bg-yellow-600/50 mb-1" /> {/* Divisor decorativo */}
                        <p className="text-xs text-white font-bold tracking-[0.3em] uppercase">
                            Aberturas Lebaux
                        </p>
                        <p className="text-xs text-zinc-400 font-medium tracking-[0.1em]">
                            SISTEMA CENTRAL DE OPERACIONES <span className="text-yellow-600 mx-1">|</span> © {currentYear}
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Register;





