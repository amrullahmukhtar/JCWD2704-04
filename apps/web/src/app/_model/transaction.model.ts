

export interface ITransaction {
    id: number;
    staffId: number;
    userId    : number;
    date       :string ;
    isPaid     :boolean;
    invoiceNum :string;
    type       :string;
    pointsUsed :number;
    total      :number;
}