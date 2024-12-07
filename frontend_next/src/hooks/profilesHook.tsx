import { useSuiClientQuery } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';


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

  async function getObjects(ids: Array<string>) {
	try {
	  // 初始化 Sui 客户端 https://fullnode.testnet.sui.io
	  const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
  
	  const params = {
		ids:ids,
		options: {
			showType: false,
			showOwner: false,
			showPreviousTransaction: false,
			showContent: true,
			showStorageRebate: false,
		}
	  };
  
	  const response = await client.multiGetObjects(params);
	  return  response
	} catch (error) {
	  console.error('Error fetching dynamic fields:', error);
	  throw error;
	}
  }


//hook，用来获取数据
export  function MyComponent() {
	// 获取共享对象信息
	let share_obj_id = "0xf11dc89c68206efe335925aaf236cc966cb2f37285e98c3b95973be712cae933";
	let user_table_obj_id = "0x9512e95bb72179964ca4cced088606ab362887b426963d0a311541a6bc59c81d";
	let user_address = "d790d41adfffd48df8e38607991a297970743decff87517e647008a652587d4c";
	let user_all_reports: any[] = [];
	const response = fetchDynamicFields(user_table_obj_id);
	response.then((res)=>{
		console.log(1,res)
		let user_obj_id = "";
		res.forEach(element => {
			if(element.name.value==user_address){
				user_obj_id = element.objectId
			}
		});
		const response = getObject(user_obj_id);
		response.then((res)=>{
			console.log(2,res)
			let user_info_obj = res?.content?.fields.value.fields
			console.log(3,user_info_obj)
			let report_table_id = res?.content?.fields.value.fields.reports.fields.id.id
			console.log(4,report_table_id)
			const response = fetchDynamicFields(report_table_id);
			response.then((res)=>{
				console.log(5,res)
				let report_obj_ids: string[] = [];
				res.forEach(element => {
					report_obj_ids.push(element.objectId)
				});
				const response = getObjects(report_obj_ids)
				response.then((res)=>{
					console.log(6,res)
					res.forEach(element => {
						let fields = element.data?.content?.fields.value.fields
						user_all_reports.push(fields)
					});
					console.log(7,user_all_reports)
				})
			})
		})
		
	})


	// const content_data = getObject(share_obj_id);
	

	// content_data.then((data)=>{
	// 	console.log("1 data",data);
	// 	let user_obj = data?.content?.fields.users;
	// 	console.log("2 user_obj",user_obj);
	// 	let user_table_id = user_obj.fields.id.id;
	// 	let user_table_count = user_obj.fields.size;
	// 	console.log("3 user_table_id",user_table_id);
	// 	console.log("4 user_table_count",user_table_count);

	// 	const response = fetchDynamicFields(user_table_id);
	// 	response.then((data)=>{
	// 		console.log('5 ========',data)
			
	// 		let user_obj_id = data[0]?.objectId
	// 		console.log('6 ========',user_obj_id)
	// 		const response = getObject(user_obj_id);
	// 		response.then((data)=>{
	// 			console.log('7 ========',data)
	// 			let t_obj_id = data?.content.fields.value.fields.reports.fields.id.id;
	// 			let size = data?.content.fields.value.fields.reports.fields.size;
	// 			console.log('8 ========',t_obj_id)
	// 			const response = fetchDynamicFields(t_obj_id);
	// 			response.then((data)=>{
	// 				console.log('9 ========',data)
	// 			})
	// 		})
	// 	})
	// })

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
		<pre>{JSON.stringify(user_all_reports, null, 2)}</pre>
		{/* <pre>{JSON.stringify(objData, null, 2)}</pre> */}
	</div>;
}
