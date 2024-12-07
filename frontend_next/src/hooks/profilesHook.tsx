import { useSuiClientQuery } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import React from 'react';


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
export function MyComponent() {
  const userTableId = "0x9512e95bb72179964ca4cced088606ab362887b426963d0a311541a6bc59c81d";
  const userAddress = "d790d41adfffd48df8e38607991a297970743decff87517e647008a652587d4c";
  const [userData, setUserData] = React.useState<any>(null);
  const [userAllReports, setUserAllReports] = React.useState<any[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // 获取动态字段对象
        const dynamicFieldObject = await fetchDynamicFields(userTableId);
        let userObjId = "";

        // 查找与用户地址匹配的对象
        dynamicFieldObject.forEach((element: any) => {
          if (element.name.value === userAddress) {
            userObjId = element.objectId;
          }
        });

        if (!userObjId) {
          throw new Error('User object not found');
        }

        // 获取用户对象
        const userObj = await getObject(userObjId);
        const userInfo = userObj?.content?.fields?.value?.fields || {};

        // 获取报告表 ID
        const reportTableId = userInfo?.reports?.fields?.id?.id;
        if (reportTableId) {
          const reportFields = await fetchDynamicFields(reportTableId);
          const reportObjIds = reportFields.map((element: any) => element.objectId);
          const reportObjects = await getObjects(reportObjIds);

          const allReports = reportObjects.map((element: any) => {
            return element?.data?.content?.fields?.value?.fields;
          });

          setUserAllReports(allReports);
        }

        setUserData(userInfo);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userTableId, userAddress]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <pre>{JSON.stringify(userAllReports, null, 2)}</pre>
    </div>
  );
}
