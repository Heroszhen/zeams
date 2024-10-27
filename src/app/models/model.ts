export abstract class Model {
    assignData<T>(data: T): void {
        Object.assign(this, data);
    }
}
