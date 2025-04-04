import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormData } from "../interfaces";

interface SimulationFormProps {
  onSimulate: (data: FormData) => void;
}

export function SimulationForm({ onSimulate }: SimulationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSimulate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 bg-[#18181b] rounded-lg"
    >
      {/* Capital semilla */}
      <div className="mb-6">
        <label
          htmlFor="capital"
          className="block text-neutral-100 font-bold mb-2"
        >
          Capital Semilla
        </label>

        <input
          id="capital"
          type="number"
          step="0.01"
          {...register("capital", {
            required: "El capital es requerido",
            min: { value: 1, message: "El capital debe ser mayor a 0" },
          })}
          className={`w-full p-2 rounded-lg bg-neutral-800 ${
            errors.capital && "border-red-500 border"
          }`}
        />
        {errors.capital && (
          <p className="text-red-500 text-sm mt-1">{errors.capital.message}</p>
        )}
      </div>

      {/* Duración en meses */}
      <div className="mb-6">
        <p className="text-neutral-100 font-bold mb-2">Duración (meses)</p>

        <div className="flex space-x-4">
          {["3", "6", "9", "12"].map((duration) => (
            <label key={duration} className="inline-flex items-center">
              <input
                type="radio"
                value={duration}
                {...register("months", {
                  required: "Seleccione una duración",
                })}
                className=" text-blue-500"
              />
              <span className="ml-2">{duration} meses</span>
            </label>
          ))}
        </div>
        {errors.months && (
          <p className="text-red-500 text-sm mt-1">{errors.months.message}</p>
        )}
      </div>

      {/* Tipo de beneficio */}
      <div className="mb-6">
        <p className="block text-neutral-100 font-bold mb-2">
          Tipo de Beneficio
        </p>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="simple"
              {...register("benefitType", {
                required: "Seleccione un tipo de beneficio",
              })}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Beneficio Simple</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="compounded"
              {...register("benefitType", {
                required: "Seleccione un tipo de beneficio",
              })}
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Interés Compuesto</span>
          </label>
        </div>
        {errors.benefitType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.benefitType.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        SIMULAR
      </button>
    </form>
  );
}
