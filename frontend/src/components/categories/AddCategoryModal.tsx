import { useForm } from "react-hook-form"
import { useNewCategory } from "../../hooks/categories/useNewCategory"
import type { CreateCategoryCredentials } from "../../types/category.types"
import { createCategorySchema } from "../../../../shared/schemas/category-schema"
import { zodResolver } from "@hookform/resolvers/zod"

interface AddCategoryModalProps {
    onClose: () => void
}

const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateCategoryCredentials>({
        defaultValues: { color: "#ff3baa" },
        resolver: zodResolver(createCategorySchema)
    })

    const { mutate: newCategory, isPending } = useNewCategory()

    const submitForm = (data: CreateCategoryCredentials) => {
        newCategory(data, { onSuccess: onClose })
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-5 py-12"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-3xl bg-primary p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),0_45px_80px_-20px_rgba(0,0,0,0.55)] md:p-10"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="absolute right-6 top-6 cursor-pointer text-ink/40 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
                >
                    <i className="bi bi-x-lg text-lg"></i>
                </button>

                <h2 className="pr-8 text-2xl font-semibold text-ink md:text-3xl">
                    Nueva categoría
                </h2>
                <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
                    Elegí un nombre y un color para identificar tus gastos.
                </p>

                <form className="mt-7 flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-normal text-ink/70">
                            Nombre
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <i className="bi bi-tag text-ink/40"></i>
                            <input
                                id="name"
                                type="text"
                                placeholder="Comida, transporte, ocio..."
                                className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/60"
                                {...register("name", {
                                    required: "Ingresá un nombre para la categoría",
                                    minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                    maxLength: { value: 100, message: "El nombre es demasiado largo" },
                                })}
                            />
                        </div>
                        {errors.name && (
                            <span className="text-sm text-red-600">{errors.name.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="color" className="text-sm font-normal text-ink/70">
                            Color
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <input
                                id="color"
                                type="color"
                                className="h-8 w-10 shrink-0 cursor-pointer rounded-lg border border-ink/15 bg-transparent"
                                {...register("color", { required: true })}
                            />
                            <span className="text-sm font-normal text-ink/60">
                                Se usa para diferenciar la categoría de un vistazo
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-1 cursor-pointer rounded-xl bg-quaternary py-3.5 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? "Creando..." : "Crear categoría"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCategoryModal
