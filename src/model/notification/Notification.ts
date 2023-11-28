export interface Notification {
    id: string;
    date: Date;
    category: Category;
    message: string;
    objectId: string;
    receiverId: string;
}