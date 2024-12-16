"use client";

import React, { useState } from "react";
import { useWallet } from "@suiet/wallet-kit";

export default function RegistrationPage() {
  const wallet = useWallet();

  const [formData, setFormData] = useState({
    name: "",   // 姓名
    age: "",    // 年龄
    gender: "", // 性别
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value, // 如果是 age，则转换为数字
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("表单数据:", formData);

    // 模拟处理提交逻辑
    if (wallet.address) {
      console.log("钱包地址:", wallet.address);
      setMessage("注册成功！");
    } else {
      setMessage("请连接钱包后重试。");
    }
  };

  return (
    <div className="flex flex-col pt-28">
      <div className="container flex flex-col gap-6 p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold">用户注册</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">用户名</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">年龄</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">性别</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            注册
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
