export interface EditExpenseDto{
    id: string
    exp_type: string
    exp_prefix: string
    exp_no: string
    exp_number: string
    exp_date: string
    exp_source: string
    exp_by_id: string
    proof_file: string[]
    notes: string
    vehicle_type: string
    demand_amount: string
    amount: string
    cm_id: string
    emp_name: string
    party_name: any
    expense_label: string
    expTrans: ExpTranDto[]
}

export interface ExpTranDto {
    id: string
    exp_id: string
    exp_type_id: string
    amount: string
    approve_amount: string
    approve_remark: string
    created_by: string
    created_at: string
    updated_by: string
    updated_at: string
    is_delete: string
    cm_id: string
    expense_label: string
    exp_date: string
    travel_by: string
    travel_distance: string
}
