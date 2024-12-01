# 使用助记词导入测试账户到本地钱包

sui keytool import --alias my_test "助记词" ed25519

# 切换活动账户
sui client switch --address my_test