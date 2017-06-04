import { StorageService, LocalStorageService, SessionStorageService } from './storage.service'


export function LocalStorage(key?: string) {
    return AngularStorage(new LocalStorageService(), key);
}

export function SessionStorage(key?: string) {
    return AngularStorage(new SessionStorageService(), key);
}

export let AngularStorage = (storageService: StorageService, key: string) => {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;
        Object.defineProperty(target, propertyName, {
            get: function() {
                return storageService.get(key);
            },
            set: function(value: any) {
                storageService.set(key, value);
            },
        });
    }
}