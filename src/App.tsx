import { useForm, type SubmitHandler } from "react-hook-form";

enum GenderEnum {
  month = "2 months",
  year = "1 year",
}

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
  seed: string;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-950 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-bold text-white">
          Commission Simulator
        </h1>

        <p className="mb-2.5 mt-2.5 font-normal text-zinc-400">
          Coloque su capital semilla y un rango de tiempo para calcular su
          comisión.
        </p>

        <hr className="bg-zinc-800 h-0.5" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-white mb-2" htmlFor="email">
              Capital
            </label>
            <input
              {...register("seed")}
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
              id="email"
              placeholder="Insert your capital"
              type="number"
            />

            <label className="text-white mb-2">Monthly</label>
            <select
              {...register("gender")}
              id="monthly"
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-400"
            >
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="9 months">9 months</option>
              <option value="12 months">12 months</option>
            </select>
          </div>

          <button
            className="bg-white text-zinc-950 hover:bg-white/90 active:bg-white/80 font-medium text-center w-full max-w-full items-center justify-center rounded-lg text-2xl py-2 mt-2"
            type="submit"
          >
            Consult
          </button>
        </form>
      </div>
    </div>
  );
}
