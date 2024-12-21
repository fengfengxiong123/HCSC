"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function HeaderNav() {
  const router = useRouter();
  const handleClick = () => {
    // 这里可以添加一些逻辑，例如验证或数据提交
    router.push('/');
  };

  const handleClick1 = () => {
    // 这里可以添加一些逻辑，例如验证或数据提交
    router.push('/detail');
  };
  const handleClick2 = () => {
    // 这里可以添加一些逻辑，例如验证或数据提交
    router.push('/reports');
  };
  const handleClick3 = () => {
    // 这里可以添加一些逻辑，例如验证或数据提交
    router.push('/callsui');
  };


  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
        onClick={handleClick}
      >
        首页
      </Button>
      <Button
        variant="ghost"
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors" 
        onClick={handleClick1}
      >
        详情
      </Button>
      <Button
        variant="ghost"
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
        onClick={handleClick2}
      >
        报告
      </Button>
      <Button
        variant="ghost" 
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
        onClick={handleClick3}
      >
        注册
      </Button>
    </div>
  );
}
