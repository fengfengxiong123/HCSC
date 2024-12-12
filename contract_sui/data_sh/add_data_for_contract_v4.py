import random
import datetime
import os
import subprocess
import sys
from typing import List, Dict

env = "testnet"
pkg_id = "0x1be961232f8682cb89f2d6b487f790a2e979d051f6cdb5a2d274b0cbe0d82608"
module_name = "hcsc_v4"
fun_register_user = "user_register"
fun_create_lab_report = "create_lab_report"
share_object_id = "0x66f2ce8d058b1cabbaaebeb19593dcddef850f37b3a232dcb462498f1445c35f"
gas_budget = 200000000
address1 = '0x2af6c1938280cf418ce388f62deffe9a56746d0887c9e6c031a4127016987e35'  # 通过sui client addresses查询获得
address2 = '0xc5608b3f246c832b6a0908abf0c61a22e0703f2a571e65f8b202db7b67fb366d'  # 通过sui client addresses查询获得

hospital_name = ["bei_san_yi_yuan", "jie_fang_jun", "lu_he", "301"]
user_obj1 = {
    'name': 'wuya1',
    'age': 18,
    'gender': 'Male',
    'address': address1
}
user_obj2 = {
    'name': 'wuya2',
    'age': 18,
    'gender': 'Female',
    'address': address2
}
user_list = [user_obj1, user_obj2]

report_list = []
for i in range(30):
    random_h_name = random.choice(hospital_name)
    tmp = (datetime.datetime.now() - datetime.timedelta(days=i)).timestamp()
    obj = {
        "name": f"{random_h_name}_{i}",
        "wbc": random.randint(4, 10),
        "rbc": random.randint(4, 6),
        "platelets": random.randint(100, 300),
        "crp": random.randint(0, 10),
        "date": int(tmp * (1000 * 1000))
    }
    report_list.append(obj)

for user_obj in user_list:
    cmd_list = []
    cmd_switch_env = f"""
    sui client switch --env {env}
    """
    cmd_list.append(cmd_switch_env)

    cmd_switch_address = f"""
        sui client switch --address {user_obj["address"]}
    """
    cmd_list.append(cmd_switch_address)

    if env != "mainnet":
        cmd_faucet = "sui client faucet"
        cmd_list.append(cmd_faucet)
    else:
        print('这是主网!')
        sys.exit()

    cmd_register_user = f"""
    sui client call \
      --package {pkg_id} \
      --module {module_name} \
      --function {fun_register_user} \
      --args \
        {share_object_id} \
        {user_obj['name']} \
        {user_obj['age']} \
        {user_obj['gender']} \
       --gas-budget {gas_budget}
    """
    # cmd_list.append(cmd_register_user) # 如果创建过用户，第二次创建用户会失败

    for cmd in cmd_list:
        cmd = cmd.strip()
        print(cmd)

        result = subprocess.run(
            cmd,  # 命令及其参数
            shell=True,  # 如果命令是一个字符串，则需要设置为 True
            check=True,  # 如果命令返回非零退出状态码，则抛出 CalledProcessError
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,  # 自动解码字节流为字符串
            encoding='utf-8'  # 指定编码，根据实际情况调整
        )

        exit_code = result.returncode
        output = result.stdout
        print("Exit code:", exit_code)
        print("Output:", output)

        if exit_code != 0:
            sys.exit('上条执行执行错误')

    for report_obj in report_list:
        gen_report_cmd = f"""
         sui client call \
          --package {pkg_id} \
          --module {module_name} \
          --function {fun_create_lab_report} \
          --args \
            {report_obj["name"]} \
            {report_obj["wbc"]} \
            {report_obj["rbc"]} \
            {report_obj["platelets"]} \
            {report_obj["crp"]} \
            {report_obj["date"]} \
            {share_object_id} \
           --gas-budget {gas_budget}
        """.strip()
        result = subprocess.run(
            gen_report_cmd,  # 命令及其参数
            shell=True,  # 如果命令是一个字符串，则需要设置为 True
            check=True,  # 如果命令返回非零退出状态码，则抛出 CalledProcessError
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,  # 自动解码字节流为字符串
            encoding='utf-8'  # 指定编码，根据实际情况调整
        )

        exit_code = result.returncode
        output = result.stdout
        print("Exit code:", exit_code)
        print("Output:", output)

