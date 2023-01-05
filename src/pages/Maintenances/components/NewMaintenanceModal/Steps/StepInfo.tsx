interface StepInfoProps {
  register: any
}

export function StepInfo({ register }: StepInfoProps) {
  return (
    <>
      <div className="w-full">
        <label
          htmlFor="description"
          className="block text-xs font-medium text-gray-700"
        >
          Data da manutenção
          <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          className="mt-1 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-md w-full border-none shadow-md"
          placeholder="Select date"
          {...register('maintenanceDate')}
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="description"
          className="block text-xs font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          className="w-full p-3 mt-1 shadow-md rounded-md"
          rows={5}
          {...register('description')}
        ></textarea>
      </div>
    </>
  )
}
