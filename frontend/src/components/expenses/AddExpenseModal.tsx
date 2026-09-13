import { useAddExpense } from "../../hooks/expenses/useAddExpense"
import { useGetCategories } from "../../hooks/categories/useGetCategories"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { CreateExpenseCredentials } from "../../types/expense.types"
import { createExpenseSchema } from "../../../../shared/schemas/expense-schema.js"

interface AddExpenseModalProps {
    onClose: () => void
}

const AddExpenseModal = ({ onClose }: AddExpenseModalProps) => {

    const { mutate: addExpense, isPending } = useAddExpense()
    const { data: categories } = useGetCategories()

    const { register, handleSubmit, formState: { errors } } = useForm<CreateExpenseCredentials>({
        resolver: zodResolver(createExpenseSchema)
    })

    const submitForm = (data: CreateExpenseCredentials) => {
        addExpense(data, { onSuccess: onClose })
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
                    Nuevo gasto
                </h2>
                <p className="mt-2 max-w-[38ch] leading-relaxed text-ink/70">
                    Registrá en qué gastaste y cuánto.
                </p>

                <form className="mt-7 flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-normal text-ink/70">
                            Nombre
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <i className="bi bi-card-heading text-ink/40"></i>
                            <input
                                id="name"
                                type="text"
                                placeholder="Almuerzo, nafta, alquiler..."
                                className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/60"
                                {...register("name")}
                            />
                        </div>
                        {errors.name && (
                            <span className="text-sm text-red-600">{errors.name.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="amount" className="text-sm font-normal text-ink/70">
                            Monto
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <i className="bi bi-currency-dollar text-ink/40"></i>
                            <input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/60"
                                {...register("amount", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.amount && (
                            <span className="text-sm text-red-600">{errors.amount.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-normal text-ink/70">
                            Descripción <span className="text-ink/50">(opcional)</span>
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <i className="bi bi-card-text text-ink/40"></i>
                            <input
                                id="description"
                                type="text"
                                placeholder="Detalle opcional del gasto"
                                className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/60"
                                {...register("description")}
                            />
                        </div>
                        {errors.description && (
                            <span className="text-sm text-red-600">{errors.description.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="paymentMethod" className="text-sm font-normal text-ink/70">
                            Método de pago
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <i className="bi bi-credit-card text-ink/40"></i>
                            <select
                                id="paymentMethod"
                                defaultValue=""
                                className="w-full bg-transparent text-sm font-normal text-ink outline-none"
                                {...register("paymentMethod", { required: "Elegí un método de pago" })}
                            >
                                <option value="" disabled>Seleccioná un método</option>
                                <option value="transfer">Transferencia</option>
                                <option value="cash">Efectivo</option>
                            </select>
                        </div>
                        {errors.paymentMethod && (
                            <span className="text-sm text-red-600">{errors.paymentMethod.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="categoryId" className="text-sm font-normal text-ink/70">
                            Categoría
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                            <i className="bi bi-tag text-ink/40"></i>
                            <select
                                id="categoryId"
                                defaultValue=""
                                disabled={!categories}
                                className="w-full bg-transparent text-sm font-normal text-ink outline-none disabled:cursor-not-allowed"
                                {...register("categoryId", { required: "Elegí una categoría" })}
                            >
                                <option value="" disabled>
                                    {categories ? "Seleccioná una categoría" : "Cargando categorías..."}
                                </option>
                                {categories?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.categoryId && (
                            <span className="text-sm text-red-600">{errors.categoryId.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-1 cursor-pointer rounded-xl bg-quaternary py-3.5 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? "Creando..." : "Crear gasto"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddExpenseModal
