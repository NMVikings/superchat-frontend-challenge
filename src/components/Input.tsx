const Input = (props: React.ComponentProps<"input">) => {
  return (
    <input
      type="text"
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      {...props}
    />
  );
};

export default Input;
