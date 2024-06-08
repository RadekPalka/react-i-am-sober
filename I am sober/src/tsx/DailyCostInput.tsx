export const DailyCostInput: React.FC = () => {
	return (
		<div>
			<label htmlFor='daily-cost'>
				Ile pieniędzy dziennie traciłeś na uzależnienie?
			</label>
			<input type='number' id='daily-cost' />
		</div>
	);
};
