import { useForm, type SubmitHandler } from "react-hook-form";

interface FormInputs {
  capital: number;
  duration: "3" | "6" | "9" | "12";
  benefitType: "simple" | "compounded";
}

interface SimulationFormProps {
  onSimulate: (data: FormInputs) => void;
}

export function SimulationForm({ onSimulate }: SimulationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
                {...register("duration", {
                  required: "Seleccione una duración",
                })}
                className="appearance-none text-blue-500"
              />
              <span className="ml-2">{duration} meses</span>
            </label>
          ))}
        </div>
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
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

      {/* Botón de simulación */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        SIMULAR
      </button>
    </form>
  );
}
