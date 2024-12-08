# 健链智云
价值数据链上管理

## 第一次上测试 241127

## 包id
0x0211214b36bea8ebf4467018772ddd5d3d2f6d5ddfb0830e5dd272f8dbf0c003

## UserRegistry   共享对象 id
0xc7080b6f4b4ad677808f26c591888d2097fad6ea57ebbc5f30be82df645b9389

## 测试账号
0x7af192b633f2a6acfdfd8802d2368de949c09bd09d57f5dee3beb4216da9858d

 

## 到处私钥
sui keytool export --key-identity my_test

## 命令行调用 最新版
 
user_register: 0x6dc168bf843c49002b6b69373c70e95cb603dd666f222f99f4b00016b426a03e
package id: 0x70fda4dee3c3aa8f305a8942940f3702c7febca054064e1c54588bbf1b2d86fe
sui client call --package  0x70fda4dee3c3aa8f305a8942940f3702c7febca054064e1c54588bbf1b2d86fe     --module hcsc_v1 --function user_register --args  Elemen 18 people --gas-budget 100000000

sui client call --package  0x70fda4dee3c3aa8f305a8942940f3702c7febca054064e1c54588bbf1b2d86fe     --module hcsc_v1 --function create_lab_report --args Elemen_report 7 7 7 7 0x6dc168bf843c49002b6b69373c70e95cb603dd666f222f99f4b00016b426a03e --gas-budget 100000000