/*
/// Module: hcsc
module hcsc::hcsc;
*/
module hcsc::hcsc;
use std::vector;
use sui::bag;
use sui::object;
use sui::transfer;
use sui::tx_context;

public struct LabReport has key {
    id: UID,
    //白细胞 - White Blood Cells (WBC)
    wbc: u64,
    //红细胞 - Red Blood Cells (RBC)
    rbc: u64,
    // 血小板
    platelets: u64,
    // C反应蛋白 - C-Reactive Protein (CRP)
    crp: u64,
}

public struct UserRegistry has key {
    id: UID,
    user_reports: bag::Bag
}

public struct AdminCap has key {
    id: UID
}

fun init(ctx: &mut TxContext) {
    transfer::transfer(
        AdminCap { id: object::new(ctx) },
        tx_context::sender(ctx)
    );

    transfer::share_object(
        UserRegistry {
            id: object::new(ctx),
            user_reports: bag::new(ctx)
        }
    );
}

public entry create_lab_report(wbc: u64, rbc: u64, platelets: u64, crp: u64, ctx: &mut TxContext) {
    let lab_rep_id = object::new(ctx);



    let lab_rep = LabReport {
        id: lab_rep_id,
        wbc,
        rbc,
        platelets,
        crp
    };
    transfer::transfer(
        lab_rep,
        tx_context::sender(ctx)
    );
}