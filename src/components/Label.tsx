const Label = (props: React.ComponentProps<"label">) => {
  return (
    <label className="block text-sm font-medium text-gray-700" {...props} />
  );
};

export default Label;
