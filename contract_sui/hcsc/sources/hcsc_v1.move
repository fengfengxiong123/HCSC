module hcsc::hcsc_v1;

use std::string::{Self, String, utf8};
use std::u64::to_string;
use sui::address;
use sui::clock::{Self, Clock};
use sui::object::new;
use sui::table::{Self};
use sui::transfer::transfer;
use sui::tx_context;
use sui::tx_context::sender;

public struct User<phantom T: store> has key {
    id: UID,
    name: String,
    age: u64,
    gender: String,
    count: u64,
    reports: table::Table<String,T>
}

public struct LabReport has store {
    report_name: String,
    //白细胞 - White Blood Cells (WBC)
    wbc: u64,
    //红细胞 - Red Blood Cells (RBC)
    rbc: u64,
    // 血小板
    platelets: u64,
    // C反应蛋白 - C-Reactive Protein (CRP)
    crp: u64,
}

public struct AdminCap has key {
    id: UID,
}

fun init(ctx: &mut TxContext) {
    transfer::transfer(
        AdminCap { id: object::new(ctx) },
        tx_context::sender(ctx),
    );
}

public entry fun user_register(
    name: String,
    age: u64,
    gender: String,
    ctx: &mut TxContext,
) {
    let id = new(ctx);
    let user = User {
        id,
        name,
        age,
        gender,
        count: 0,
        reports: table::new<String, LabReport>(ctx),
    };
    transfer::share_object(user);
}

// 创建报告，存入table之中
// key是第count份报告+用户地址
public entry fun create_lab_report(
    report_name: String,
    wbc: u64,
    rbc: u64,
    platelets: u64,
    crp: u64,
    user: &mut User<LabReport>,
    ctx: &mut TxContext,
) {
    let lab_rep = LabReport {
        report_name,
        wbc,
        rbc,
        platelets,
        crp,
    };
    user.count = user.count + 1;
    table::add(&mut user.reports,report_name,lab_rep);
}




