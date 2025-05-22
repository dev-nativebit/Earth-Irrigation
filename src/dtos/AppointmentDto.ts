export interface AppointmentDataDto{
    appointmentList:AppointmentDto[]
    dateList: string[]
}

export interface AppointmentDto {
    id: string
    lead_stage: string
    party_id: string
    ref_id: string
    ref_date: string
    ref_no: string
    mode: string
    notes: string
    response: string
    remark: string
    voice_notes: string
    created_by_name: string
}
