const Button = (props: React.ComponentProps<"button">) => {
  return (
    <button
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      {...props}
    />
  );
};

export default Button;
