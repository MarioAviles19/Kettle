export interface Draggable{
    name : string,
    text : string,
    orderNumber : number
}

export interface Recipe{
    image: any;
    name: string;
    description: string;
    notes: string;
    procedure: string[];
    ingredients : string[];
}