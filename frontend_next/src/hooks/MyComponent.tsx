import { useSuiClientQuery } from '@mysten/dapp-kit';
 
export function MyComponent() {
	const { data, isPending, isError, error, refetch } = useSuiClientQuery(
		'getOwnedObjects',
		{ owner: '0x9222bc4b61099ced2ab5719c6528567ff75dafbfa3cddf9e2078e5c733dd3294' },
		{
			gcTime: 10000,
		},
	);
 
	if (isPending) {
		return <div>Loading...</div>;
	}
 
	if (isError) {
		return <div>Error: {error.message}</div>;
	}
 
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
