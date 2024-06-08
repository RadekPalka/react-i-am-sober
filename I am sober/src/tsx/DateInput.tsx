export const DateInput: React.FC = () => {
	return (
		<div>
			<label htmlFor='addiction-free-date'>
				Wybierz datę uwolnienia się od uzależnienia
			</label>
			<input type="datetime-local" id='addiction-free-date' required />
		</div>
	);
};
