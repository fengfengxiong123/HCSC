import { useSuiClientQuery } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import React, { useState, useEffect } from 'react';

async function fetchDynamicFields(parentId: string) {
  try {
    const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
    const params = {
      parentId,
      limit: 100,
    };
    const response = await client.getDynamicFields(params);
    return response.data;
  } catch (error) {
    console.error('Error fetching dynamic fields:', error);
    throw error;
  }
}

async function fetchDynamicFieldObject(
  parentId: string, 
  mystype: string, 
  myvalue: string
) {
  try {
    const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
    const params = {
      parentId,
      name: { type: mystype, value: myvalue }, 
    };
    const response = await client.getDynamicFieldObject(params);  
    return response.data;
  } catch (error) {
    console.error('Error fetching dynamic fields:', error);
    throw error;
  }
}

async function getObject(id: string) {
  try {
    const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
    const params = {
      id: id,
      options: {
        showType: false,
        showOwner: false,
        showPreviousTransaction: false,
        showContent: true,
        showStorageRebate: false,
      }
    };
    const response = await client.getObject(params);
    return response.data;
  } catch (error) {
    console.error('Error fetching dynamic fields:', error);
    throw error;
  }
}

async function fetchReportTable(reportTableId: string) {
  try {
    const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
    const params = {
      id: reportTableId,
      options: {
        showType: false,
        showOwner: false,
        showPreviousTransaction: false,
        showContent: true,
        showStorageRebate: false,
      }
    };
    const response = await client.getObject(params);
    return response.data; 
  } catch (error) {
    console.error('Error fetching report table data:', error);
    throw error;
  }
}

// Hook to get data
export function MyComponent() {
  const [userAddress, setUserAddress] = useState(""); 
  const [userTableId, setUserTableId] = useState(null); 
  const [userObject, setUserObject] = useState(null);
  const [reportTableId, setReportTableId] = useState(null);
  const [loading, setLoading] = useState(false);  // 默认设置为 false
  const [error, setError] = useState(null);

  // Keep the shared object ID fixed
  const shareObjId = "0xf11dc89c68206efe335925aaf236cc966cb2f37285e98c3b95973be712cae933";
  
  const fetchData = async (address: string) => {
    try {
      setLoading(true); // 开始加载数据
      const response = await getObject(shareObjId);
      if (response?.content) {
        const tableId = response.content?.fields.users.fields.id.id;
        setUserTableId(tableId); // 更新用户表格ID

        const userResponse = await fetchDynamicFieldObject(
          tableId,
          "0x1::string::String",
          address
        );
        
        if (userResponse?.content) {
          const userData = userResponse?.content.fields.value.fields;
          setUserObject(userData); // 设置用户数据
          setReportTableId(userData.reports.fields.id.id); // 设置报告表格ID
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // 加载完成，设置为false
    }
  }

  // 当用户输入地址并点击查询时，调用 `fetchData` 进行查询
  useEffect(() => {
    if (userAddress) {
      fetchData(userAddress);
    }
  }, [userAddress]);  // 每当用户地址变化时，重新执行查询

  // 渲染UI
  if (loading) return <p>加载中...</p>;
  if (error) return <p>错误：{error}...</p>;

  return (
    <div>
      <h1>输入用户地址</h1>
      <input 
        type="text" 
        value={userAddress} 
        onChange={(e) => setUserAddress(e.target.value)} 
        placeholder="请输入用户地址"
      />
      <h1>共享对象表格ID</h1>
      <pre>{JSON.stringify(userTableId, null, 2)}</pre>
      <h1>用户数据</h1>
      <pre>{JSON.stringify(userObject, null, 2)}</pre>
      <h1>报告表格ID</h1>
      <pre>{JSON.stringify(reportTableId, null, 2)}</pre>
    </div>
  );
}
