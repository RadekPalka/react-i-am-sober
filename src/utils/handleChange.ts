export const handleChange = (
	callback: React.Dispatch<React.SetStateAction<string>>,
	value: string
) => {
	callback(value);
};
