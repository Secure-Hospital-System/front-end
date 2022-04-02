export interface User {
    isSelected: boolean;
    billID: string;
    dateOfRequest: string;
    dateOfApprove: string;
    claimedAmount: string;
    isEdit: boolean;
    approvedAmount:string;
    approver:string;
    date:string;

}

export const UserSchema = {
    isSelected: "isSelected",
    billID: "text",
    dateOfRequest: "text",
    dateOfApprove: "text",
    isEdit: "isEdit",
    claimedAmount: "text",
    approver: "text",
    approvedAmount: "text",
    date: "text",

}
