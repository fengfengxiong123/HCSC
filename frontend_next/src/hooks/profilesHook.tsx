import { useSuiClientQuery } from '@mysten/dapp-kit';
import { SuiClient, SuiObjectData } from '@mysten/sui.js/client';

async function fetchDynamicFields(parentId: string) {
	try {
	  // 初始化 Sui 客户端 https://fullnode.testnet.sui.io
	  const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
  
	  // 定义 GetDynamicFieldsParams
	  const params = {
		parentId,
		limit: 100, // 每次查询返回的最大动态字段数量
	  };
  
	  // 获取动态字段列表
	  const response = await client.getDynamicFields(params);  
	  return response.data;;

	} catch (error) {
	  console.error('Error fetching dynamic fields:', error);
	  throw error;
	}
  }

  async function getObject(id: string) {
	try {
	  // 初始化 Sui 客户端 https://fullnode.testnet.sui.io
	  const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
  
	  const params = {
		id:id,
		options: {
			showType: false,
			showOwner: false,
			showPreviousTransaction: false,
			showContent: true,
			showStorageRebate: false,
		}
	  };
  
	  const response = await client.getObject(params);
	//   let report_table_id = await response.data?.content.reports.fields.id.id as string;
	//   let report_numer = user_obj.reports.fields.size;
	//   console.log("report_table_id",report_table_id);
	//   console.log("report_numer",report_numer);
  
	//   return [user_obj.name,user_obj.sex,report_table_id,report_numer];
	return  response.data
	} catch (error) {
	  console.error('Error fetching dynamic fields:', error);
	  throw error;
	}
  }


//hook，用来获取数据
export  function MyComponent() {
	// 获取共享对象信息
	let share_obj_id = "0xf11dc89c68206efe335925aaf236cc966cb2f37285e98c3b95973be712cae933";
	const content_data = getObject(share_obj_id);
	

	content_data.then((data)=>{
		console.log("1 data",data);
		let user_obj = data?.content?.fields.users;
		console.log("2 user_obj",user_obj);
		let user_table_id = user_obj.fields.id.id;
		let user_table_count = user_obj.fields.size;
		console.log("3 user_table_id",user_table_id);
		console.log("4 user_table_count",user_table_count);

		const response = fetchDynamicFields(user_table_id);
		response.then((data)=>{
			console.log('5 ========',data)
			
			let user_obj_id = data[0]?.objectId
			console.log('6 ========',user_obj_id)
			const response = getObject(user_obj_id);
			response.then((data)=>{
				console.log('7 ========',data)
				let t_obj_id = data?.content.fields.value.fields.reports.fields.id.id;
				let size = data?.content.fields.value.fields.reports.fields.size;
				console.log('8 ========',t_obj_id)
				const response = fetchDynamicFields(t_obj_id);
				response.then((data)=>{
					console.log('9 ========',data)
				})
			})
	})


	}).catch((error)=>{
		console.log(error)
	})


	// const fields = fetchDynamicFields(report_table_id);

	const { data, isPending, isError, error, refetch } = useSuiClientQuery(
		'getObject',
		//  0x43730530a28dc51baabc5911e30cf50d231b7eb020d4a2edc6a4c491be022fde
		{ id: '0xf11dc89c68206efe335925aaf236cc966cb2f37285e98c3b95973be712cae933', options: {
			showType: false,
			showOwner: false,
			showPreviousTransaction: false,
			showContent: true,
			showStorageRebate: false,
		}, },
		
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
 
	return <div>
		<pre>{JSON.stringify(data, null, 2)}</pre>
		{/* <pre>{JSON.stringify(fields, null, 2)}</pre> */}
		{/* <pre>{JSON.stringify(objData, null, 2)}</pre> */}
	</div>;
}
