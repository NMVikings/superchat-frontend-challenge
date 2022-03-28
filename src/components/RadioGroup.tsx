type RadioGroupProps = {
  options: string[];
} & React.ComponentProps<"input">;

const RadioGroup = ({ options, ...props }: RadioGroupProps) => {
  return (
    <div className="flex gap-4">
      {options.map((value, index) => (
        <div key={value} className="flex gap-1 items-center">
          <input
            defaultChecked={index === 0}
            value={value}
            type="radio"
            {...props}
          />
          {value}
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
