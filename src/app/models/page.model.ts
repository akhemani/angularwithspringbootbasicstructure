export class Page<T> {
    content: T[];
    totalElements: Number;
    totalPages: Number;
    first: Boolean;
    last: Boolean;
    number: Number;
    numberOfElements: Number;
    size: Number;
    sort: String;
}