const ButtonLink = (props: React.ComponentProps<"a">) => {
  return (
    <a
      className="p-1 px-2 border hover:ring-indigo-500 hover:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer"
      {...props}
    />
  );
};

export default ButtonLink;
