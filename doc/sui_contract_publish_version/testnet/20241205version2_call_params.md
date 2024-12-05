# 摘要
Transaction Digest : FMddqgY69CpqaqzJBwWUCRbQEojrNXMPQE9yqzT4r3bW

# 包地址
PackageID: 0xc8e669d461667d4c09fdacbdbcbe08ffa8644f5d483b9023a9d73ba49ce34874

# 包内模块
Modules: hcsc, hcsc_v1,hcsc_v2

# hcsc_v2共享对象id AnalysisCenter

ObjectID: 0x1651f873b4d40657a54c0fd24220f30d2b96e6086157265ae63a1d7c1c232b6d

ObjectType: 0xc8e669d461667d4c09fdacbdbcbe08ffa8644f5d483b9023a9d73ba49ce34874::hcsc_v2::AnalysisCenter<0xc8e669d461667d4c09fdacbdbcbe08ffa8644f5d483b9023a9d73ba49ce34874::hcsc_v2::LabReport>

## sdk中需要调用方法1 user_register
下面为参数
public entry fun user_register(
analysis_center: &mut AnalysisCenter<LabReport>,
name: String,
age: u64,
gender: String,
ctx: &mut TxContext // 不用传的参数
)

# sdk中需要调用方法2 create_lab_report
下面为参数
public entry fun create_lab_report(
name: String,
wbc: u64,
rbc: u64,
platelets: u64,
crp: u64,
analysis_center: &mut AnalysisCenter<LabReport>,  // 传共享对象地址
ctx: &mut TxContext // 不用传的参数
)